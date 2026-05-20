export default function DirectionFormItem({
    ingredientIndex,
    updateDirection,
    deleteDirection,
    id,
}: {
    ingredientIndex: number
    updateDirection: (id: number, instruction: string) => void,
    deleteDirection: (id: number) => void,
    id: number
}) {
    return(<div className="flex flex-initial items-center">
        <h3 className="text-xl text-left w-32 font-bold mr-2">{ingredientIndex + 1}.</h3>
        <textarea id={`${id}`} name={`${id}`} rows={2}
        onChange={e => updateDirection(id, e.target.value)}
        className="border border-black rounded mr-1 w-full resize-none"
        ></textarea>
        <button type="button" onClick={() => deleteDirection(id)}
             className="rounded bg-red-500 p-1 pl-3 pr-3 m-3">Delete</button>
    </div>)
}