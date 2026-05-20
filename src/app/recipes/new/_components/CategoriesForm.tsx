'use client'

import { CategoryForm } from "../RecipeForm"

/**
 * Form elements for the categories of a recipe.
 * @param categories - list of all available categories, each extended with isChecked 
 * to track checkbox state in the form
 * @param setCategories - state setter from the parent form, used to toggle isChecked on a category
 */
export default function CategoriesForm({
    categories,
    setCategories
}: {
    categories: CategoryForm[],
    setCategories: React.Dispatch<React.SetStateAction<CategoryForm[]>>
}) {
    // flips the isChecked bool when the user checks/unchecks a category
    const updateCheck = (id: number) => {
        setCategories(categories.map(category => (
            category.id === id ? {...category, isChecked: !category.isChecked} : category
        )))
    }
    const categoryItems: React.JSX.Element[] =
    categories.map(category => (
        <div key={category.id}>
            <input type="checkbox" id={`${category.id}`} name={category.name}
            onChange={() => updateCheck(category.id)}
            ></input>
            <label htmlFor={`${category.id}`} className="m-2">{category.name}</label>
        </div>
    )) 
    

    return(<>
    <h3 className="text-2xl font-bold mb-0 text-center">Categories</h3>
    <p className="italic mb-4 text-gray-500">Select any number of categories that match your recipe!</p>
    <div className="flex justify-between">
        {categoryItems}
    </div>
    </>)
}