import React from "react"
import "./InfoBar.css"

import onlineIcon from "../../icons/onlineIcon.png"
import closeIcon from "../../icons/closeIcon.png"

const InfoBar = ({room}) => {
    return (
        <div className="infoBar">
            <div className="leftInnerContainer">
                <img className="onlineIcon" src={onlineIcon} alt="Online" />
                <h3>{room}</h3>
            </div>
            <div className="rightInnerContainer">
                <a href="/"><img src={closeIcon} alt="Close" /></a>
            </div>
        </div>
    )
}

export default InfoBar