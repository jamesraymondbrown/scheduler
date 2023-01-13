import React, { useState } from 'react'
import Show from "./Show";
import Empty from "./Empty";
import Header from "./Header"
import Confirm from "./Confirm";
import "./styles.scss";
import useVisualMode from 'hooks/useVisualMode';
import Form from './Form';

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
//const interviewers = [];

export default function Appointment(props) {

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  return (
    <article className="appointment">
      <Header time={props.time} />
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
        />
      )}
      {mode === CREATE && (
        <Form
          interviewers={props.interviewers}
          onSave={props.onSave}
          onCancel={back}
        />
      )}
    </article>

  );
}