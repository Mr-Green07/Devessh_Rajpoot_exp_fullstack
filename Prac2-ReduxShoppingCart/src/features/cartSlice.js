import { createSlice } from "@reduxjs/toolkit";
const cartSlice = createSlice({name:"cart",initialState:[],reducers:{addItem:(state,action)= item=state.find(i====action.payload.name);if(item)item.quantity+=1;else state.push({...action.payload,quantity:1});},removeItem:(state,action)===action.payload),updateQuantity:(state,action)= item=state.find(i====action.payload.name);if(item)item.quantity=action.payload.quantity;}}});
export const { addItem, removeItem, updateQuantity } = cartSlice.actions;
export default cartSlice.reducer;
