import React from 'react';
import { render, screen, fireEvent, waitFor, cleanup, act } from '@testing-library/react';
import RecipeEditModal from './RecipeEditModal';
import userEvent from '@testing-library/user-event'; // For more realistic user interactions

jest.mock('../../../utils/fetch', () => ({
  put: jest.fn(),
}));


describe('RecipeEditModal Component', () => {
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
  const mockSetIsOpen = jest.fn();

  beforeEach(() => {
    render(
      <RecipeEditModal isOpen={true} setIsOpen={mockSetIsOpen} recipe={mockRecipe}/>
    )
  })
  afterEach(cleanup);

  it('renders the modal with initial recipe data', () => {
    expect(screen.getByLabelText('Title')).toHaveValue(mockRecipe.title);
    // ... similar checks for other fields
  });

  it('updates form fields when the user types', async () => {
    const titleInput = screen.getByLabelText('Title');

    act(() => {
      userEvent.clear(titleInput);
      userEvent.type(titleInput, 'New Recipe Name');
    }); 
    expect(titleInput).toHaveValue('New Recipe Name');
  });

  // ... similar checks for updating equipment, ingredients, directions

  it('handles successful form submission', async () => {
    const putMock = require('../../../utils/fetch').put; // Get the mocked 'put'
    putMock.mockResolvedValueOnce({}); // Mocked successful API response

    fireEvent.click(screen.getByText('Save'));
    expect(putMock).toHaveBeenCalled();

    await waitFor(() => {
      expect(screen.getByText('Success!')).toBeInTheDocument();
    });
  });
});

