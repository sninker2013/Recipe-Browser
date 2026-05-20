import { getAllRecipes } from "@/lib/services/recipeService"

import RecipesGrid from "../../components/RecipeGrid"

// This page displays all the recipes in a grid.
export default async function RecipePage() {
  const recipes = await getAllRecipes();
  return (<>
  <h2 className="text-center">Recipes</h2>
  <RecipesGrid recipes={recipes}></RecipesGrid>
  </>)
}