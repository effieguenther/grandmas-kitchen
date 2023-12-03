import { Input, Button } from 'reactstrap';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

export default function SearchBar({ searchFunction, viewAllFunction }) {
    const [title, setTitle] = useState("");
    const [category, setCategory] = useState(null);
    const categories = ["Appetizers", "Breakfast", "Breads", "Cakes", "Candy", "Casseroles", "Canning", "Cookies", "Desserts", "Drinks", "Fish", "Frosting", "Ice Cream", "Meat", "Pasta", "Pie", "Poultry", "Pudding", "Salads", "Soups", "Vegetables"]; 

    const handleSearch = () => {
        const search_criteria = {
            title: title || "",
            category: category || ""
        }
        searchFunction(search_criteria);
    }

    return (
      <div className='search-bar'>
              <Input 
                  placeholder='title'
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
              />
              <Input 
                  type='select' 
                  value={category} 
                  onChange={(e) => setCategory(e.target.value)}
              >
                  <option value="">Category</option>
                  {
                      categories.map((cat, idx) => (
                          <option key={idx} value={cat}>{cat}</option>
                      ))
                  }
              </Input>
          <div className='search-btns'>
              <Button onClick={handleSearch} className='me-1'>
                  <FontAwesomeIcon icon={faSearch} />
              </Button>
              <Button onClick={viewAllFunction}>View All</Button>
          </div>
      </div>
    )
  }