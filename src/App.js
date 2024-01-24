import { 
  createBrowserRouter, 
  redirect,
  RouterProvider
} from 'react-router-dom';
import { post } from './utils/fetch';
import LandingPage from './pages/LandingPage';
import RecipePage from './pages/RecipePage';
import LoginPage from './pages/LoginPage';
import Loading from './components/Loading';
import Error from './components/Error';
import './App.css';
import './css/footer.css';

const router = createBrowserRouter([
  {
    element: <LandingPage />,
    path: '/'
  },
  {
    element: <LoginPage />,
    path: '/login',
    loader: async () => {
      const verifyUser = await post('users/verify');
      if (verifyUser.success) { return redirect('/recipes') }
      return null;
    },
    errorElement: <Error />
  },
  {
    element: <RecipePage />,
    path: '/recipes',
    loader: async () => {
      const question_answered = localStorage.getItem('question-answered');
      if (!question_answered) { return redirect('/') }
      return null;
    },
    errorElement: <Error />
  }
]);

function App() {
  return (
    <div className="App">
      <RouterProvider router={router} fallbackElement={<Loading />} />
    </div>
  );
}

export default App;
