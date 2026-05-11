import { db } from "../db";
import { categoriesTable } from "../db/schema";

/**
 * Gets all the categories from the database.
 * @returns (Category[]) - An array of all the categories in the database.
 */
export async function getAllCategories() {
    return await db.select().from(categoriesTable);
}
