import { db } from "../db";
import { directionsTable, } from "../db/schema/schema";
import { SelectDirection } from "../schema";
import { eq } from "drizzle-orm";

/**
 * Gets all of the directions for a recipe from the database based on the recipe ID.
 * @param recipeId (number) - The ID of the recipe to get the directions for.
 * @returns (Directions[]) - An array of all the directions for the recipe.
 * @throws Will throw an error if there is a problem connecting to the database
 *      or if the directions are not found for the recipe.
 */
export async function getDirectionsByRecipeId(recipeId: number): Promise<SelectDirection[]> {
    let directions: SelectDirection[] = []
    try {
            directions = await db.select().from(directionsTable)
            .where(eq(directionsTable.recipeId, recipeId))
    } catch (e) {
        throw new Error("Could not connect to the database. Make sure Docker is running.");
    }
    
    if (directions.length === 0) {
        throw new Error("Directions not found for recipe");
    }
    directions.sort((a, b) => a.position - b.position)
    return directions;
}