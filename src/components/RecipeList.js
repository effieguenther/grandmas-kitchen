import { useEffect, useState } from 'react';
import { Container, Row, Col, Input, Button } from 'reactstrap';
import { useTransition, animated } from "@react-spring/web";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faArrowRight, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import Recipe from './Recipe';
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

  //searchbar state
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState(null);
  const categories = ["Appetizers", "Breakfast", "Breads", "Cakes", "Candy", "Casseroles", "Canning", "Cookies", "Desserts", "Drinks", "Fish", "Frosting", "Ice Cream", "Meat", "Pasta", "Pie", "Poultry", "Pudding", "Salads", "Soups", "Vegetables"]; 

  const fetchRecipes = async () => {
    const response = await fetch('https://us-central1-grandma-8ed4c.cloudfunctions.net/api/recipes');
    if (!response.ok) { throw new Error(`HTTP error! Status: ${response.status}`) }
    const recipe_data = await response.json();
    setRecipes(recipe_data.recipes);
  }

  //fetch recipes when page loads
  useEffect(() => {
    fetchRecipes();
  }, [])

  //whenever recipes array changes, set the active recipe to first recipe
  useEffect(() => {
    setActiveRecipes(recipes[0]);
    setIsLoading(false);
  }, [recipes])

  const search = () => {
    const search_criteria = {
        title: title,
        category: category
    }
    console.log('search criteria', search_criteria)
}

const cardAnimation = useTransition(activeRecipes, {
  from: { opacity: 0, transform: "scaleY(0) translateZ(10px)" },
  enter: { opacity: 1, transform: "scaleY(1) translateZ(0px)" },
  leave: { opacity: 0, transform: "scaleY(0) translateZ(10px)" },
  exitBeforeEnter: true,
  config: { duration: 200 }
});



  const handleNext = () => {
    setActiveIndex(prevIndex => {
      if (prevIndex === recipes.length) { return prevIndex }
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

  const SearchBar = () => {
    return (
      <div className='mt-4 mb-4'>
            <Row className='d-flex align-items-end'>
                <Col>
                    <Input 
                        placeholder='title'
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </Col>
                <Col>
                    <Input 
                        type='select' 
                        value={category} 
                        onChange={(e) => setCategory(e.target.value)}
                    >
                        <option value="" disabled>Category</option>
                        {
                            categories.map((cat, idx) => (
                                <option key={idx} value={cat}>{cat}</option>
                            ))
                        }
                    </Input>
                </Col>
                <Col className='search-btns'>
                    <Button onClick={search} className='me-1'>
                        <FontAwesomeIcon icon={faSearch} />
                    </Button>
                    <Button>View All</Button>
                </Col>
            </Row>
        </div>
    )
  }

  return isLoading ? (<p>Loading...</p>) : (
    <Container className='mt-4'>
      <SearchBar />
        <div className='next-prev-btns'>
          <Button onClick={handlePrev}>
            <FontAwesomeIcon icon={faArrowLeft} />
          </Button>
          <Button onClick={handleNext}>
            <FontAwesomeIcon icon={faArrowRight} />
          </Button>
        </div>
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
