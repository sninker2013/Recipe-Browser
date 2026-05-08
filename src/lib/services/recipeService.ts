import { db } from "../db";
import { recipesTable } from "../db/schema";

export async function getAllRecipes() {
    return await db.select().from(recipesTable);
}
