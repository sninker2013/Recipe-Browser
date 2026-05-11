import { getRecipeBySlug } from "@/lib/services/recipeService";

export default async function RecipeDetailPage({ params }: { params: { slug: string } }) {
    const { slug } = await params
    const recipe = await getRecipeBySlug(slug)

    return (<>
    <h2 className="text-center">{recipe[0].title}</h2>
    </>)
}