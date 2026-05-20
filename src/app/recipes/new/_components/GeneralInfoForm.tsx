'use client'

export default function GeneralInfo({
    setTitle,
    setDescription,
    setPrepHrs,
    setPrepMins,
    setCookHrs,
    setCookMins,
    setServings
}: {
    setTitle: React.Dispatch<React.SetStateAction<string>>,
    setDescription: React.Dispatch<React.SetStateAction<string>>,
    setPrepHrs: React.Dispatch<React.SetStateAction<string>>,
    setPrepMins: React.Dispatch<React.SetStateAction<string>>,
    setCookHrs: React.Dispatch<React.SetStateAction<string>>,
    setCookMins: React.Dispatch<React.SetStateAction<string>>,
    setServings: React.Dispatch<React.SetStateAction<string>>
}) {
    return(<>
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
    </>)
}