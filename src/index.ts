import 'dotenv/config';
import { drizzle } from 'drizzle-orm/node-postgres';
import { recipes as recipesTable, ingredients as ingredientsTable } from './db/schema';

const db = drizzle(process.env.DATABASE_URL!);

async function main() {
    const recipe: typeof recipesTable.$inferInsert = {
        title: 'Sausage',
        slug: 'sausage',
        description: 'its sausage',
        author: 'D',
        prepTime: '0 hours 20 minutes',
        cookTime: '1 hour',
        servings: 4
    };

    const ingredient: typeof ingredientsTable.$inferInsert = {
        recipeId: 5,
        position: 1,
        name: "salt",
        amount: "1 tsp"
    }

    await db.insert(recipesTable).values(recipe);
    await db.insert(ingredientsTable).values(ingredient);
  
    const recipes = await db.select().from(recipesTable);
    const ingredients = await db.select().from(ingredientsTable);
    console.log('Getting all recipes and ingredients from the database: ',
         recipes, ingredients)
}

main();
