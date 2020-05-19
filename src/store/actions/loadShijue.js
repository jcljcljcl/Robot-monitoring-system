import {getShijueData} from '../../network/shijue_data'


export const loadShijueAction = async (dispatch) =>{
  const res = await getShijueData()
  dispatch({
    type:'LOAD_Shijue',
    payload:res
  })
}


