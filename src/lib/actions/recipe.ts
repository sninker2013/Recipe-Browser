'use server'

import { Ingredient, InsertRecipe, SelectRecipe } from "../schema";
import { createRecipe } from "../services/recipeService";
import { createIngredients } from "../services/ingredientsService";
import { IngredientInput } from "@/app/recipes/new/RecipeForm";

export async function createRecipeAction(recipe: InsertRecipe): Promise<SelectRecipe> {
    return await createRecipe(recipe);
}

export async function createIngredientsAction(ingredientsInput: IngredientInput[], recipeId: number): Promise<Ingredient[]> {
    const ingredients: Ingredient[] = 
    ingredientsInput.map((ingredient, index) => ({
        recipeId: recipeId,
        position: index + 1,
        amount: ingredient.amount,
        name: ingredient.name,
    }))

    return await createIngredients(ingredients)
}