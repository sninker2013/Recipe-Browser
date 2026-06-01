import RecipesGrid from "@/components/RecipeGrid"
import { getRecipesByAuthor } from "@/lib/services/recipeService";

export default async function UserRecipePage({
    params,
}: {
    params: Promise<{ author: string }>
}) {
  const { author } = await params
  const recipes = await getRecipesByAuthor(author)
  return (<>
  <h2 className="text-center">My Recipes</h2>
  <RecipesGrid recipes={recipes}></RecipesGrid>
  </>)
}