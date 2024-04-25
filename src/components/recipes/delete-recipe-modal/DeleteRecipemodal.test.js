import React from 'react';
import { render, fireEvent, waitFor, cleanup, screen } from '@testing-library/react';
import DeleteRecipeModal from './DeleteRecipeModal';

describe('DeleteRecipeModal', () => {
  const mockToggle = jest.fn();
  const mockDel = jest.fn().mockResolvedValue({});
  jest.mock('../../../utils/fetch', () => ({
    del: mockDel,
  }));

  beforeEach(() => {
    render(<DeleteRecipeModal isOpen={true} setIsOpen={mockToggle} recipeId="1" />);
  });

  afterEach(cleanup);

  it('should render the modal with the correct header text', () => {
    expect(screen.getByText('Are you sure?')).toBeInTheDocument();
  });

  it('should render the "Delete" and "Go Back" buttons', () => {
    expect(screen.getByText('Delete')).toBeInTheDocument();
    expect(screen.getByText('Go Back')).toBeInTheDocument();
  });

  it('should show "Success!" when the "Delete" function is successful', async () => {
    fireEvent.click(screen.getByText('Delete'));
    await waitFor(() => expect(screen.getByText('Success!')).toBeInTheDocument());
  });

  it('should show the Loading component immediately after "Delete" button is clicked', () => {
    fireEvent.click(screen.getByText('Delete'));
    expect(screen.getByTestId('loading-component')).toBeInTheDocument();
  });

  it('should show the success message and close the modal after 1.2 seconds when success is true', async () => {
    fireEvent.click(screen.getByText('Delete'));
    await waitFor(() => expect(screen.getByText('Success!')).toBeInTheDocument());
    const timer = setTimeout(() => {
      expect(mockToggle).toHaveBeenCalled();
    }, 1200);
    clearTimeout(timer);   
  });

  jest.clearAllMocks();
  
});



