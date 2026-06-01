'use client'

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation";

import { authClient } from "@/lib/utils/auth-client";
import * as recipeActions from "@/lib/actions/recipe";
import { Category } from "@/lib/schema";

import * as validate from "./utils/validate"
import IngredientsForm from "./_components/IngredientsForm";
import DirectionsForm from "./_components/DirectionsForm";
import GeneralInfo from "./_components/GeneralInfoForm";
import CategoriesForm from "./_components/CategoriesForm";

/* 
This type will be used to validate the recipe form and will be converted into the correct format
to insert into the db after validation within the recipe action.
*/
export type RecipeInput = {
    title: string,
    description: string,
    prepHrs: string,
    prepMins: string,
    cookHrs: string,
    cookMins: string,
    servings: string
}

/*
Since the ingredient form won't have access to the recipe ID, making the ingredients useState
its own type will simplify the form process and we will convert that into an Ingredients array in its action.
Additionally, A generated id is required to reference which ingredient to delete when the button is pressed.
*/
export type IngredientForm = {
    id: number,
    name: string,
    amount: string
}

// See ingredients explanation above.
export type DirectionForm = {
    id: number,
    instruction: string
}

// See explanation in page.tsx
export interface CategoryForm extends Category {
    isChecked: boolean
}

/**
 * Builds all the form components and holds the submission handling and errors for the form.
 * @param initialCategories - The categories that a recipe can be assigned to. (declared in page.tsx)
 */
export default function RecipeForm({initialCategories}: {initialCategories: CategoryForm[]}) {

    // General recipe info form states
    const [recipeInput, setRecipeInput] = useState<RecipeInput>({
        title: "",
        description: "",
        prepHrs: "",
        prepMins: "",
        cookHrs: "",
        cookMins: "",
        servings: ""
    })
    
    // Ingredients and Directions form states
    // We initialize one value so that there is an empty form element on a new form load.
    const [ingredients, setIngredients] = useState<IngredientForm[]>([])
    const [directions, setDirections] = useState<DirectionForm[]>([])

    // Date.now() was causing hydration errors without the useEffect
    useEffect(() => {
    setIngredients([{id: Date.now(), name: "", amount: ""}])
    setDirections([{id: Date.now(), instruction: ""}])
}, [])

    // Categories is different from the others as we need to get the categories that have been predefined
    const [categories, setCategories] = useState<CategoryForm[]>(initialCategories)

    // Errors from client-side validation
    const [recipeError, setRecipeError] = useState<string>("");
    const [ingredientError, setIngredientError] = useState<string>("");
    const [directionError, setDirectionError] = useState<string>("");
    const [categoryError, setCategoryError] = useState<string>("");

    // Mostly used for disabling the submit button and showing the user 
    // when the form is in the process of being submitted.
    const [loading, setLoading] = useState<boolean>(false)

    const router = useRouter()

    // Displays Loading page if the session is pending
    const {isPending} = authClient.useSession();
        if (isPending) return null


    const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();

        setRecipeError("");
        setIngredientError("");

        // General recipe info validation
        const recipeErr = validate.validateRecipe(recipeInput);
        if (recipeErr) {
            setRecipeError(recipeErr);
            return;
        }

        // Ingredients validation
        const ingredientErr = validate.validateIngredients(ingredients)
        if (ingredientErr) {
            setIngredientError(ingredientErr);
            return;
        }

        // Directions validation
        const directionErr = validate.validateDirections(directions)
        if (directionErr) {
            setDirectionError(directionErr)
            return;
        }

        // If all validations pass, it creates a recipe and its associated ingredients, directions, and categories.
        setLoading(true)
        const recipe = await recipeActions.createRecipeAction(recipeInput);
        if ("error" in recipe) {
            setRecipeError(recipe.error);
            setLoading(false);
            return;
        }
        const ingredientResult = await recipeActions.createIngredientsAction(ingredients, recipe.id);
        if ("error" in ingredientResult) {
            setIngredientError(ingredientResult.error);
            setLoading(false);
            return;
        }
        const directionResult = await recipeActions.createDirectionsAction(directions, recipe.id);
        if ("error" in directionResult) {
            setDirectionError(directionResult.error);
            setLoading(false);
            return;
        }
        // Grabbing the ids of any categories that were selected.
        const selectedCategoryIds = categories
            .filter(category => category.isChecked)
            .map(category => category.id)
        if (selectedCategoryIds.length > 0){
            const categoryResult = await recipeActions.addCategoriesAction(recipe.id, selectedCategoryIds)
            if ("error" in categoryResult) {
                setCategoryError(categoryResult.error);
                setLoading(false);
                return;
            }
        }
        // Revalidates any paths this recipe may appear in.
        await recipeActions.finalizeRecipeAction()
        router.push(`/recipes/${recipe.id}`);
        setLoading(false);
    }

    return(<form className=" min-w-4xl max-w-5xl mx-auto mt-10 p-6 border rounded flex flex-col" onSubmit={handleSubmit}>
        <GeneralInfo
            setRecipeInput={setRecipeInput}>
        </GeneralInfo>
        {recipeError && <p className="text-red-500 mt-4">{recipeError}</p>}

        <IngredientsForm 
            ingredients={ingredients}
            setIngredients={setIngredients}>
        </IngredientsForm>
        {ingredientError && <p className="text-red-500 mt-4">{ingredientError}</p>}

        <DirectionsForm
            directions={directions}
            setDirections={setDirections}> 
        </DirectionsForm>
        {directionError && <p className="text-red-500 mt-4">{directionError}</p>}

        <CategoriesForm
            categories={categories}
            setCategories={setCategories}>
        </CategoriesForm>
        {categoryError && <p className="text-red-500 mt-4">{categoryError}</p>}
        <button type="submit" disabled={loading} 
            className="rounded bg-blue-400 p-3 pl-7 pr-7 m-3 w-40 place-self-center">
            {loading ? "Submitting..." : "Submit"}
        </button>
    </form>)
}