import HomePage from '../pages/homePage/homePage';
import FavoritePage from '../pages/favoritePage/favoritePage';
import Navbar from '../navbar/navbar';
import { createBrowserRouter,useLocation } from 'react-router-dom';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Navbar/>,
    children:[
      {
        path: "/",
        element: <HomePage/>,
      },
      {
        path: "about",
        element: <FavoritePage/>
      }
     
    ]
  },
 
]);

export default router