import { 
  createBrowserRouter, 
  redirect,
  RouterProvider
} from 'react-router-dom';
import { get, post } from './utils/fetch';
import LandingPage from './pages/LandingPage';
import RecipePage from './pages/RecipePage';
import LoginPage from './pages/LoginPage';
import FavoritesPage from './pages/FavoritesPage';
import './App.css';

const router = createBrowserRouter([
  {
    element: <LandingPage />,
    path: '/',
    loader: async () => {
      const verifyUser = await post('users/verify');
      if (verifyUser.success) { return redirect('/recipes') }
      return null;
    }
  },
  {
    element: <LoginPage />,
    path: '/login',
    loader: async () => {
      const question_answered = localStorage.getItem('question-answered');
      if (!question_answered) { return redirect('/') }
      const verifyUser = await post('users/verify');
      if (verifyUser.success) { return redirect('/recipes') }
      return null;
    }
  },
  {
    element: <RecipePage />,
    path: '/recipes',
    loader: async () => {
      const question_answered = localStorage.getItem('question-answered');
      if (!question_answered) { return redirect('/') }
      const verifyUser = await post('users/verify');
      if (!verifyUser.success) { return redirect('/login') }
      return null;
    }
  },
  {
    element: <FavoritesPage />,
    path: '/',
    loader: async () => {
      const question_answered = localStorage.getItem('question-answered');
      if (!question_answered) { return redirect('/') }
      const verifyUser = await post('users/verify');
      if (!verifyUser.success) { return redirect('/login') }
      return null;
    }
  }
]);

function App() {
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
