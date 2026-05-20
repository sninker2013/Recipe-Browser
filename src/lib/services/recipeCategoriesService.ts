import { db } from "../db"
import { recipeCategoriesTable } from "../db/schema"
import { RecipeCategories } from "../schema"
import { eq } from "drizzle-orm"

export async function addCategoriesToRecipe(recipeId: number, categoryIds: number[]): Promise<RecipeCategories[]> {
    try {
        const recipeCategories: RecipeCategories[] = categoryIds.map(categoryId => (
            {recipeId: recipeId, categoryId: categoryId}
        ))

        const results = await db.insert(recipeCategoriesTable).values(recipeCategories).returning()

        return results
    } catch (e) {
        console.error(e)
        throw e
    }
}