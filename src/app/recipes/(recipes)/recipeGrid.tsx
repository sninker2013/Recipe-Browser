import { Recipe } from "@/lib/db/schema"
import { formatInterval } from "../../../lib/utils/formatInterval"

export function RecipesDisplay({recipes}: {recipes: Recipe[]}) {
    const recipeItems: React.JSX.Element[] = []

    recipes.forEach((recipe: Recipe) => {
        recipeItems.push(<RecipeItem
        recipe={recipe}
        key={`${recipe.id}`}/>)
    })
    return(<div className="grid grid-cols-3">
        {recipeItems}
    </div>)
}

function RecipeItem({recipe}: {recipe: Recipe}) {
    return(
        <section className="p-6 m-1 bg-gray-200 rounded-xl shadow-md grid grid-cols-3">
            <h3 className="font-bold col-span-3 text-center">{recipe.title}</h3>
            <p className="col-span-3 text-center">{recipe.author}</p>
            <p>Prep Time:<br></br>{formatInterval(recipe.prepTime)}</p>
            <p>Cook Time:<br></br>{formatInterval(recipe.cookTime)}</p>
            <p>Servings:<br></br>{recipe.servings}</p>
        </section>
    )
}