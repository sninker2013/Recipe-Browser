import { getIngredientsByRecipeSlug } from "@/lib/services/ingredientsService";

export async function IngredientList({
    slug,
}: {
    slug: string
}) {
    const ingredients = await getIngredientsByRecipeSlug(slug)
    return(
        <div>
    <h3 className="text-center m-5">Ingredients</h3>
    <ul className="list-disc m-5">
        {ingredients.map((ingredient) => (
            <li key={`${ingredient.recipeSlug}-${ingredient.position}`}>
                {ingredient.amount} {ingredient.name}
            </li>
        ))}
    </ul>
</div>
    )
}