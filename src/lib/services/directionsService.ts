import { db } from "../db";
import { directionsTable } from "../db/schema";
import { eq } from "drizzle-orm";

export async function getDirectionsByRecipeSlug(recipeSlug: string){
    const ingredients = await db.select().from(directionsTable)
    .where(eq(directionsTable.recipeSlug, recipeSlug))
    return ingredients;
}