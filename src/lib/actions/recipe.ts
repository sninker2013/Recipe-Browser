'use server'

import { InsertRecipe, SelectRecipe } from "../schema";
import { createRecipe } from "../services/recipeService";

export async function createRecipeAction(recipe: InsertRecipe): Promise<SelectRecipe> {
    return await createRecipe(recipe);
}