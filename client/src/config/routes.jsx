import * as PATHS from '../utils/paths'
import HomePage from '../pages/HomePage'
import DishList from '../pages/DishList'
import DishDetails from '../pages/DishDetails'
import DishEdit from '../pages/DishEdit'
import SignUp from '../pages/SignUp'
import Login from '../pages/Login'

const routes = (props) => {
  return [
    {
      path: PATHS.HOMEPAGE,
      element: <HomePage {...props} />,
    },
    {
      path: PATHS.DISHLIST,
      element: <DishList {...props} />,
    },
    {
      path: PATHS.DISHDETAILS,
      element: <DishDetails {...props} />,
    },
    {
      path: PATHS.DISHEDIT,
      element: <DishEdit {...props} />,
    },
    {
      path: PATHS.SIGNUP,
      element: <SignUp {...props} />,
    },
    {
      path: PATHS.LOGIN,
      element: <Login {...props} />,
    },
  ]
}

export default routes
