import * as PATHS from '../utils/paths'
import HomePage from '../pages/HomePage'
import DishList from '../pages/DishList'
import DishDetails from '../pages/DishDetails'
import DishEdit from '../pages/DishEdit'

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
  ]
}

export default routes
