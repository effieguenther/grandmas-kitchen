import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { Container } from 'reactstrap';
import { useTransition, animated } from "@react-spring/web";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { post } from '../utils/fetch';
import { slideUp, cardSwipe } from '../utils/animations';
import Recipe from './Recipe';
import SearchBar from './SearchBar';
import Loading from './Loading';
import '../css/search.css';

export default function RecipeList() {
  const { data } = useQuery('currentUser', () => post('users'));
  const [recipes, setRecipes] = useState([]);
  const [activeRecipes, setActiveRecipes] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [startX, setStartX] = useState(null);
  const [tutorial, setTutorial] = useState(true);
  const slideUpAnimation = useTransition(true, slideUp);
  const cardAnimation = useTransition(activeRecipes, cardSwipe);
  let timerId = undefined;

  //whenever recipes array changes, set the active recipe to first recipe
  useEffect(() => {
    setActiveIndex(0);
    setActiveRecipes(recipes[0]);
    setIsLoading(false);
  }, [recipes]);

  //when activeIndex changes, set activeRecipes
  useEffect(() => {
    setActiveRecipes(recipes[activeIndex])
  }, [activeIndex]);

  //prevents rapid fire state updates with throttling
  const handleNav = (direction) => {
    if (timerId) { return }

    timerId = setTimeout(() => {
      if (direction === 'next') {
        if (activeIndex === recipes.length - 1) { 
          timerId = undefined;
          return;
        }
        setActiveIndex(prevIndex => prevIndex + 1);
      } else if (direction === 'prev') {
        if (activeIndex === 0) {
          timerId = undefined;
          return 
        }
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
    setTutorial(false);
    try {
      const recipe_data = await post('recipes/search', search_criteria);
      setRecipes(recipe_data.recipes);
    } catch (error) {
      setError(`HTTP error! Status: ${error}`)
      setIsLoading(false);
    }
  }

  return (
    <>
      <SearchBar searchFunction={search} />
      <Container>
        {
          tutorial
          ? slideUpAnimation((style, item) => 
            item && (
              <animated.div className='tutorial' style={style}>
                <p>Welcome!</p>
                <p>
                  To get started, type a word or select a category above and click "Search." 
                  To go through the recipes, use the arrow keys or swipe left and right. 
                </p>
              </animated.div>
            )
          )
          : recipes?.length !== 0
          ? !isLoading && (
            <div className='search-results'>
              <button 
                className='white-btn arrow-btn left-arrow' 
                onClick={() => handleNav('prev')}
                disabled={activeIndex === 0}
              >
                <FontAwesomeIcon icon={faArrowLeft} />
              </button>
              <p className=''>{activeIndex + 1} of {recipes.length}</p>
              <button 
                className='white-btn arrow-btn right-arrow' 
                onClick={() => handleNav('next')}
                disabled={activeIndex === recipes.length - 1}
              >
                <FontAwesomeIcon icon={faArrowRight} />
              </button>
            </div>
          )
          : !isLoading && (<p className='search-results'>No results! Try a broader search?</p>)
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
              <Recipe recipe={recipe} currentUser={data.user} />
            </animated.div>
          ))
          : (<p className='text-center mt-4'>no results</p>)
        }
      </Container>
    </>
    )
}
