import React from "react";
import '../App.css';
import { useNavigate } from "react-router-dom";


const Notfound = ()=>{

const navigate = useNavigate()

const homebtnClick = ()=>{
    navigate('/');
}
    return(
        <>
         <div className="notfoundContainer">
              <div className="notfound">404</div>
              <div className="notfound">Page Not Found !</div>
              <button className="homeBtn" onClick={homebtnClick}>◀ Back To Home</button>
         </div>        
        </>
    )
}

export default Notfound;