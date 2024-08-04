import React from 'react';
import { render, cleanup, fireEvent, screen } from '@testing-library/react';
import Recipe from './Recipe'; // Import the correct path to your Recipe component
import { QueryClient, QueryClientProvider } from 'react-query';

jest.mock('../../../utils/fetch', () => ({
  // Mock the fetch functions used in the Recipe component
  post: jest.fn(),
  put: jest.fn(),
}));
jest.mock('react-query', () => ({
  ...jest.requireActual('react-query'),
  useQuery: () => ({ data: { user: { _id: "1", favorites: [] } } })
}));
const queryClient = new QueryClient();


describe('Recipe', () => {
  const mockRecipe = {
    // Provide a mock recipe data for testing
    title: 'Test Recipe',
    ingredients: [
      {
        title: 'test title',
        ingredients: []
      }
    ],
    source: 'Test Source',
    category: 'Test Category',
    equipment: [],
    directions: [],
    _id: 'test-id',
  };

  beforeEach(() => {
    render(
      <QueryClientProvider client={queryClient}>
        <Recipe recipe={mockRecipe} />
      </QueryClientProvider>
    )
  })
  afterEach(cleanup);

  it('renders with correct title', () => {
    expect(screen.getByText(mockRecipe.title.toUpperCase())).toBeInTheDocument();
  });

  // it('sets favorite correctly when addToFavorites is called', () => {
  //   const addToFavoritesMock = jest.fn();
  //   const favoriteBtn = screen.getByText('favorite_border'); 
    
  //   expect(favoriteBtn).toBeInTheDocument();
  //   // Simulate a click on the favorite button and trigger the useEffect
  //   fireEvent.click(favoriteBtn);
  //   expect(addToFavoritesMock).toHaveBeenCalledTimes(1);
  //   // Assert that the favorite state has been changed to true
  //   expect(screen.getByText('favorite')).toBeInTheDocument();
  // });

  // it('displays loading spinner while favorite is loading', () => {
  //   queryClient.isLoading = true;  // Mock loading state for useQuery
  //   expect(screen.getByText('favorite_border')).toBeInTheDocument();
  //   expect(screen.getByText('refresh')).toBeInTheDocument(); // Assert loading spinner is present
  // });

  // it('calls the post function with correct arguments when addToFavorites is called', () => {
  //   fireEvent.click(screen.getByText('favorite_border')); 
  //   expect(post).toHaveBeenCalledWith('users/updateFavorites', { favorite: mockRecipe._id });
  // });

  // it('renders edit and delete modal when user is admin', () => {
  //   expect(screen.getByText('Edit')).toBeInTheDocument(); // Assert edit button is present
  //   expect(screen.getByText('Delete')).toBeInTheDocument(); // Assert delete button is present
  // });  
});  