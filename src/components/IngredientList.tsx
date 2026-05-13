import { getIngredientsByRecipeId } from "@/lib/services/ingredientsService";
import { SelectIngredient } from "@/lib/schema";
import notFound from "@/app/recipes/[id]/notFound";

export async function IngredientList({
    id,
}: {
    id: number
}) {
    const ingredients: SelectIngredient[] = await getIngredientsByRecipeId(id)
    if (!ingredients || ingredients.length === 0) {
        return notFound("ingredients");
    }
    
    return(
        <div>
    <h3 className="text-center m-5">Ingredients</h3>
    <ul className="list-disc m-5">
        {ingredients.map((ingredient: SelectIngredient) => (
            <li key={`${ingredient.recipeId}-${ingredient.position}`}>
                {ingredient.amount} {ingredient.name}
            </li>
        ))}
    </ul>
</div>
    )
}