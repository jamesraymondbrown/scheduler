import React, { Fragment } from 'react'
import Show from "./Show";
import Empty from "./Empty";
import Header from "./Header"
import Confirm from "./Confirm";
import "./styles.scss";

export default function Appointment(props) {

  return (
    <article className="appointment">
      <Header time={props.time}/>
      {props.interview ? <Show student={props.interview.student} interviewer={props.interview.interviewer} /> : <Empty />}
    </article>

  );
}