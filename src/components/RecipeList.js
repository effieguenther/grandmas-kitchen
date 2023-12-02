import { useEffect, useState } from 'react';
import { Container, Row, Col, Input, Button } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import Recipe from './Recipe';

export default function RecipeList() {
  const [recipes, setRecipes] = useState([]);
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState(null);
  const categories = ["Appetizers", "Breakfast", "Breads", "Cakes", "Candy", "Casseroles", "Canning", "Cookies", "Desserts", "Drinks", "Fish", "Frosting", "Ice Cream", "Meat", "Pasta", "Pie", "Poultry", "Pudding", "Salads", "Soups", "Vegetables"];

  const fetchRecipes = async () => {
    const response = await fetch('https://us-central1-grandma-8ed4c.cloudfunctions.net/api/recipes');
    if (!response.ok) { throw new Error(`HTTP error! Status: ${response.status}`) }
    return response.json();
  }

  const search = () => {
    const search_criteria = {
        title: title,
        category: category
    }
    console.log('search criteria', search_criteria)
}

  useEffect(() => {
    fetchRecipes()
      .then(response => {
        console.log("response", response);
        setRecipes(response.recipes);
      })
  }, [])

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

  return (
    <Container className='mt-4'>
      <SearchBar />
      {
        recipes.map((recipe, idx) => (
          <Recipe recipe={recipe} key={idx} />
        ))
      }
    </Container>
  )
}
