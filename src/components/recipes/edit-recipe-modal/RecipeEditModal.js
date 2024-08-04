import { Modal, ModalHeader, ModalBody, Label, Input } from "reactstrap"
import { useState, useEffect } from "react";
import { put } from "../../../utils/fetch";
import Loading from "../../Loading";

export default function RecipeEditModal({ isOpen, setIsOpen, recipe }) {
    const id = recipe._id;
    const [title, setTitle] = useState(recipe.title);
    const [source, setSource] = useState(recipe.source);
    const [category, setCategory] = useState(recipe.category);
    const [equipment, setEquipment] = useState(recipe.equipment);
    const [ingredientGroups, setIngredientGroups] = useState(recipe.ingredients);
    const [directions, setDirections] = useState(recipe.directions);
    const categories = ["Appetizers", "Breakfast", "Breads", "Cakes", "Candy", "Casseroles", "Canning", "Cookies", "Desserts", "Drinks", "Fish", "Frosting", "Ice Cream", "Meat", "Pasta", "Pie", "Poultry", "Pudding", "Salads", "Soups", "Vegetables"]; 

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);

    const handleSave = async () => {
        setIsLoading(true);
        const recipe = {
            title: title,
            source: source,
            category: category,
            equipment: equipment,
            ingredients: ingredientGroups,
            directions: directions
        }
        try {
            const response = await put(`recipes/${id}`, recipe);
            setIsLoading(false);
            setSuccess(true);
        } catch (err) {
            setError(err);
            setIsLoading(false);
        }
    }

    useEffect(() => {
        if (success) {
          const timer = setTimeout(() => {
            setIsOpen(false);
            setSuccess(false);
          }, 1200)
  
          return () => { clearTimeout(timer) }
        }
  
      }, [success])

    return (
        <Modal isOpen={isOpen} toggle={() => setIsOpen(!isOpen)} className='edit-recipe'>
            <ModalHeader>Edit Recipe</ModalHeader>
            <ModalBody>
                <Label for='title'>Title</Label>
                <Input id='title' value={title} onChange={(e) => setTitle(e.target.value)} />

                <Label for='source'>Source</Label>
                <Input id='source' value={source} onChange={(e) => setSource(e.target.value)} />

                <Label for='category'>Category</Label>
                <Input id='category' type='select' value={category} onChange={(e) => setCategory(e.target.value)}>
                {
                    categories.map((cat, idx) => (
                        <option key={idx} value={cat}>{cat}</option>
                    ))
                }
                </Input>

                <p className='group-title'>Equipment</p>
                <div className='group'>
                    {
                        equipment.map((item, idx) => (
                            <div className='d-flex align-items-center'>
                                <Input 
                                    key={idx} 
                                    value={equipment[idx]}
                                    onChange={(e) => {
                                        const copy = [...equipment];
                                        copy[idx] = e.target.value;
                                        setEquipment(copy);
                                    }} 
                                />
                                <button
                                    className='grey-btn mb-3'
                                    onClick={() => {
                                        const copy = [...equipment];
                                        copy.splice(idx, 1);
                                        setEquipment(copy);
                                    }}
                                >
                                    -
                                </button>
                            </div>
                        ))
                    }
                    <button className='blue-btn d-block mb-2' onClick={() => setEquipment([...equipment, ''])}>
                        + equipment
                    </button>
                </div>

                <p className='group-title'>Ingredients</p>
                {
                    ingredientGroups.map((group, idx) => (
                        <div className='group' key={idx}>
                            <div className='d-flex align-items-center py-2'>
                                <p className='mb-0'>{`Group ${idx + 1}`}</p>
                                <button 
                                    className='grey-btn ms-auto'
                                    onClick={() => {
                                        const copy = [...ingredientGroups];
                                        copy.splice(idx, 1);
                                        setIngredientGroups(copy);
                                    }}
                                >
                                    Delete Group
                                </button>
                            </div>
                            <hr />
                            <Label>{`Title`}</Label>
                            <Input
                                value={ingredientGroups[idx].title}
                                onChange={(e) => {
                                    const copy = [...ingredientGroups];
                                    copy[idx].title = e.target.value;
                                    setIngredientGroups(copy);
                                }}
                            />
                            <Label>{`Ingredients`}</Label>
                            {
                                group.ingredients.map((ingredient, ingredientIdx) => (
                                    <div key={idx + ingredientIdx} className='d-flex align-items-center'>
                                        <Input 
                                            key={idx} 
                                            value={ingredientGroups[idx].ingredients[ingredientIdx]}
                                            onChange={(e) => {
                                                const copy = [...ingredientGroups];
                                                copy[idx].ingredients[ingredientIdx] = e.target.value;
                                                setIngredientGroups(copy);
                                            }} 
                                        />
                                        <button
                                            className='grey-btn mb-3'
                                            onClick={() => {
                                                const copy = [...ingredientGroups];
                                                copy[idx].ingredients.splice(ingredientIdx, 1);
                                                setIngredientGroups(copy);
                                            }}
                                        >
                                            -
                                        </button>
                                    </div>
                                ))
                            }
                            <button 
                                className='blue-btn mb-2'
                                onClick={() => {
                                    const copy = [...ingredientGroups];
                                    copy[idx].ingredients.push('');
                                    setIngredientGroups(copy);
                                }}
                            >
                                + ingredient
                            </button>
                        </div>
                    ))
                }
                <div className='d-flex flex-column'>
                    <button 
                        className='blue-btn my-4'
                        onClick={() => {
                            const copy = [...ingredientGroups];
                            copy.push({ title: '', ingredients: [''] })
                            setIngredientGroups(copy);
                        }}
                    >
                        + Ingredient Group
                    </button>
                </div>

                <p className='group-title'>Directions</p>
                <div className='group'>
                    {
                        directions.map((item, idx) => (
                            <div className='d-flex align-items-center'>
                                <Input 
                                    key={idx + 100} 
                                    value={item}
                                    onChange={(e) => {
                                        const copy = [...directions];
                                        copy[idx] = e.target.value;
                                        setDirections(copy);
                                    }} 
                                />
                                <button
                                    className='blue-btn mb-3'
                                    onClick={() => {
                                        const copy = [...directions];
                                        copy.splice(idx, 1);
                                        setDirections(copy);
                                    }}
                                >
                                    -
                                </button>
                            </div>
                        ))
                    }
                    <button 
                        className='blue-btn'
                        onClick={() => {
                            const copy = [...directions];
                            copy.push('');
                            setDirections(copy);
                        }}
                    >
                        + Direction
                    </button>
                </div>
                {
                    isLoading
                    ? (<Loading />)
                    : success
                    ? (<div className='success'>Success!</div>)
                    : (
                        <div className='d-flex mt-4 justify-content-end'>
                            <button className='pink-btn' onClick={handleSave}>Save</button>
                            <button className='grey-btn' onClick={() => setIsOpen(false)}>Cancel</button>
                        </div>
                    )
                }

            </ModalBody>
        </Modal>
    )
}
