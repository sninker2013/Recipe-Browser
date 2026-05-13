import { db } from "../db";
import { categoriesTable, recipeCategoriesTable } from "../db/schema/schema";
import { SelectCategory } from "../schema";
import { eq, inArray } from "drizzle-orm";

/**
 * Gets all the categories from the database.
 * @returns (Category[]) - An array of all the categories in the database.
 * @throws Will throw an error if there is a problem connecting to the database.
 */
export async function getAllCategories(): Promise<SelectCategory[]> {
    try {
        return await db.select().from(categoriesTable);
    } catch (e) {
        throw new Error("Could not connect to the database. Make sure Docker is running.");
    }
}

/**
 * Gets a single category from the database based on the slug.
 * @param slug (string) - The slug of the category to get.
 * @returns (Category) - A single category.
 * @throws Will throw an error if there is a problem connecting to the database 
 *  or if the category is not found.
 */
export async function getCategoryBySlug(slug: string): Promise<SelectCategory> {
    try {
        const category = await db.select().from(categoriesTable)
        .where(eq(categoriesTable.slug, slug))

        return category[0];
    } catch (e) {
        throw new Error("Could not connect to the database. Make sure Docker is running.");
    }
}

/**
 * Gets all of the categories from the database that belong to a recipe.
 * @param recipeId (number) - The id of the recipe to get the categories.
 * @returns (Category[]) - An array of all the categories that belong to the recipe.
 * @throws Will throw an error if there is a problem connecting to the database 
 *  or if the categories are not found for the recipe.
 */
export async function getCategoriesByRecipeId(recipeId: number): Promise<SelectCategory[]> {
    try {
            const recipeCategories = await db.select().from(recipeCategoriesTable)
            .where(eq(recipeCategoriesTable.recipeId, recipeId))
        
            const categoryIds = recipeCategories.map(rc => rc.categoryId);
        
            const categories = await db.select().from(categoriesTable)
            .where(inArray(categoriesTable.id, categoryIds));

            return categories;
    } catch (e) {
        throw new Error("Could not connect to the database. Make sure Docker is running.");
    }
}
