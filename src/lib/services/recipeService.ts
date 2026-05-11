import { db } from "../db";
import { recipesTable } from "../db/schema";
import { eq } from "drizzle-orm";

export async function getAllRecipes() {
    return await db.select().from(recipesTable);
}

export async function getRecipeBySlug(slug: string) {
    const recipe = await db.select().from(recipesTable)
    .where(eq(recipesTable.slug, slug))
    return recipe[0];
}
