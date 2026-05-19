'use client'

import { useState } from "react"
import * as validate from "./validate"
import { authClient } from "@/lib/utils/auth-client";
import { useRouter } from "next/navigation";
import * as recipeActions from "@/lib/actions/recipe";
import IngredientsForm from "./(ingredients)/IngredientsForm";
import DirectionsForm from "./(directions)/DirectionsForm";

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
export type IngredientInput = {
    id: number,
    name: string,
    amount: string
}

// See ingredients explanation above.
export type DirectionInput = {
    id: number,
    instruction: string
}


export default function RecipeForm() {

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
    const [ingredientsInput, setIngredientsInput] = useState<IngredientInput[]>([{id: Date.now(), name: "", amount: ""}])
    const [directionsInput, setDirectionsInput] = useState<DirectionInput[]>([{id: Date.now(), instruction: ""}])

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
        const ingredientErr = validate.validateIngredients(ingredientsInput)
        if (ingredientErr) {
            setIngredientError(ingredientErr);
            setLoading(false);
            return;
        }

        const directionErr = validate.validateDirections(directionsInput)
        if (directionErr) {
            setDirectionError(directionErr)
            setLoading(false);
            return;
        }

        setLoading(true)
        const result = await recipeActions.createRecipeAction(recipeInput);
        if ("error" in result) {
            setRecipeError(result.error);
            setLoading(false);
            return;
        }
        await recipeActions.createIngredientsAction(ingredientsInput, result.id);
        await recipeActions.createDirectionsAction(directionsInput, result.id)
        router.push(`/recipes/${result.id}`);
        setLoading(false);
    }

    return(<form className=" min-w-4xl max-w-5xl mx-auto mt-10 p-6 border rounded flex flex-col" onSubmit={handleSubmit}>
        <h3 className="text-2xl font-bold mb-6 text-center">Information</h3>
        <section className="grid grid-cols-[auto_1fr] gap-y-3 items-center">
            <h3 className="text-xl text-left w-32 font-bold mr-2">Title:</h3>
            <input type="text" id="title" name="title"
                onChange={e => setTitle(e.target.value)}
                className="border border-black rounded max-w-xs">
            </input>

            <h3 className="text-xl text-left w-32 font-bold mr-2 ">Description:</h3>
            <textarea rows={4} id="description" name="description"
                onChange={e => setDescription(e.target.value)}
                className="w-full resize-none border border-black rounded">
            </textarea>

            <h3 className="text-xl text-left w-32 font-bold mr-2">Prep Time:</h3>
            <div className="flex">
                <input type="text" maxLength={2} id="prepHrs" name="prepHrs"
                    onChange={e => setPrepHrs(e.target.value)}
                    className="w-6 border border-black rounded mr-1 text-center">
                </input>
                <p className="mr-1">hrs</p>
                <input type="text" maxLength={2} id="prepMins" name="prepMins"
                    onChange={e => setPrepMins(e.target.value)}
                    className="w-6 border border-black rounded mr-1 text-center">
                </input>
                <p className="mr-1">mins</p>
            </div>
            <h3 className="text-xl text-left w-32 font-bold mr-2">Cook Time:</h3>
            <div className="flex">
                <input type="text" maxLength={2} id="cookHrs" name="cookHrs"
                    onChange={e => setCookHrs(e.target.value)}
                    className="w-6 border border-black rounded mr-1 text-center">
                </input>
                <p className="mr-1">hrs</p>
                <input type="text" maxLength={2} id="cookMins" name="cookMins"
                    onChange={e => setCookMins(e.target.value)}
                    className="w-6 border border-black rounded mr-1 text-center">
                </input>
                <p className="mr-1">mins</p>
            </div>
            <h3 className="text-xl text-left w-32 font-bold mr-2">Servings:</h3>
            <div className="flex">
            <input type="text" maxLength={2} id="servings" name="servings"
                onChange={e => setServings(e.target.value)}
                className="w-6 border border-black rounded mr-1 text-center"></input>
            <p className="ml-1">People</p>
            </div>
        </section>
        {recipeError && <p className="text-red-500 mt-4">{recipeError}</p>}
        <IngredientsForm 
            ingredients={ingredientsInput}
            setIngredients={setIngredientsInput}>
        </IngredientsForm>
        {ingredientError && <p className="text-red-500 mt-4">{ingredientError}</p>}
        <DirectionsForm
            directions={directionsInput}
            setDirections={setDirectionsInput}> 
        </DirectionsForm>
        {directionError && <p className="text-red-500 mt-4">{directionError}</p>}
        <button type="submit" disabled={loading} className="rounded bg-blue-400 p-3 pl-7 pr-7 m-3 w-40 place-self-center">{loading ? "Submitting..." : "Submit"}</button>
    </form>)
}