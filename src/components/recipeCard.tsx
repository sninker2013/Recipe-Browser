import { Recipe } from "@/lib/db/schema/schema"
import { formatInterval } from "@/lib/utils/formatInterval"
import Link from "next/link"

// This is a component for displaying a single recipe as a card. It is to be used in the recipe grid.
export function RecipeItem({recipe}: {recipe: Recipe}) {
    return(
        <Link href={`/recipes/${recipe.slug}`} className="hover:">
            <section className="p-6 m-5 bg-gray-200 rounded-xl hover:shadow-md hover:-translate-y-1 grid grid-cols-3 cursor-pointer h-full">
                <h3 className="font-bold col-span-3 text-center">{recipe.title}</h3>
                <p className="col-span-3 text-center">{recipe.author}</p>
                <p className="p-1">Prep Time:<br></br>{formatInterval(recipe.prepTime)}</p>
                <p className="p-1">Cook Time:<br></br>{formatInterval(recipe.cookTime)}</p>
                <p className="p-1">Servings:<br></br>{recipe.servings}</p>
            </section>
        </Link>
    )
}