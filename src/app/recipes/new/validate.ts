import { DirectionForm, IngredientForm, RecipeInput } from "./BaseRecipeForm";

export function validateRecipe(recipeInput: RecipeInput): string | undefined {
    // Prep time conversion and validation
    if (recipeInput.prepHrs === "" && recipeInput.prepMins === "") {
        return "Prep time cannot be empty"
    }

    const prepHrsNum = Number(recipeInput.prepHrs)
    const prepMinsNum = Number(recipeInput.prepMins)
    if (isNaN(prepHrsNum) || isNaN(prepMinsNum)) {
        return "Prep time must be numeric"
    }
    if (prepHrsNum > 99) {
        return "Prep time hours must be less than 100"
    }
    if (prepMinsNum >= 60) {
        return "Prep time minutes needs to be less than 60"
    }

    // Cook time conversion and validation
    if (recipeInput.cookHrs === "" && recipeInput.cookMins === "") {
        return "Cook time cannot be empty"
    }

    const cookHrsNum = Number(recipeInput.cookHrs)
    const cookMinsNum = Number(recipeInput.cookMins)
    if (isNaN(cookHrsNum) || isNaN(cookMinsNum)) {
        return "Cook time must be numeric"
    }
    if (cookHrsNum > 99) {
        return "Cook time hours must be less than 100"
    }
    if (cookMinsNum >= 60) {
        return "Cook time minutes needs to be less than 60"
    }

    // Servings validation
    if (recipeInput.servings === "") {
        return "Servings cannot be empty"
    }

    const servingsNum = Number(recipeInput.servings)
    if (isNaN(servingsNum)) {
        return "Servings must be numeric"
    }
    if (servingsNum > 99) {
        return "Servings need to be less than 100"
    }
    if (servingsNum == 0) {
        return "Servings need to be at least 1"
    }
}

export function validateIngredients(ingredientsInput: IngredientForm[]): string | undefined {
    if (ingredientsInput.length === 0) {
        return "At least 1 ingredient is required"
    }
    for (const ingredient of ingredientsInput) {
        if (ingredient.name.trim() === "") {
            return "Ingredient name cannot be empty"
        }
    }
}

export function validateDirections(directionsInput: DirectionForm[]): string | undefined {
    if (directionsInput.length === 0) {
        return "At least 1 direction is required"
    }
    for (const direction of directionsInput) {
        if (direction.instruction.trim() === "") {
            return "Direction cannot be empty"
        }
    }
}