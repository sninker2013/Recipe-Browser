import { InsertRecipe } from "@/lib/schema";
import slugify from "slugify"

export function validateRecipe(
    title: string,
    description: string,
    author: string,
    prepHrs: string,
    prepMins: string,
    cookHrs: string,
    cookMins: string,
    servings: string
): {recipe: InsertRecipe, error: string | undefined} {
    let error
    if (title.trim() === "") {
        error = "Title cannot be empty"
        return {recipe: {} as InsertRecipe, error}
    }

    if (description.trim() === "") {
        error = "Description cannot be empty"
        return {recipe: {} as InsertRecipe, error}
    }

    // Prep time conversion and validation
    if (prepHrs === "" || prepMins === "") {
        error = "Prep time cannot be empty"
        return {recipe: {} as InsertRecipe, error}
    }

    const prepHrsNum = Number(prepHrs)
    const prepMinsNum = Number(prepMins)
    if (isNaN(prepHrsNum) || isNaN(prepMinsNum)) {
        error = "Prep time must be numeric"
        return {recipe: {} as InsertRecipe, error}
    }
    if (prepHrsNum > 99) {
        error = "Prep time hours must be less than 100"
        return {recipe: {} as InsertRecipe, error}
    }
    if (prepMinsNum >= 60) {
        error = "Prep time minutes needs to be less than 60"
        return {recipe: {} as InsertRecipe, error}
    }

    // Cook time conversion and validation
    if (cookHrs === "" || cookMins === "") {
        error = "Cook time cannot be empty"
        return {recipe: {} as InsertRecipe, error}
    }

    const cookHrsNum = Number(cookHrs)
    const cookMinsNum = Number(cookMins)
    if (isNaN(cookHrsNum) || isNaN(cookMinsNum)) {
        error = "Cook time must be numeric"
        return {recipe: {} as InsertRecipe, error}
    }
    if (cookHrsNum > 99) {
        error = "Cook time hours must be less than 100"
        return {recipe: {} as InsertRecipe, error}
    }
    if (cookMinsNum >= 60) {
        error = "Cook time minutes needs to be less than 60"
        return {recipe: {} as InsertRecipe, error}
    }

    const prepTime = `${prepHrs.padStart(2, "0")}:${prepMins.padStart(2, "0")}`
    const cookTime = `${cookHrs.padStart(2, "0")}:${cookMins.padStart(2, "0")}`

    // Servings validation
    if (servings === "") {
        error = "Servings cannot be empty"
        return {recipe: {} as InsertRecipe, error}
    }

    const servingsNum = Number(servings)
    if (isNaN(servingsNum)) {
        error = "Servings must be numeric"
        return {recipe: {} as InsertRecipe, error}
    }
    if (servingsNum > 99) {
        error = "Servings need to be less than 100"
        return {recipe: {} as InsertRecipe, error}
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
    return { recipe, error }
}