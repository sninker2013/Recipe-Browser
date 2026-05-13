import { SelectRecipe } from "@/lib/schema"
import { RecipeItem } from "./RecipeCard"

// This is a component for displaying a grid of recipes.
export default function RecipesGrid({
    recipes
}: {
    recipes: SelectRecipe[]
}
) {
    const recipeItems: React.JSX.Element[] = []

    recipes.forEach((recipe: SelectRecipe) => {
        recipeItems.push(<RecipeItem
        recipe={recipe}
        key={`${recipe.id}`}/>)
    })
    return(<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
        {recipeItems}
    </div>)
}