'use client'

import { useState } from "react"
import * as validate from "./validate"
import { authClient } from "@/lib/utils/auth-client";
import { useRouter } from "next/navigation";
import { createRecipeAction } from "@/lib/actions/recipe";

export default function RecipeForm() {
    const [title, setTitle] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [prepHrs, setPrepHrs] = useState<string>("");
    const [prepMins, setPrepMins] = useState<string>("");
    const [cookHrs, setCookHrs] = useState<string>("");
    const [cookMins, setCookMins] = useState<string>("");
    const [servings, setServings] = useState<string>("");
    const [error, setError] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false)
    const router = useRouter()
    
    const {data: session, isPending} = authClient.useSession();
        if (isPending) return null

    const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();


        // The user should always have a username and be logged in, but it gets mad if I dont check
        if (!session?.user.username) {
            setError("You must be logged in to create a recipe.");
            return;
        }
        const {recipe, error} = validate.validateRecipe(
            title, description, session.user.username, prepHrs, prepMins, cookHrs, cookMins, servings
        );
        if(error) {
            setError(error)
        } else {
            setError("")

            setLoading(true)
            const createdRecipe = await createRecipeAction(recipe)
            router.push(`/recipes/user/${session.user.username}`)
            setLoading(false)
        }

    }

    return(<form className=" min-w-4xl max-w-5xl mx-auto mt-10 p-6 border rounded" onSubmit={handleSubmit}>
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
            <input type="text" maxLength={2} 
                onChange={e => setServings(e.target.value)}
                className="w-6 border border-black rounded mr-1 text-center"></input>
        </section>
        <button type="submit" disabled={loading} className="rounded bg-blue-400 p-3 pl-7 pr-7 m-3">{loading ? "Submitting..." : "Submit"}</button>
        {error && <p className="text-red-500 mt-4">{error}</p>}
    </form>)
}