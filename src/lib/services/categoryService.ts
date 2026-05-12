import { db } from "../db";
import { categoriesTable, Category, recipeCategoriesTable } from "../db/schema";
import { eq, inArray } from "drizzle-orm";

/**
 * Gets all the categories from the database.
 * @returns (Category[]) - An array of all the categories in the database.
 */
export async function getAllCategories(): Promise<Category[]> {
    try {
        return await db.select().from(categoriesTable);
    } catch (e) {
        throw new Error("Could not connect to the database. Make sure Docker is running.");
    }
}

/**
 * Gets a single category from the database based on the slug.
 * @param slug (string) - The slug of the category to get.
 * @returns (Recipe) - A single category.
 */
export async function getCategoryBySlug(slug: string): Promise<Category> {
    try {
        const recipe = await db.select().from(categoriesTable)
        .where(eq(categoriesTable.slug, slug))
        if (recipe.length === 0) {
            throw new Error("Category not found");
        }

        return recipe[0];
    } catch (e) {
        throw new Error("Could not connect to the database. Make sure Docker is running.");
    }
}

export async function getCategoriesByRecipeId(recipeId: number): Promise<Category[]> {
    try {
            const recipeCategories = await db.select().from(recipeCategoriesTable)
            .where(eq(recipeCategoriesTable.recipeId, recipeId))
        
            const categoryIds = recipeCategories.map(rc => rc.categoryId);
        
            const categories = await db.select().from(categoriesTable)
            .where(inArray(categoriesTable.id, categoryIds));
            if (categories.length === 0) {
                throw new Error("Categories not found for recipe");
            }
        
            return categories;
    } catch (e) {
        throw new Error("Could not connect to the database. Make sure Docker is running.");
    }
}
