const shijueReducer = (state={shijueData:[]},action) =>{
    switch (action.type){
      case 'LOAD_Shijue':
         return{
           ...state, shijueData:action.payload
         }
      default:
         return state
    }
  }
export default shijueReducer;
  