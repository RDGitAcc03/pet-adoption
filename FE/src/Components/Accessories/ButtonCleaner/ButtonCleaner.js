import React from 'react';
import { AiOutlineClear } from 'react-icons/ai';


function ButtonCleaner(cf) {
    console.log("cf", cf);
    return <AiOutlineClear onClick={()=> cf()} style={{cursor: "pointer",position: "absolute",top: "4%",right: "5%",fontSize: "1.4rem"}} />
}

export default ButtonCleaner