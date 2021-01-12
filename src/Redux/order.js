import { createSlice} from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-simple-toast';
export const initialState={
    orders:[],
    token:'',
    loading_order_status:false,
  

}

const order =createSlice({
    name:"order",
    initialState,
  
    reducers:{
        userOrderInit:(state)=>{
            state.loading_order_status=true

        },
        userOrderSuccess:(state,{payload})=>{
            console.log('....',payload)
            state.orders=payload
            state.loading_order_status=false


        },
        userOrderFail:(state)=>{
            state.loading_order_status=false
        },
        saveTok:(state,{payload})=>{
            state.token=payload
        }
        
    }

})


export const {userOrderInit,userOrderSuccess,userOrderFail,saveTok}=order.actions;
export default order.reducer;
 export const userOrderData=()=>{
  
    
     return async dispatch=>{
         dispatch(userOrderInit())
        let token=await AsyncStorage.getItem('token');
        token = await token.replace(/"/g,"")
         fetch('https://dtmoderntech.com/api/orders',{
             method:'GET',
             headers: {
                'Accept': 'application/json',
                'Content-Type': 'multipart/form-data',
                'Authorization':`Bearer ${token}`
            
              },
         }).then(res=>res.json()).then(orderData=>dispatch(userOrderSuccess(orderData))).catch(e=>{dispatch(userOrderFail());Toast.show('Something went wrong',Toast.SHORT)})
     }
    


}
export const saveToken=(token)=>{
    return async dispatch=>{
    dispatch(saveTok(token));
    }

}
