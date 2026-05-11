import { db } from "../db";
import { ingredientsTable } from "../db/schema";
import { eq } from "drizzle-orm";

/**
 * Gets all of the ingredients for a recipe from the database based on the recipe slug.
 * @param recipeSlug (string) - The slug of the recipe to get the ingredients for.
 * @returns (Ingredient[]) - An array of all the ingredients for the recipe.
 */
export async function getIngredientsByRecipeSlug(recipeSlug: string){
    const ingredients = await db.select().from(ingredientsTable)
    .where(eq(ingredientsTable.recipeSlug, recipeSlug))
    ingredients.sort((a, b) => a.position - b.position)
    return ingredients;
}