'use client'

export default function Error({ error }: { 
    error: Error, 
}) {
    return (
        <div className="text-center m-10">
            <h2>Error: {error.name}</h2>
            <p className="text-gray-500">{error.message}</p>
        </div>
    )
}