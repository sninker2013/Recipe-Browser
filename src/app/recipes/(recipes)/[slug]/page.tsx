import { getRecipeBySlug } from "@/lib/services/recipeService";
import { formatInterval } from "@/lib/utils/formatInterval";
import { getIngredientsByRecipeSlug } from "@/lib/services/ingredientsService";
import { getDirectionsByRecipeSlug } from "@/lib/services/directionsService";


// This page is for displaying a single recipe with the ingredients and directions. 
export default async function RecipePage({
    params,
}: {
    params: Promise<{ slug: string }>
}) {
    const { slug } = await params
    const recipe = await getRecipeBySlug(slug)
    const ingredients = await getIngredientsByRecipeSlug(slug)
    
    return(<>
        <h2 className="text-center m-5">{recipe.title}</h2>
        <p className="m-5">{recipe.description}</p>
        <div className="flex justify-around">
            <div className="flex flex-col justify-between text-center border-2 border-gray-300 p-7 m-3 rounded-xl gap-4">
                <h3>Prep Time: {formatInterval(recipe.prepTime)}</h3>
                <h3>Cook Time: {formatInterval(recipe.cookTime)}</h3>
                <h3>Servings: {recipe.servings}</h3>
            </div>
            <div>
                <h3 className="text-center m-5">Ingredients</h3>
                <ul className="list-disc list-inside m-5">
                    {ingredients.map((ingredient) => (
                        <li key={`${ingredient.recipeSlug}-${ingredient.position}`}>
                            {ingredient.amount} {ingredient.name}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
        <RecipePageDirections slug={slug}></RecipePageDirections>
    </>
    )
}

export function RecipePageDirections({
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