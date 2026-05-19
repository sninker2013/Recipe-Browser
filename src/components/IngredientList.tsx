import { getIngredientsByRecipeId } from "@/lib/services/ingredientsService";
import { Ingredient } from "@/lib/schema";
import notFound from "@/app/recipes/[id]/notFound";

export async function IngredientList({
    id,
}: {
    id: number
}) {
    const ingredients: Ingredient[] = await getIngredientsByRecipeId(id)
    if (!ingredients || ingredients.length === 0) {
        return notFound("ingredients");
    }
    
    return(
        <div className="flex flex-col justify-between border-2 border-gray-300 p-7 m-3 rounded-xl gap-4">
    <h3 className="text-center m-5">Ingredients</h3>
    <ul className="list-disc m-5">
        {ingredients.map((ingredient: Ingredient) => (
            <li key={`${ingredient.recipeId}-${ingredient.position}`}>
                {ingredient.amount} {ingredient.name}
            </li>
        ))}
    </ul>
</div>
    )
}