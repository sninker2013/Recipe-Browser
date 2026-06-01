'use server'

import slugify from "slugify"
import { headers } from "next/headers";

import { DirectionForm, IngredientForm, RecipeInput } from "@/app/recipes/new/RecipeForm";

import { Category, Direction, Ingredient, InsertRecipe, RecipeCategories, SelectRecipe } from "../schema";
import { createRecipe } from "../services/recipeService";
import { createIngredients } from "../services/ingredientsService";
import { createDirections } from "../services/directionsService";
import { getAllCategories } from "../services/categoryService";
import { insertRecipeSchema, ingredientsSchema, directionsSchema } from "../schema";
import { auth } from "../utils/auth";
import { addCategoriesToRecipe } from "../services/recipeCategoriesService";
import { revalidatePath } from "next/cache";
import z from "zod";

/**
 * Takes a recipe input, transforms it to a Recipe object, and passes it to the createRecipe service. 
 * @param recipeInput - All of the data submitted from the form in an object
 * @returns either the successful Recipe object or an error message.
 */
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
    try {
        return await createRecipe(result.data);
    } catch (e) {
        console.error(e)
        return { error: "Failed to save recipe" }
    }
}

/**
 * Takes the ingredients form input and the created recipeId, transforms them to Ingredient objects,
 * and passes those the the createIngredients service.
 * @param ingredientsInput - The form inputs for ingredients 
 * @param recipeId - The ID of the recipe these ingredients belong to.
 * @returns - an array of Ingredients that were added to the db.
 */
export async function createIngredientsAction(ingredientsInput: IngredientForm[], recipeId: number): 
Promise<{ error: string } | Ingredient[]> {
    const ingredients: Ingredient[] = 
    ingredientsInput.map((ingredient, index) => ({
        recipeId: recipeId,
        position: index + 1,
        amount: ingredient.amount,
        name: ingredient.name,
    }))

    const result = z.array(ingredientsSchema).safeParse(ingredients)
        if (!result.success) return { error: result.error.issues[0].message }
    try {
        return await createIngredients(ingredients)
    } catch (e) {
        console.error(e)
        return { error: "Failed to save ingredients" }   
    }
}

/**
 * Takes the directions form input and the created recipeId, transforms them to Direction objects,
 * and passes those the the createDirections service.
 * @param ingredientsInput - The form inputs for directions 
 * @param recipeId - The ID of the recipe these directions belong to.
 * @returns - an array of Directions that were added to the db.
 */
export async function createDirectionsAction(directionsInput: DirectionForm[], recipeId: number):
Promise<{ error: string } | Direction[]> {
    const directions: Direction[] = 
    directionsInput.map((direction, index) => ({
        recipeId: recipeId,
        position: index + 1,
        instruction: direction.instruction
    }))

    const result = z.array(directionsSchema).safeParse(directions)
        if (!result.success) return { error: result.error.issues[0].message }
    try {
        return await createDirections(directions)
    } catch (e) {
        console.error(e)
        return { error: "Failed to save directions" }
    }
}

export async function addCategoriesAction(recipeId: number, categoryIds: number[]):
Promise<{error: string} | RecipeCategories[]> {
    const validCategories = await getAllCategories()
    const validIds = new Set(validCategories.map(c => c.id))
    
    // tests to see if all submitted ID's exist in the categories table.
    const allValid = categoryIds.every(id => validIds.has(id))
    if (!allValid) return { error: "Invalid category" }
    
    try {
        return addCategoriesToRecipe(recipeId, categoryIds)
    } catch (e) {
        console.error(e)
        return { error: "Failed to save recipe categories" }
    }
}

/**
 * revalidates any paths that may use the new created recipe.
 * This needs to be its own action because of the other split up actions.
 */
export async function finalizeRecipeAction() {
    revalidatePath("/recipes")
    revalidatePath("/categories/[slug]", "page")
}