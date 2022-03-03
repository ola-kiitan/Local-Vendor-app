import * as PATHS from '../utils/paths'
import HomePage from '../pages/HomePage'
import DishList from '../pages/DishList'

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
  ]
}

export default routes
