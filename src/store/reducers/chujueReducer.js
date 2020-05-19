const chujueReducer =  (state={chujueData:[]},action) =>{
    switch (action.type){
      case 'LOAD_Chujue':
         return{
           ...state, chujueData:action.payload
         }
      default:
         return state
    }
   
}
export default chujueReducer;