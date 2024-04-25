import React from 'react';
import { render, screen, fireEvent, cleanup } from '@testing-library/react'; 
import { QueryClient, QueryClientProvider } from 'react-query';
import SearchBar from './SearchBar';

const queryClient = new QueryClient();

//Mocks
jest.mock('react-query', () => ({
  ...jest.requireActual('react-query'),
  useQuery: () => ({ data: { user: true } }) // Mocked user data
}));
const mockSearchFunction = jest.fn(); 

describe('SearchBar component', () => {
  beforeEach(() => {
    render (
      <QueryClientProvider client={queryClient}>
        <SearchBar searchFunction={mockSearchFunction} />
      </QueryClientProvider>
    )
  });
  afterEach(cleanup);

  // Test 1: Rendering
  it('should render the search input fields and buttons', () => {
    expect(screen.getByPlaceholderText('title')).toBeInTheDocument();
    expect(screen.getByRole('combobox')).toBeInTheDocument(); 
    expect(screen.getAllByText('Search')[0]).toBeInTheDocument();
    expect(screen.getAllByText('My Favorites')[0]).toBeInTheDocument(); // Because data.user is mocked
  });

  // Test 2: State Updates
  it('should update state when input fields are changed', () => {
    const titleInput = screen.getByPlaceholderText('title');
    fireEvent.change(titleInput, { target: { value: 'Recipe Name' } });
    expect(titleInput.value).toBe('Recipe Name');

    const categoryInput = screen.getByText('no category');
    fireEvent.change(categoryInput, { target: { value: 'Cookies' } });
    expect(categoryInput.value).toBe('Cookies');
  });

  // Test 3: handleSearch
  it('should call searchFunction with correct data on "Search" click', () => {
    const searchButton = screen.getAllByText('Search')[0];
    fireEvent.click(searchButton);

    expect(mockSearchFunction).toHaveBeenCalledWith({
      title: "",
      category: "",
      favorites: false
    });
  });
  
  // NEW TESTS


  it('should call searchFunction with favorites prop set to true on "My Favorites" click', () => {
    const favButton = screen.getAllByText('My Favorites')[0];
    fireEvent.click(favButton);
  
    expect(mockSearchFunction).toHaveBeenCalledWith({
      title: "",
      category: "",
      favorites: true
    });
  });

  it('should call searchFunction when Enter key is pressed on title input', () => {
    const titleInput = screen.getByPlaceholderText('title');
    fireEvent.change(titleInput, { target: { value: 'Pizza' } }); // Simulate typing
  
    fireEvent.keyDown(titleInput, { key: 'Enter' }); // Simulate Enter press
  
    expect(mockSearchFunction).toHaveBeenCalledWith({
      title: "Pizza",
      category: "",
      favorites: false
    });
  });
  
  it('should call searchFunction when Enter key is pressed on category dropdown', () => {
    const categoryDropdown = screen.getByRole('combobox'); 
    fireEvent.change(categoryDropdown, { target: { value: 'Appetizers' } });
  
    fireEvent.keyDown(categoryDropdown, { key: 'Enter' }); // Simulate Enter press
  
    expect(mockSearchFunction).toHaveBeenCalledWith({
      title: "",
      category: "Appetizers",
      favorites: false
    });
  });

});