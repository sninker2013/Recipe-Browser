'use client'

import { CategoryForm } from "../MainRecipeForm"

export default function CategoriesForm({
    categories,
    setCategories
}: {
    categories: CategoryForm[],
    setCategories: React.Dispatch<React.SetStateAction<CategoryForm[]>>
}) {
    const updateCheck = (slug: string) => {
        setCategories(categories.map(category => (
            category.slug === slug ? {...category, isChecked: !category.isChecked} : category
        )))
    }
    const categoryItems: React.JSX.Element[] =
    categories.map(category => (
        <div key={category.slug}>
            <input type="checkbox" id={category.slug} name={category.slug}
            onChange={() => updateCheck(category.slug)}
            ></input>
            <label htmlFor={category.slug} className="m-2">{category.name}</label>
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