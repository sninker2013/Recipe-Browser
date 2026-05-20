import { getAllCategoriesAction } from "@/lib/actions/recipe";

import RecipeForm from "./RecipeForm";

export default async function CreateRecipePage() {
    // Need to drill this into the category part of the form as we need the categories to know how many checks to display
    const categories = await getAllCategoriesAction()
    return(
        <section className="text-center m-5">
            <h2>Create a Custom Recipe</h2>
            {/* We add the isChecked property to allow form submission with just one object type
                instead of having both Category and CategoryForm*/}
            <RecipeForm initialCategories={categories.map(c => ({ ...c, isChecked: false }))}></RecipeForm>
        </section>
    )

}