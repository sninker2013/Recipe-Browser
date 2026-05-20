'use client'

import { RecipeInput } from "../RecipeForm"

export default function GeneralInfo({
    setRecipeInput
}: {
    setRecipeInput: React.Dispatch<React.SetStateAction<RecipeInput>>;
}) {
    return(<>
    <h3 className="text-2xl font-bold mb-6 text-center">Information</h3>
    <section className="grid grid-cols-[auto_1fr] gap-y-3 items-center">
        <h3 className="text-xl text-left w-32 font-bold mr-2">Title:</h3>
        <input type="text" id="title" name="title"
            onChange={e => setRecipeInput(prev => ({ ...prev, title: e.target.value }))}
            className="border border-black rounded max-w-xs">
        </input>

        <h3 className="text-xl text-left w-32 font-bold mr-2 ">Description:</h3>
        <textarea rows={4} id="description" name="description"
            onChange={e => setRecipeInput(prev => ({ ...prev, description: e.target.value }))}
            className="w-full resize-none border border-black rounded">
        </textarea>

        <h3 className="text-xl text-left w-32 font-bold mr-2">Prep Time:</h3>
        <div className="flex">
            <input type="text" maxLength={2} id="prepHrs" name="prepHrs"
                onChange={e => setRecipeInput(prev => ({ ...prev, prepHrs: e.target.value }))}
                className="w-6 border border-black rounded mr-1 text-center">
            </input>
            <p className="mr-1">hrs</p>
            <input type="text" maxLength={2} id="prepMins" name="prepMins"
                onChange={e => setRecipeInput(prev => ({ ...prev, prepMins: e.target.value }))}
                className="w-6 border border-black rounded mr-1 text-center">
            </input>
            <p className="mr-1">mins</p>
        </div>

        <h3 className="text-xl text-left w-32 font-bold mr-2">Cook Time:</h3>
        <div className="flex">
            <input type="text" maxLength={2} id="cookHrs" name="cookHrs"
                onChange={e => setRecipeInput(prev => ({ ...prev, cookHrs: e.target.value }))}
                className="w-6 border border-black rounded mr-1 text-center">
            </input>
            <p className="mr-1">hrs</p>
            <input type="text" maxLength={2} id="cookMins" name="cookMins"
                onChange={e => setRecipeInput(prev => ({ ...prev, cookMins: e.target.value }))}
                className="w-6 border border-black rounded mr-1 text-center">
            </input>
            <p className="mr-1">mins</p>
        </div>

        <h3 className="text-xl text-left w-32 font-bold mr-2">Servings:</h3>
        <div className="flex">
        <input type="text" maxLength={2} id="servings" name="servings"
            onChange={e => setRecipeInput(prev => ({ ...prev, servings: e.target.value }))}
            className="w-6 border border-black rounded mr-1 text-center"></input>
        <p className="ml-1">People</p>
        </div>
    </section>
    </>)
}