import { db } from "../db";
import { ingredientsTable, Ingredient } from "../db/schema/schema";
import { eq } from "drizzle-orm";

/**
 * Gets all of the ingredients for a recipe from the database based on the recipe ID.
 * @param recipeId (number) - The ID of the recipe to get the ingredients for.
 * @returns (Ingredient[]) - An array of all the ingredients for the recipe.
 * @throws Will throw an error if there is a problem connecting to the database
 *      or if the ingredients are not found for the recipe.
 */
export async function getIngredientsByRecipeId(recipeId: number): Promise<Ingredient[]> {
    let ingredients: Ingredient[] = []
    try {
            ingredients = await db.select().from(ingredientsTable)
            .where(eq(ingredientsTable.recipeId, recipeId))
    } catch (e) {
        throw new Error("Could not connect to the database. Make sure Docker is running.");
    }
    
    if (ingredients.length === 0) {
        throw new Error("Ingredients not found for recipe");
    }
    ingredients.sort((a, b) => a.position - b.position)
    return ingredients;
}