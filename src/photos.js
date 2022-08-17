import React from "react";

const Pg = ({id, server,secret, title}) => {
    return(
        <div className="wrapper">
            <div className="pg">
                <img className="image" src={`https://live.staticflickr.com/${server}/${id}_${secret}_w.jpg`} alt="picture of {title}"/>
            </div>
        </div>

    )
};
export default Pg;
