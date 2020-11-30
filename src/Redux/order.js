import { createSlice} from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-simple-toast';
export const initialState={
    orders:[],
  

}

const order =createSlice({
    name:"order",
    initialState,
    reducers:{
        userOrder:(state,{payload})=>{
            console.log('....',payload)
            state.orders=payload


        },
        
    }

})


export const {userOrder}=order.actions;
export default order.reducer;
 export const userOrderData=()=>{
  
    
     return async dispatch=>{
        let token=await AsyncStorage.getItem('token');
        token = await token.replace(/"/g,"")
         fetch('https://dtmoderntech.com/api/orders',{
             method:'GET',
             headers: {
                'Accept': 'application/json',
                'Content-Type': 'multipart/form-data',
                'Authorization':`Bearer ${token}`
            
              },
         }).then(res=>res.json()).then(orderData=>dispatch(userOrder(orderData))).catch(e=>Toast.show('Something went wrong',Toast.SHORT))
     }
    


}
