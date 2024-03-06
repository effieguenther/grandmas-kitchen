import { 
  createBrowserRouter, 
  defer, 
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
    path: '/',
    errorElement: <Error />
  },
  {
    element: <LoginPage />,
    path: '/login',
    loader: async () => {
      const verifyUser = await post('users/verify');
      if (verifyUser.success) { return redirect('/recipes') }
      return defer({ verifyUser });
    },
    errorElement: <Error />
  },
  {
    element: <RecipePage />,
    path: '/recipes',
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
