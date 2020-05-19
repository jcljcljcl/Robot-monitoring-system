import { createStore ,applyMiddleware ,compose } from 'redux'
import thunkMiddleware from 'redux-thunk'
import couterReducer from './reducers/index'


//扩展可视化插件
const store = createStore(
  couterReducer,
  compose(
      applyMiddleware(...[thunkMiddleware]), //配置网络请求中间件
      window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )

)

export default store;
