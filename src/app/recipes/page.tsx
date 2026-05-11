import Link from "next/link"
import { getAllRecipes } from "@/lib/services/recipeService"
import RecipesDisplay from "../../components/recipeGrid"

// This page displays all the recipes in a grid.
export default async function RecipePage() {
  const recipes = await getAllRecipes()
  return (<>
  <h2 className="text-center">Recipes</h2>
  <RecipesDisplay recipes={recipes}></RecipesDisplay>
  </>)
}