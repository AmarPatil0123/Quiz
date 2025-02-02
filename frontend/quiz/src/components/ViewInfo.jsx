import React from 'react'
import parse from "html-react-parser";
import './ViewInfo.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

const ViewInfo = ({ data, toggleInfo, setToggleInfo }) => {
    
    function closeInfo(){
        setToggleInfo(!toggleInfo);
    }

    return (
        <div className='info-container'>
            <FontAwesomeIcon icon={faXmark} style={{ fontSize: "1.5rem", float:"right", cursor : "pointer",marginBottom:"1rem" }}
             onClick={closeInfo}/><br />

            <h4 style={{textAlign:"center",textDecoration:"underline"}}>{typeof data === "object" ? 'Topic Overview' : 'Detailed Solution'}</h4><br /><br />

             
            {
                typeof data === "string" ? <div>{parse(data)}</div> :
                data.map((section, index) => {
                    return (
                    
                    <div key={index} >{parse(section)}</div>
                    )
                })
        }
        </div>
    )
}

export default ViewInfo