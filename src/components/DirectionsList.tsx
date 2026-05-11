import { getDirectionsByRecipeSlug } from "@/lib/services/directionsService";

export function DirectionsList({
    slug,
}: {
    slug: string
}) {
    const directions = getDirectionsByRecipeSlug(slug)

    return(
        <ol className="list-decimal list-inside m-5">
            {directions.then((directions) => directions.map((direction) => (
                <li key={`${direction.recipeSlug}-${direction.position}`}>
                    {direction.instruction}
                </li>
            )))}
        </ol>
    )
}