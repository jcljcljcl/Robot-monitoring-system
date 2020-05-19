import {getChujueData} from '../../network/chujue_data'

export const loadChujueAction = async (dispatch) =>{
  const res = await getChujueData()
  dispatch({
    type:'LOAD_Chujue',
    payload:res
  })
}


