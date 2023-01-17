import React from 'react'
import Show from "./Show";
import Empty from "./Empty";
import Header from "./Header"
import Status from "./Status"
import "./styles.scss";
import useVisualMode from 'hooks/useVisualMode';
import Form from './Form';
import Confirm from './Confirm';

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const DELETING = "DELETING";
const CONFIRM = "CONFIRM";
const EDIT = "EDIT";

export default function Appointment(props) {

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  function del(id) {

    transition(CONFIRM)

    // props.cancelInterview(id)
    // .then(() => {
    //   transition(DELETING)
    // })
    // .then(() => {
    //   transition(EMPTY);
    // })
  }

  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };

    transition(SAVING);

    props.bookInterview(props.id, interview)
    .then((res) => {
      transition(SHOW)
    })
    .catch((error) => {
      console.log('error', error)
    })
  }

  function onConfirm(id) {


    transition(DELETING)

    props.cancelInterview(id)
    .then(() => {
      transition(EMPTY);
    })
  }

  function onCancel() {
    transition(SHOW);
  }

  return (
    <article className="appointment">
      <Header time={props.time} />
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onDelete={del}
          id={props.id}
        />
      )}
      {mode === CREATE && (
        <Form
          interviewers={props.interviewers}
          onSave={save}
          onCancel={back}
        />
      )}
      {mode === EDIT && (
        <Form 
          interviewers={props.interviewers}
          onSave={save}
          onCancel={back} 
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          id={props.id}
        />
      )}
      {mode === CONFIRM && <Confirm onConfirm={onConfirm} onCancel={onCancel} message="Are you sure you want to delete?" id={props.id} />}
      {mode === SAVING && <Status message={'Saving...'} />}
      {mode === DELETING && <Status message={'Deleting...'} />}
    </article>

  );
}