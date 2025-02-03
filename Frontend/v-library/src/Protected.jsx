import React, { Component, useEffect } from 'react'
import { Link, Navigate } from 'react-router-dom';
export default function Protected(props) {
    const {Component}=props;  
    let flag;
    useEffect(()=>{
    flag=sessionStorage.getItem("login");
    console.log(flag);
    },[])    
  return (
    <div>
     {!flag ? <Component/>:<Navigate to="/user"/>}
    </div>
  )
}
