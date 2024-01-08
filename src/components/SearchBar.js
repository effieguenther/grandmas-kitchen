import { Input, Row, Col } from 'reactstrap';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faHeart } from '@fortawesome/free-solid-svg-icons';

export default function SearchBar({ searchFunction, currentUser }) {
    const [title, setTitle] = useState("");
    const [category, setCategory] = useState("");
    const [favorites, setFavorites] = useState(false);
    const categories = ["Appetizers", "Breakfast", "Breads", "Cakes", "Candy", "Casseroles", "Canning", "Cookies", "Desserts", "Drinks", "Fish", "Frosting", "Ice Cream", "Meat", "Pasta", "Pie", "Poultry", "Pudding", "Salads", "Soups", "Vegetables"]; 

    const handleSearch = () => {
        const search_criteria = {
            title: title || "",
            category: category || "",
            favorites: favorites
        }
        searchFunction(search_criteria);
    }

    return (
      <Row className='search-bar'>
        <Col xs='12' md='4' className='search-input'>
              <Input 
                  placeholder='title'
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
              />
        </Col>
        <Col xs='12' md='4' className='search-input'>
              <Input 
                  type='select' 
                  value={category} 
                  onChange={(e) => setCategory(e.target.value)}
              >
                  <option value="">no category</option>
                  {
                      categories.map((cat, idx) => (
                          <option key={idx} value={cat}>{cat}</option>
                      ))
                  }
              </Input>
        </Col>
        <Col className='search-btns'>
            {
                currentUser && (
                    <label check className='switch'>
                        <input 
                            type="checkbox" 
                            checked={favorites}
                            onChange={() => { 
                                setFavorites(!favorites);
                            }}/>
                        <span className="slider round">
                            <FontAwesomeIcon icon={faHeart} />
                        </span>
                    </label>
                )
            }
            <button onClick={handleSearch} className='me-1 pink-btn'>
                <FontAwesomeIcon icon={faSearch} className='me-2'/>
                Search
            </button>
        </Col>
      </Row>
    )
  }