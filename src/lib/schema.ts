import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod"
import { recipesTable, categoriesTable, ingredientsTable, directionsTable, recipeCategoriesTable,  } from "./db/schema";

// zod Schemas are generated with drizzle-zod
const selectRecipeSchema = createSelectSchema(recipesTable);
export type SelectRecipe = z.infer<typeof selectRecipeSchema>
export const insertRecipeSchema = createInsertSchema(recipesTable, {
    title: z.string().min(3),
    description: z.string().min(10),
})
export type InsertRecipe = z.infer<typeof insertRecipeSchema>

const SelectCategorySchema = createSelectSchema(categoriesTable);
export type SelectCategory = z.infer<typeof SelectCategorySchema>

const SelectDirectionsSchema = createSelectSchema(directionsTable);
export type SelectDirection = z.infer<typeof SelectDirectionsSchema>

const IngredientsSchema = createSelectSchema(ingredientsTable);
export type Ingredient = z.infer<typeof IngredientsSchema>

const SelectRecipeCategoriesSchema = createSelectSchema(recipeCategoriesTable);
export type SelectRecipeCategories = z.infer<typeof SelectRecipeCategoriesSchema>