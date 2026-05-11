import { db } from "../db";
import { categoriesTable, Category } from "../db/schema";
import { eq } from "drizzle-orm";

/**
 * Gets all the categories from the database.
 * @returns (Category[]) - An array of all the categories in the database.
 */
export async function getAllCategories(): Promise<Category[]> {
    return await db.select().from(categoriesTable);
}

/**
 * Gets a single category from the database based on the slug.
 * @param slug (string) - The slug of the category to get.
 * @returns (Recipe) - A single category.
 */
export async function getCategoryBySlug(slug: string): Promise<Category> {
    const recipe = await db.select().from(categoriesTable)
    .where(eq(categoriesTable.slug, slug))
    return recipe[0];
}
