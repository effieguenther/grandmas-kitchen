import { useEffect, useState } from 'react';

export default function RecipeList() {
  const [recipes, setRecipes] = useState([]);

  const fetchRecipes = async () => {
    const response = await fetch('https://us-central1-grandma-8ed4c.cloudfunctions.net/api/recipes');
    if (!response.ok) { throw new Error(`HTTP error! Status: ${response.status}`) }
    return response.json();
  }

  useEffect(() => {
    fetchRecipes()
      .then(response => {
        console.log("response", response);
      })
  }, [])

  return (
    <div>RecipeList</div>
  )

}
