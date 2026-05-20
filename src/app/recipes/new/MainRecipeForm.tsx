'use client'

import { useState } from "react"
import * as validate from "./validate"
import { authClient } from "@/lib/utils/auth-client";
import { useRouter } from "next/navigation";
import * as recipeActions from "@/lib/actions/recipe";
import IngredientsForm from "./(ingredients)/IngredientsForm";
import DirectionsForm from "./(directions)/DirectionsForm";
import GeneralInfo from "./GeneralInfoForm";
import CategoriesForm from "./(ingredients)/CategoriesForm";
import { Category } from "@/lib/schema";

/* 
This type will be used to validate the recipe form and will be converted into the correct format
after validation within the recipe action.
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

export interface CategoryForm extends Category {
    isChecked: boolean
}

export default function RecipeForm({initialCategories}: {initialCategories: CategoryForm[]}) {

    // Recipe from states
    const [title, setTitle] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [prepHrs, setPrepHrs] = useState<string>("");
    const [prepMins, setPrepMins] = useState<string>("");
    const [cookHrs, setCookHrs] = useState<string>("");
    const [cookMins, setCookMins] = useState<string>("");
    const [servings, setServings] = useState<string>("");
    
    // Ingredients and direction form states
    // We initialize one value so that there is an empty form element on a new form load.
    const [ingredients, setIngredients] = useState<IngredientForm[]>([{id: Date.now(), name: "", amount: ""}])
    const [directions, setDirections] = useState<DirectionForm[]>([{id: Date.now(), instruction: ""}])

    const [categories, setCategories] = useState<CategoryForm[]>(initialCategories)

    // Errors
    const [recipeError, setRecipeError] = useState<string>("");
    const [ingredientError, setIngredientError] = useState<string>("");
    const [directionError, setDirectionError] = useState<string>("")

    // Mostly used for disabling the submit button when the form is being submitted.
    const [loading, setLoading] = useState<boolean>(false)
    const router = useRouter()

    // Displays Loading page if the session is pending
    const {isPending} = authClient.useSession();
        if (isPending) return null


    const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();

        setRecipeError("");
        setIngredientError("");

        // Recipe validation
        const recipeInput: RecipeInput = {
            title: title,
            description: description,
            prepHrs: prepHrs,
            prepMins: prepMins,
            cookHrs: cookHrs,
            cookMins: cookMins,
            servings: servings
        }
        const recipeErr = validate.validateRecipe(recipeInput);
        if (recipeErr) {
            setRecipeError(recipeErr);
            return;
        }

        // Ingredients validation
        const ingredientErr = validate.validateIngredients(ingredients)
        if (ingredientErr) {
            setIngredientError(ingredientErr);
            setLoading(false);
            return;
        }

        // Directions validation
        const directionErr = validate.validateDirections(directions)
        if (directionErr) {
            setDirectionError(directionErr)
            setLoading(false);
            return;
        }

        // If all validations pass, it creates a recipe and its associated ingredients, directions, and categories.
        setLoading(true)
        const result = await recipeActions.createRecipeAction(recipeInput);
        if ("error" in result) {
            setRecipeError(result.error);
            setLoading(false);
            return;
        }
        await recipeActions.createIngredientsAction(ingredients, result.id);
        await recipeActions.createDirectionsAction(directions, result.id)
        router.push(`/recipes/${result.id}`);
        setLoading(false);
    }

    return(<form className=" min-w-4xl max-w-5xl mx-auto mt-10 p-6 border rounded flex flex-col" onSubmit={handleSubmit}>
        <GeneralInfo
            setTitle={setTitle}
            setDescription={setDescription}
            setPrepHrs={setPrepHrs}
            setPrepMins={setPrepMins}
            setCookHrs={setCookHrs}
            setCookMins={setCookMins}
            setServings={setServings}>
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
        <button type="submit" disabled={loading} 
            className="rounded bg-blue-400 p-3 pl-7 pr-7 m-3 w-40 place-self-center">
            {loading ? "Submitting..." : "Submit"}
        </button>
    </form>)
}