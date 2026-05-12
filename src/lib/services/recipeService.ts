import { db } from "../db";
import { recipesTable, recipeCategoriesTable, Recipe } from "../db/schema";
import { eq, inArray } from "drizzle-orm";

/**
 * Gets all the recipes from the database.
 * @returns (Recipe[]) - An array of all the recipes in the database.
 * @throws Will throw an error if there is a problem connecting to the database.
 */
export async function getAllRecipes(): Promise<Recipe[]> {
    try {
        return await db.select().from(recipesTable);
    } catch (e) {
        throw new Error("Could not connect to the database. Make sure Docker is running.");
    }
}

/**
 * Gets a single recipe from the database based on the id.
 * @param id (id) - The id of the recipe to get.
 * @returns (Recipe) - A single recipe.
 * @throws Will throw an error if there is a problem connecting to the database
 *      or if the recipe is not found.
 */
export async function getRecipeById(id: number): Promise<Recipe> {
    try {
            const recipe = await db.select().from(recipesTable)
            .where(eq(recipesTable.id, id))
            return recipe[0];
    } catch (e) {
        throw new Error("Could not connect to the database. Make sure Docker is running.");
    }
}

/**
 * Gets all of the recipes from the database that belong in a certain category based on the category id.
 * @param categoryId (number) - The id of the category to get the recipes for.
 * @returns (Recipe[]) - An array of all the recipes that belong in the category.
 * @throws Will throw an error if there is a problem connecting to the database
 *      or if there are no recipes found for the category.
 */
export async function getRecipesByCategoryId(categoryId: number): Promise<Recipe[]> {
    try {
            const recipeCategories = await db.select().from(recipeCategoriesTable)
            .where(eq(recipeCategoriesTable.categoryId, categoryId))
        
            const recipeIds = recipeCategories.map(rc => rc.recipeId);
        
            return await db.select().from(recipesTable)
            .where(inArray(recipesTable.id, recipeIds));
    } catch (e) {
        throw new Error("Could not connect to the database. Make sure Docker is running.");
    }
}