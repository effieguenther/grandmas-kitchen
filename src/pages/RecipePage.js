import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { post } from '../utils/fetch';
import RecipeList from '../components/RecipeList';
import Header from '../components/Header';

export default function RecipePage() {

  const [currentUser, setCurrentUser] = useState({});
  const { isLoading, isError, data, error } = useQuery('currentUser', () => post('users'));

  useEffect(() => { 
    setCurrentUser(data?.user || {});
  }, [data])

  return (
    <>
        <Header />
        <RecipeList currentUser={currentUser} />
    </>
  )
}
