import { Recipe } from "@/lib/db/schema"
import { RecipeItem } from "./RecipeCard"
import { getAllRecipes } from "@/lib/services/recipeService"

// This is a component for displaying a grid of recipes.
export default async function RecipesGrid({
    recipes
}: {
    recipes: Recipe[]
}
) {
    const recipeItems: React.JSX.Element[] = []

    recipes.forEach((recipe: Recipe) => {
        recipeItems.push(<RecipeItem
        recipe={recipe}
        key={`${recipe.id}`}/>)
    })
    return(<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
        {recipeItems}
    </div>)
}