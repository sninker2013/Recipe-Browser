import { Ingredient, InsertRecipe, insertRecipeSchema } from "@/lib/schema";
import slugify from "slugify"
import { IngredientInput } from "./RecipeForm";

export function validateRecipe(
    title: string,
    description: string,
    author: string,
    prepHrs: string,
    prepMins: string,
    cookHrs: string,
    cookMins: string,
    servings: string
): {recipe: InsertRecipe, recipeErr: string | undefined} {
    let recipeErr: string | undefined
    if (title.trim() === "") {
        recipeErr = "Title cannot be empty"
        return {recipe: {} as InsertRecipe, recipeErr}
    }

    if (description.trim() === "") {
        recipeErr = "Description cannot be empty"
        return {recipe: {} as InsertRecipe, recipeErr}
    }

    // Prep time conversion and validation
    if (prepHrs === "" && prepMins === "") {
        recipeErr = "Prep time cannot be empty"
        return {recipe: {} as InsertRecipe, recipeErr}
    }

    const prepHrsNum = Number(prepHrs)
    const prepMinsNum = Number(prepMins)
    if (isNaN(prepHrsNum) || isNaN(prepMinsNum)) {
        recipeErr = "Prep time must be numeric"
        return {recipe: {} as InsertRecipe, recipeErr}
    }
    if (prepHrsNum > 99) {
        recipeErr = "Prep time hours must be less than 100"
        return {recipe: {} as InsertRecipe, recipeErr}
    }
    if (prepMinsNum >= 60) {
        recipeErr = "Prep time minutes needs to be less than 60"
        return {recipe: {} as InsertRecipe, recipeErr}
    }

    // Cook time conversion and validation
    if (cookHrs === "" && cookMins === "") {
        recipeErr = "Cook time cannot be empty"
        return {recipe: {} as InsertRecipe, recipeErr}
    }

    const cookHrsNum = Number(cookHrs)
    const cookMinsNum = Number(cookMins)
    if (isNaN(cookHrsNum) || isNaN(cookMinsNum)) {
        recipeErr = "Cook time must be numeric"
        return {recipe: {} as InsertRecipe, recipeErr}
    }
    if (cookHrsNum > 99) {
        recipeErr = "Cook time hours must be less than 100"
        return {recipe: {} as InsertRecipe, recipeErr}
    }
    if (cookMinsNum >= 60) {
        recipeErr = "Cook time minutes needs to be less than 60"
        return {recipe: {} as InsertRecipe, recipeErr}
    }

    const prepTime = `${prepHrs.padStart(2, "0")}:${prepMins.padStart(2, "0")}`
    const cookTime = `${cookHrs.padStart(2, "0")}:${cookMins.padStart(2, "0")}`

    // Servings validation
    if (servings === "") {
        recipeErr = "Servings cannot be empty"
        return {recipe: {} as InsertRecipe, recipeErr}
    }

    const servingsNum = Number(servings)
    if (isNaN(servingsNum)) {
        recipeErr = "Servings must be numeric"
        return {recipe: {} as InsertRecipe, recipeErr}
    }
    if (servingsNum > 99) {
        recipeErr = "Servings need to be less than 100"
        return {recipe: {} as InsertRecipe, recipeErr}
    }
    if (servingsNum == 0) {
        recipeErr = "Servings need to be at least 1"
        return {recipe: {} as InsertRecipe, recipeErr}
    }
    const recipe: InsertRecipe = {
        title: title,
        slug: slugify(title),
        description: description,
        author: author,
        prepTime: prepTime,
        cookTime: cookTime,
        servings: servingsNum
    }
    return { recipe, recipeErr }
}

export function validateIngredients(ingredientsInput: IngredientInput[]): string | undefined {
    let error

    for (let i = 0; i < ingredientsInput.length; i++) {
        if (ingredientsInput[i].name.trim() === "") {
            error = "Ingredient name cannot be empty"
            return error;
        }
    }

    return error
}