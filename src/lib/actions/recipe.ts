'use server'

import { Ingredient, InsertRecipe, SelectRecipe } from "../schema";
import { createRecipe } from "../services/recipeService";
import { createIngredients } from "../services/ingredientsService";
import { IngredientInput, RecipeInput } from "@/app/recipes/new/RecipeForm";
import { insertRecipeSchema } from "../schema";
import slugify from "slugify"
import { auth } from "../utils/auth";
import { headers } from "next/headers";

export async function createRecipeAction(recipeInput: RecipeInput): Promise<{ error: string } | SelectRecipe> {

    const session = await auth.api.getSession({ headers: await headers() });

    //shouldn't throw, as access to any routes that call this function redirect if not authenticated
    if (!session?.user.username) throw new Error("Not authenticated");

    const prepTime = `${recipeInput.prepHrs.padStart(2, "0")}:${recipeInput.prepMins.padStart(2, "0")}`
    const cookTime = `${recipeInput.cookHrs.padStart(2, "0")}:${recipeInput.cookMins.padStart(2, "0")}`
    const servingsNum = Number(recipeInput.servings)

    const recipe: InsertRecipe = {
        title: recipeInput.title,
        slug: slugify(recipeInput.title),
        description: recipeInput.description,
        author: session.user.username,
        prepTime: prepTime,
        cookTime: cookTime,
        servings: servingsNum
    }

    const result = insertRecipeSchema.safeParse(recipe);
    if (!result.success) {
        return { error: result.error.issues[0].message };
    }
    
    return await createRecipe(result.data);
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