import Home from '../components/Home'
import Shijue from '../components/Shijue'
import Chujue from '../components/Chujue'

let routes = [
    {
      path:'/',
      component:Home,
      exact:true,
    },
    {
      path:'/shijue',
      component:Shijue,
    
    },
    {
      path:'/chujue',
      component:Chujue
    }
  ]

  export default routes;