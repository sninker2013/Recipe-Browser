import { getCategoryBySlug } from "@/lib/services/categoryService";
import { getRecipesByCategoryId } from "@/lib/services/recipeService";
import RecipesGrid from "@/components/RecipeGrid";

import notFound from "../notFound";

export default async function CategoryPage({
    params, 
}: {
    params: Promise<{ slug: string }>,
}) {
    const { slug } = await params
    const category = await getCategoryBySlug(slug);
    if (!category) {
        return notFound();
    }
    const recipes = await getRecipesByCategoryId(category.id);
    return (<>
        <h2 className="text-center m-5">{category.name}</h2>
        <RecipesGrid recipes={recipes}></RecipesGrid>
    </>)
}