import { Input, Row, Col } from 'reactstrap';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faHeart } from '@fortawesome/free-solid-svg-icons';
import { useQuery } from 'react-query';
import { post } from '../utils/fetch';

export default function SearchBar({ searchFunction }) {
    const { data } = useQuery('currentUser', () => post('users'));
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

    const SearchBtns = () => {
        return (
            <div className='search-btns'>
                {
                    data.user && (
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
            </div>
        )
    }

    return (
      <Row className='search-bar'>
        <Col xs='12' className='search-input d-block d-md-flex align-items-center'>
            <Input 
                placeholder='title'
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                        handleSearch();
                    }
                }}
            />
            <Input 
                type='select' 
                value={category} 
                onChange={(e) => setCategory(e.target.value)}
                onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                        handleSearch();
                    }
                }}
            >
                <option value="">no category</option>
                {
                    categories.map((cat, idx) => (
                        <option key={idx} value={cat}>{cat}</option>
                    ))
                }
            </Input>
            <div className='d-none d-md-block'>
                <SearchBtns />
            </div>
        </Col>
        <Col className='d-block d-md-none'>
            <SearchBtns />
        </Col>
      </Row>
    )
  }