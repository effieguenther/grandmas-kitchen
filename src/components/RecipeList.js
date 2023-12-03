import { useEffect, useState } from 'react';
import { Container } from 'reactstrap';
import { useTransition, animated } from "@react-spring/web";
import Recipe from './Recipe';
import SearchBar from './SearchBar';
import '../css/search.css';

export default function RecipeList() {
  //holds all the recipes from the search function
  const [recipes, setRecipes] = useState([]);
  //holds the current recipe in an array
  const [activeRecipes, setActiveRecipes] = useState([]);
  //holds the current recipe's index in recipes array
  const [activeIndex, setActiveIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchRecipes = async () => {
    try {
      const response = await fetch('https://us-central1-grandma-8ed4c.cloudfunctions.net/api/recipes');
      const recipe_data = await response.json();
      setRecipes(recipe_data.recipes);
    } catch (error) {
      setError(`HTTP error! Status: ${error}`)
    }
  }

  //whenever recipes array changes, set the active recipe to first recipe
  useEffect(() => {
    setActiveIndex(0);
    setActiveRecipes(recipes[0]);
    setIsLoading(false);
  }, [recipes])

  const handleNext = () => {
    setActiveIndex(prevIndex => {
      if (prevIndex === recipes.length - 1) { return prevIndex }
      setActiveRecipes(recipes[prevIndex + 1]);
      return prevIndex + 1;
    })
  }

  const handlePrev = () => {
    setActiveIndex(prevIndex => {
      if (prevIndex === 0 ) { return 0 }
      setActiveRecipes(recipes[prevIndex - 1]);
      return prevIndex - 1;
    })
  }

  //navigate through list with arrow keys
  useEffect(() => {
    const handleKeyPress = (e) => {
      switch (e.key) {
        case 'ArrowLeft':
          handlePrev();
          break;
        case 'ArrowRight':
          handleNext();
          break;
        default:
          break;
      }
    };

    document.addEventListener('keydown', handleKeyPress);

    // Cleanup the event listener on component unmount
    return () => {
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, [handleNext, handlePrev]);

  const search = async (search_criteria) => {
    try {
      const response = await fetch(
        'https://us-central1-grandma-8ed4c.cloudfunctions.net/api/recipes/search', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(search_criteria)
      });

      const recipe_data = await response.json();
      setRecipes(recipe_data.recipes);
    } catch (error) {
      setError(`HTTP error! Status: ${error}`)
    }
  }

  //card animation
  const cardAnimation = useTransition(activeRecipes, {
    from: { opacity: 0, transform: "scaleY(0) translateZ(10px)" },
    enter: { opacity: 1, transform: "scaleY(1) translateZ(0px)" },
    leave: { opacity: 0, transform: "scaleY(0) translateZ(10px)" },
    exitBeforeEnter: true,
    config: { duration: 200 }
  });

  return isLoading 
    ? (<p className='text-center mt-4'>Loading...</p>) 
    : error
    ? (<p className='text-center mt-4'>{error}</p>)
    : (<Container className='mt-4'>
        <SearchBar searchFunction={search} viewAllFunction={fetchRecipes}/>
          {
            recipes.length
            ? (<p className='search-results'>{activeIndex + 1} of {recipes.length} (use arrow keys)</p>)
            : (<p className='search-results'>no results</p>)
          }
          {
            activeRecipes && cardAnimation((style, recipe) => (
              <animated.div style={{...style, width: '100%'}}>
                <Recipe recipe={recipe} />
              </animated.div>
            ))
          }
      </Container>
    )
}
