import React from "react";
import { Provider, useSelector, useDispatch } from "react-redux";
import { store } from "./store";
import { addItem, removeItem } from "./features/cartSlice";
import "./App.css";
const products=[{name:"Laptop",price:1000},{name:"Phone",price:500},{name:"Headphones",price:100}];
export default App;
