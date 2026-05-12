import { db } from "../db";
import { recipesTable, recipeCategoriesTable, Recipe } from "../db/schema";
import { eq, inArray } from "drizzle-orm";

/**
 * Gets all the recipes from the database.
 * @returns (Recipe[]) - An array of all the recipes in the database.
 */
export async function getAllRecipes(): Promise<Recipe[]> {
    return await db.select().from(recipesTable);
}

/**
 * Gets a single recipe from the database based on the slug.
 * @param slug (string) - The slug of the recipe to get.
 * @returns (Recipe) - A single recipe.
 */
export async function getRecipeBySlug(slug: string): Promise<Recipe> {
    const recipe = await db.select().from(recipesTable)
    .where(eq(recipesTable.slug, slug))
    return recipe[0];
}

/**
 * Gets all of the recipes from the database that belong in a certain category based on the category id.
 * @param categoryId (number) - The id of the category to get the recipes for.
 * @returns (Recipe[]) - An array of all the recipes that belong in the category.
 */
export async function getRecipesByCategoryId(categoryId: number): Promise<Recipe[]> {
    const recipeCategories = await db.select().from(recipeCategoriesTable)
    .where(eq(recipeCategoriesTable.categoryId, categoryId))

    const recipeIds = recipeCategories.map(rc => rc.recipeId);

    return await db.select().from(recipesTable)
    .where(inArray(recipesTable.id, recipeIds));
}