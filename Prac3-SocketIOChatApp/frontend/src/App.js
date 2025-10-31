import React,{useEffect,useState} from "react";
import { io } from "socket.io-client";
import "./App.css";
const socket=io("http://localhost:5000");
