import React, { useState } from "react";
import "components/DayListItem.scss";
import classNames from "classnames";

export default function DayListItem(props) {

  console.log("spotslog", props.spots);
  // const [spotsRemainingMessage, setSpotsRemainingMessage] = useState(`${props.spots} spots remaining`)

  const formatSpots = function (spots) {
    let spotsRemainingMessage = `${spots} spots remaining`
    
    if (spots === 0) {
      spotsRemainingMessage = "no spots remaining";
    } else if (spots === 1) {
      spotsRemainingMessage = "1 spot remaining";
    } 
    return spotsRemainingMessage;
  }

  const dayClass = classNames("day-list__item", {
    "day-list__item--selected": props.selected,
    "day-list__item--full": (props.spots === 0)
  });

  return (
    <li 
    onClick={() => props.setDay(props.name)} 
    className={dayClass}>
      <h2 className="text--regular">{props.name}</h2>
      <h3 className="text--light">{formatSpots(props.spots)}</h3>
    </li>
  );
}