import React, {useState} from "react";

const Pg = ({id, server,secret, title}) => {
    var link = `https://live.staticflickr.com/${server}/${id}_${secret}_w.jpg`;
    var name = "untitled photo";
    if (title){
        name=title;
    }

    return(
        <div className="wrapper">
            <div className="pg">
                <img className="gridImage" src={link} alt={name}/>
                <p className="hoverText">{name}</p>
            </div>
        </div>
    );
};


export default Pg;

