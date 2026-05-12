import { db } from "../db";
import { directionsTable, Direction } from "../db/schema";
import { eq } from "drizzle-orm";

/**
 * Gets all of the directions for a recipe from the database based on the recipe slug.
 * @param recipeSlug (string) - The slug of the recipe to get the directions for.
 * @returns (Directions[]) - An array of all the directions for the recipe.
 */
export async function getDirectionsByRecipeSlug(recipeSlug: string): Promise<Direction[]> {
    try {
            const directions = await db.select().from(directionsTable)
            .where(eq(directionsTable.recipeSlug, recipeSlug))
            if (directions.length === 0) {
                throw new Error("Directions not found for recipe");
            }
            
            directions.sort((a, b) => a.position - b.position)
            return directions;
    } catch (e) {
        throw new Error("Could not connect to the database. Make sure Docker is running.");
    }
}