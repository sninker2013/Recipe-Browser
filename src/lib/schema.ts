import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod"
import { recipesTable, categoriesTable, ingredientsTable, directionsTable, recipeCategoriesTable,  } from "./db/schema";

// zod Schemas are generated with drizzle-zod
const selectRecipeSchema = createSelectSchema(recipesTable);
export type SelectRecipe = z.infer<typeof selectRecipeSchema>
export const insertRecipeSchema = createInsertSchema(recipesTable, {
    title: z.string().trim().min(3, "Title needs to be at least 3 characters"),
    description: z.string().trim().min(10, "Description needs to be at least 10 characters"),
})
export type InsertRecipe = z.infer<typeof insertRecipeSchema>

const selectCategorySchema = createSelectSchema(categoriesTable);
export type Category = z.infer<typeof selectCategorySchema>

const selectDirectionsSchema = createSelectSchema(directionsTable);
export type Direction = z.infer<typeof selectDirectionsSchema>

const ingredientsSchema = createInsertSchema(ingredientsTable);
export type Ingredient = z.infer<typeof ingredientsSchema>

const selectRecipeCategoriesSchema = createSelectSchema(recipeCategoriesTable);
export type SelectRecipeCategories = z.infer<typeof selectRecipeCategoriesSchema>