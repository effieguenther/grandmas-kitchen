import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { post } from '../utils/fetch';
import RecipeList from '../components/RecipeList';
import Header from '../components/Header';
import Loading from '../components/Loading';
import '../css/recipe-page.css';

export default function RecipePage() {

  const [currentUser, setCurrentUser] = useState(null);
  const { isLoading, isError, data, error } = useQuery('currentUser', () => post('users'));

  useEffect(() => { 
    setCurrentUser(data?.user);
  }, [data])

  return isLoading 
  ? ( <Loading /> )
  : isError
  ? (<p>{error}</p>)
  : (
    <div className='background'>
        <Header currentUser={currentUser} />
        <RecipeList currentUser={currentUser} />
    </div>
  )
}
