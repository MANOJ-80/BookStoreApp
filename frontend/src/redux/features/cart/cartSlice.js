import { createSlice } from "@reduxjs/toolkit";
//import Swal  from "sweetalert2";

const initialState = {
    cartItems: []
}

const cartSlice = createSlice({
    name: 'cart',
    initialState: initialState,
    reducers:{
        addToCart: (state, action) => {
            const existingItem = state.cartItems.find(item => item._id === action.payload._id);
            if(!existingItem){
                state.cartItems.push(action.payload)
                alert('Item Added successfully')
            } else{
                alert('Item already in cart')
            }
        }
    }
})

// export actions

export const  {addToCart} = cartSlice.actions;
export default cartSlice.reducer;
