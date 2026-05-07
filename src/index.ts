import 'dotenv/config';
import { drizzle } from 'drizzle-orm/node-postgres';
import { recipesTable } from './db/schema';

const db = drizzle(process.env.DATABASE_URL!);

async function main() {
    const recipe: typeof recipesTable.$inferInsert = {
        title: 'sausage',
        description: 'its sausage',
        author: 'D',
        prepTime: '0 hours 20 minutes',
        cookTime: '1 hour',
        servings: 4
    };

    await db.insert(recipesTable).values(recipe);
    console.log('New user created!')
  
    const recipes = await db.select().from(recipesTable);
    console.log('Getting all recipes from the database: ', recipes)
}

main();
