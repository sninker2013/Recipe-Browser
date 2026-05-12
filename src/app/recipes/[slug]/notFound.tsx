export default function notFound(type: string) {
    return (
        <div className="text-center m-10">
            <h2>{type} Not Found</h2>
            <p className="text-gray-500">The {type} cannot be found.</p>
        </div>
    )
}