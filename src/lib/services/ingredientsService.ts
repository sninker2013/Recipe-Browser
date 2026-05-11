import { db } from "../db";
import { ingredientsTable } from "../db/schema";
import { eq } from "drizzle-orm";

export async function getIngredientsByRecipeSlug(recipeSlug: string){
    const ingredients = await db.select().from(ingredientsTable)
    .where(eq(ingredientsTable.recipeSlug, recipeSlug))
    return ingredients;
}