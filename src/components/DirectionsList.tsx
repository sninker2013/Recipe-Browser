import { getDirectionsByRecipeSlug } from "@/lib/services/directionsService";
import { Direction } from "@/lib/db/schema";
export async function DirectionsList({
    slug,
}: {
    slug: string
}) {
    const directions: Direction[] = await getDirectionsByRecipeSlug(slug)

    return(
        <ol className="list-decimal list-inside m-5">
            {directions.map((direction: Direction) => (
                <li key={`${direction.recipeSlug}-${direction.position}`}>
                    {direction.instruction}
                </li>
            ))}
        </ol>
    )
}