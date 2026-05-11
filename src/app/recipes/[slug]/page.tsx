import { getRecipeBySlug } from "@/lib/services/recipeService";
import { formatInterval } from "@/lib/utils/formatInterval";
import { IngredientList } from "@/components/IngredientList";
import { DirectionsList } from "@/components/DirectionsList";

// This page is for displaying a single recipe with the ingredients and directions. 
export default async function RecipePage({
    params,
}: {
    params: Promise<{ slug: string }>
}) {
    const { slug } = await params
    const recipe = await getRecipeBySlug(slug)
    
    return(<>
        <h2 className="text-center m-5">{recipe.title}</h2>
        <h3 className="text-center m-5 mt-2">By {recipe.author}</h3>
        <p className="m-5">{recipe.description}</p>
        <div className="flex justify-around">
            <div className="flex flex-col justify-between text-center border-2 border-gray-300 p-7 m-3 rounded-xl gap-4">
                <h3>Prep Time: {formatInterval(recipe.prepTime)}</h3>
                <h3>Cook Time: {formatInterval(recipe.cookTime)}</h3>
                <h3>Servings: {recipe.servings}</h3>
            </div>
        <IngredientList slug={slug}></IngredientList>
        </div>
        <DirectionsList slug={slug}></DirectionsList>
    </>
    )
}