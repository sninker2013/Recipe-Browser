'use client'

import { DirectionForm } from "../MainRecipeForm"
import DirectionFormItem from "./DirectionFormItem";

export default function DirectionsForm({
    directions,
    setDirections
}: {
    directions: DirectionForm[];
    setDirections: React.Dispatch<React.SetStateAction<DirectionForm[]>>;
}) {
    const updateDirection = (id: number, instruction: string) => {
        setDirections(directions.map((direction) => 
            direction.id === id ? { ...direction, instruction: instruction } : direction
        ));
    }

    const deleteDirection = (id: number) => {
        setDirections(directions.filter(ingredient => ingredient.id !== id))
    }

    const directionItems: React.JSX.Element[] =
    directions.map((direction, index) => (
        <DirectionFormItem
            ingredientIndex={index}
            key={direction.id}
            id={direction.id}
            updateDirection={updateDirection}
            deleteDirection={deleteDirection}
        />
    ))

    return (<>
        <h3 className="text-2xl font-bold mb-6 text-center">Directions</h3>
        <section className="flex flex-col">
        {directionItems}
        </section>
        <button type="button"
            className="rounded bg-green-400 p-1 pl-4 pr-4 m-3 text-xl w-15 place-self-center"
            onClick={() => setDirections([...directions, {id: Date.now(), instruction: ""}])}
        >+</button>
    </>)
}