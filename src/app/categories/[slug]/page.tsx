import { getCategoryBySlug } from "@/lib/services/categoryService";
import { getRecipesByCategoryId } from "@/lib/services/recipeService";
import RecipesGrid from "@/components/RecipeGrid";

export default async function CategoryPage({
    params, 
}: {
    params: Promise<{ slug: string }>,
}) {
    const { slug } = await params
    const category = await getCategoryBySlug(slug);
    const recipes = await getRecipesByCategoryId(category.id);
    return (<>
        <h2 className="text-center m-5">{category.name}</h2>
        <RecipesGrid recipes={recipes}></RecipesGrid>
    </>)
}