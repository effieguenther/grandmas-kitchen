import { 
  createBrowserRouter, 
  redirect,
  RouterProvider
} from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import RecipePage from './pages/RecipePage';
import FavoritesPage from './pages/FavoritesPage';
import './App.css';

const router = createBrowserRouter([
  {
    element: <LandingPage />,
    path: '/'
  },
  {
    element: <RecipePage />,
    path: '/recipes',
    loader: () => {
      const question_answered = localStorage.getItem('question-answered');
      if (!question_answered) { return redirect('/') }
      return null;
    }
  },
  {
    element: <FavoritesPage />,
    path: '/',
    loader: () => {
      const question_answered = localStorage.getItem('question-answered');
      if (!question_answered) { return redirect('/') }
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
