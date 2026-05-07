import { integer, pgTable, varchar, interval, jsonb } from "drizzle-orm/pg-core";

export const recipesTable = pgTable("recipes", {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    title: varchar().notNull(),
    description: varchar().notNull(),
    author: varchar().notNull(),
    prepTime: interval({fields: 'hour to minute'}).notNull(),
    cookTime: interval({fields: 'hour to minute'}).notNull(),
    servings: integer().notNull(),
})