import 'dotenv/config';
import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from "pg"
import { categoriesTable, recipesTable, ingredientsTable, recipeCategoriesTable, directionsTable } from './schema/schema';
import { SelectRecipe, SelectCategory } from '../schema';

import { categoryData, recipeCategoryData } from './data/categoryData';
import { recipeData } from './data/recipeData';
import { ingredientData } from './data/ingredientData';
import { directionData } from './data/directionData';
import { exit } from 'process';
// Seed file made with help from: https://www.youtube.com/watch?v=n9rtLhMN3cc

const pool =  new Pool({
    connectionString: process.env.DATABASE_URL
})

const db = drizzle(pool)

async function seed() {
    console.log("seeding started!");
    await db.delete(recipeCategoriesTable);
    await db.delete(categoriesTable);
    await db.delete(ingredientsTable);
    await db.delete(directionsTable);
    await db.delete(recipesTable);
    
    const categories = await db.insert(categoriesTable).values(categoryData).returning();
    const recipes = await db.insert(recipesTable).values(recipeData).returning();

    // Need to do this because the ID changes with repeat seeds while slug stays consistent
    const recipeIdBySlug = Object.fromEntries(
        recipes.map(r => [r.slug, r.id])
    )
    
    await db.insert(ingredientsTable).values(
        ingredientData.map(({ recipeSlug, ...rest }) => ({
            ...rest,
            recipeId: recipeIdBySlug[recipeSlug]
        }))
    )
    await db.insert(directionsTable).values(
        directionData.map(({ recipeSlug, ...rest }) => ({
            ...rest,
            recipeId: recipeIdBySlug[recipeSlug]
        }))
    );
    await db.insert(recipeCategoriesTable).values(seedRecipeCategories(recipes, categories));

    console.log("Seeding complete!")
    exit(0);
}

function seedRecipeCategories(recipes: SelectRecipe[], categories: SelectCategory[]) {
    const recipeCategories = [];
    for (let i = 0; i < recipeCategoryData.length; i++) {
        const recipeCategory = recipeCategoryData[i];
        const recipe = recipes.find(r => r.slug === recipeCategory.recipeSlug);
        const category = categories.find(c => c.slug === recipeCategory.categorySlug);
        if (recipe && category) {
            recipeCategories.push({
                recipeId: recipe.id,
                categoryId: category.id
            });
        }
    }
    return recipeCategories;
}

seed()