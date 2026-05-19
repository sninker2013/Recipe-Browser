import { getDirectionsByRecipeId } from "@/lib/services/directionsService";
import { Direction } from "@/lib/schema";
import notFound from "@/app/recipes/[id]/notFound";

export async function DirectionsList({
    id,
}: {
    id: number
}) {
    const directions: Direction[] = await getDirectionsByRecipeId(id)
    if (!directions || directions.length === 0) {
        return notFound("directions");
    }

    return(
        <ol className="list-decimal list-inside m-5 ml-28">
            {directions.map((direction: Direction) => (
                <li key={`${direction.recipeId}-${direction.position}`}>
                    {direction.instruction}
                </li>
            ))}
        </ol>
    )
}