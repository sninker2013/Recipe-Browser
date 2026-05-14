import { integer, pgTable as table, varchar, interval, primaryKey } from "drizzle-orm/pg-core";

export const recipesTable = table("recipes", {
    id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
    title: varchar("title").notNull(),
    // This is only really needed to seed the recipeCategories
    // The ID changes in subsequent seeds so we cannot use that to seed them.
    slug: varchar("slug").notNull(), 
    description: varchar("description").notNull(),
    author: varchar("author").notNull(),
    prepTime: interval("prep_time", {fields: 'hour to minute'}).notNull(),
    cookTime: interval("cook_time", {fields: 'hour to minute'}).notNull(),
    servings: integer("servings").notNull(),
})

export const categoriesTable = table("categories", {
    id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
    name: varchar("name").notNull(),
    slug: varchar("slug").notNull(),
    description: varchar("description").notNull(),
})

export const recipeCategoriesTable = table("recipe_categories", {
    recipeId: integer("recipe_id").notNull()
    .references(() => recipesTable.id),
    categoryId: integer("category_id").notNull()
        .references(() => categoriesTable.id)
})

export const ingredientsTable = table("ingredients", {
    recipeId: integer("recipe_id").notNull()
        .references(() => recipesTable.id),
    position: integer("position").notNull(),
    name: varchar("name").notNull(),
    amount: varchar("amount").notNull()
}, (table) => [
    primaryKey({ columns: [table.recipeId, table.position] })
])

export const directionsTable = table("directions", {
    recipeId: integer("recipe_id").notNull()
        .references(() => recipesTable.id),
    position: integer("position").notNull(),
    instruction: varchar("instruction").notNull()
}, (table) => [
    primaryKey({ columns: [table.recipeId, table.position] })
])
