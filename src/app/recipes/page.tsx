import RecipesGrid from "../../components/RecipeGrid"

// This page displays all the recipes in a grid.
export default function RecipePage() {
  return (<>
  <h2 className="text-center">Recipes</h2>
  <RecipesGrid></RecipesGrid>
  </>)
}