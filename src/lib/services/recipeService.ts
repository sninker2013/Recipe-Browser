import { db } from "../db";
import { recipesTable } from "../db/schema";
import { eq } from "drizzle-orm";

/**
 * Gets all the recipes from the database.
 * @returns (Recipe[]) - An array of all the recipes in the database.
 */
export async function getAllRecipes() {
    return await db.select().from(recipesTable);
}

/**
 * Gets a single recipe from the database based on the slug.
 * @param slug (string) - The slug of the recipe to get.
 * @returns (Recipe) - A single recipe.
 */
export async function getRecipeBySlug(slug: string) {
    const recipe = await db.select().from(recipesTable)
    .where(eq(recipesTable.slug, slug))
    return recipe[0];
}
