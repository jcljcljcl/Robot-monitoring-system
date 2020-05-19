import { combineReducers } from 'redux'
import chujueReducer from './chujueReducer'
import shijueReducer from './shijueReducer'
//合并reducers下面的文件
//存在多个reducer时候，需要对其合并,安装插件combineReducers 
const couterReducer = combineReducers({
  chujueReducer:chujueReducer,
  shijueReducer:shijueReducer
})

export default couterReducer;
