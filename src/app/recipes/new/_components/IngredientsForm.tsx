'use client'

import { IngredientForm } from "../RecipeForm";
import IngredientFormItem from "./IngredientFormItem";

export default function IngredientsForm({
    ingredients,
    setIngredients
}: {
    ingredients: IngredientForm[];
    setIngredients: React.Dispatch<React.SetStateAction<IngredientForm[]>>;
}) {
    const updateIngredient = (id: number, field: keyof IngredientForm, value: string) => {
        setIngredients(ingredients.map(ingredient => (
            ingredient.id === id ? { ...ingredient, [field]: value } : ingredient
        )));
    }

    const deleteIngredient = (id: number) => {
        setIngredients(ingredients.filter(ingredient => ingredient.id !== id))
    }

    const ingredientItems: React.JSX.Element[] = 
    ingredients.map((ingredient) => (
        <IngredientFormItem
            key={ingredient.id}
            id={ingredient.id}
            updateIngredient={updateIngredient}
            deleteIngredient={deleteIngredient}
        />
    ))

    return(<>
    <h3 className="text-2xl font-bold mb-6 text-center">Ingredients</h3>
    <p className="italic mb-4 text-gray-500">
        Add all the ingredients for the recipe. If you don't want a specific amount, just leave it blank!
        <br/>ex. a pinch of salt
    </p>
    <section className="flex flex-col">
        {ingredientItems}
    </section>
    <button type="button"
        className="rounded bg-green-400 p-1 pl-4 pr-4 m-3 text-xl w-15 place-self-center"
        onClick={() => setIngredients([...ingredients, {id: Date.now(), name: "", amount: "" }])}
    >+</button>
    </>)
}