import { useEffect, useState } from 'react';
import { Container } from 'reactstrap';
import { useTransition, animated } from "@react-spring/web";
import { post } from '../utils/fetch';
import Recipe from './Recipe';
import SearchBar from './SearchBar';
import Loading from './Loading';
import '../css/search.css';

export default function RecipeList({ currentUser }) {
  //holds all the recipes from the search function
  const [recipes, setRecipes] = useState([]);
  //holds the current recipe in an array
  const [activeRecipes, setActiveRecipes] = useState([]);
  //holds the current recipe's index in recipes array
  const [activeIndex, setActiveIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [startX, setStartX] = useState(null);
  let timerId = undefined;

  //whenever recipes array changes, set the active recipe to first recipe
  useEffect(() => {
    setActiveIndex(0);
    setActiveRecipes(recipes[0]);
    setIsLoading(false);
  }, [recipes]);

  useEffect(() => {
    setActiveRecipes(recipes[activeIndex])
  }, [activeIndex]);

  const handleNav = (direction) => {
    console.log("handle nav");
    if (timerId) { return }

    timerId = setTimeout(() => {
      if (direction === 'next') {
        if (activeIndex === recipes.length - 1) { return }
        setActiveIndex(prevIndex => prevIndex + 1);
      } else if (direction === 'prev') {
        if (activeIndex === 0) { return }
        setActiveIndex(prevIndex => prevIndex - 1);
      }
      timerId = undefined
    }, 180)
    return;
  }

  //navigate through list with arrow keys
  useEffect(() => {
    const handleKeyPress = (e) => {
      switch (e.key) {
        case 'ArrowLeft':
          handleNav('prev');
          break;
        case 'ArrowRight':
          handleNav('next');
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
  }, [handleNav]);

  //navigate through list with swiping
  const handleTouchStart = (e) => {
    setStartX(e.touches[0].clientX);
  };

  const handleTouchMove = (e) => {
    if (!startX) return;

    const currentX = e.touches[0].clientX;
    const deltaX = currentX - startX;

    if (Math.abs(deltaX) > 50) {
      if (deltaX > 0) {
        //swiped right
        handleNav('prev');
      } else {
        //swiped left
        handleNav('next');
      }
      // Reset startX to prevent continuous swipes
      setStartX(null);
    }
  };

  const handleTouchEnd = () => {
    setStartX(null);
  };

  //search with keywords
  const search = async (search_criteria) => {
    setError("");
    setIsLoading(true);
    try {
      const recipe_data = await post('recipes/search', search_criteria);
      setRecipes(recipe_data.recipes);
    } catch (error) {
      setError(`HTTP error! Status: ${error}`)
      setIsLoading(false);
    }
  }

  const cardAnimation = useTransition(activeRecipes, {
    from: { opacity: 0, transform: "scaleX(0) translateZ(10px)" },
    enter: { opacity: 1, transform: "scaleX(1) translateZ(0px)" },
    leave: { opacity: 0, transform: "scaleX(0) translateZ(10px)" },
    exitBeforeEnter: true,
    config: { duration: 200 }
  });

  return (
    <Container className='mt-4'>
      <SearchBar searchFunction={search} currentUser={currentUser}/>
        {
          recipes && recipes?.length !== 0
          ? (<p className='search-results'>{activeIndex + 1} of {recipes.length}</p>)
          : (<p className='search-results'>no results</p>)
        }
        {
          isLoading 
          ? (<Loading />) 
          : error
          ? (<p className='text-center mt-4'>{error}</p>)
          : recipes 
          ? cardAnimation((style, recipe) => (
            <animated.div 
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
              style={{...style, width: '100%'}}
            >
              <Recipe recipe={recipe} currentUser={currentUser} />
            </animated.div>
          ))
          : (<p className='text-center mt-4'>no results</p>)
        }
    </Container>
    )
}
