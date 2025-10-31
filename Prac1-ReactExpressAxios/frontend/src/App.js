import React, { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";
function App() {
const [products,setProducts]=useState([]); const [loading,setLoading]=useState(true); const [error,setError]=useState("");
useEffect(()= axios.get("http://localhost:5000/products").then(res=;setLoading(false);}).catch(err=;setLoading(false);});},[]);
}
export default App;
