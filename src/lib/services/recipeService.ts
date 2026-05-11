import { db } from "../db";
import { recipesTable, recipeCategoriesTable, Recipe } from "../db/schema";
import { eq, inArray } from "drizzle-orm";

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

export async function getRecipesByCategory(categoryId: number): Promise<Recipe[]> {
    const recipeCategories = await db.select().from(recipeCategoriesTable)
    .where(eq(recipeCategoriesTable.categoryId, categoryId))

    const recipeIds = recipeCategories.map(rc => rc.recipeId);

    return await db.select().from(recipesTable)
    .where(inArray(recipesTable.id, recipeIds));
}