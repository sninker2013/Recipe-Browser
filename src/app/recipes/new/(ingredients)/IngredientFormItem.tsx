import { IngredientForm } from "../MainRecipeForm"

export default function IngredientFormItem({
    updateIngredient,
    deleteIngredient,
    id,
}: {
    updateIngredient: (id: number, field: keyof IngredientForm, value: string) => void
    deleteIngredient: (id: number) => void
    id: number
}) {
    return(<div className="flex flex-initial items-center">
        <h3 className="text-xl text-left w-32 font-bold mr-2">Amount:</h3>
        <input id={`ingredientAmount-${id}`} name={`ingredientAmount-${id}`}
        onChange={e => updateIngredient(id, "amount", e.target.value)}
        className="w-40 max-h-7 border border-black rounded mr-1 text-center"/>
        <h3 className="text-xl text-left w-32 font-bold mr-2">Name:</h3>
        <input id={`ingredientName-${id}`} name={`ingredientName-${id}`}
        onChange={e => updateIngredient(id, "name", e.target.value)}
        className="w-3xl border border-black rounded mr-1 text-center"/>
        <button type="button" onClick={() => deleteIngredient(id)}
             className="rounded bg-red-500 p-1 pl-3 pr-3 m-3">Delete</button>
    </div>)
}