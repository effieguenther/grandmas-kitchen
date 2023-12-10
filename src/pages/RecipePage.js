import { useEffect, useState } from 'react';
import { post } from '../utils/fetch';
import RecipeList from '../components/RecipeList';
import Header from '../components/Header';

export default function RecipePage() {

  const [currentUser, setCurrentUser] = useState(null);

  const getUser = async () => {
    let user_response = await post('users');
    let user = user_response.user || {};
    setCurrentUser(user);
  }

  useEffect(() => { getUser() }, [])

  return (
    <>
        <Header />
        <RecipeList currentUser={currentUser} />
    </>
  )
}
