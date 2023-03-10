import React from "react";
import "./styles.scss";
import useVisualMode from "hooks/useVisualMode";

import Show from "./Show";
import Empty from "./Empty";
import Header from "./Header";
import Status from "./Status";
import Form from "./Form";
import Confirm from "./Confirm";
import Error from "./Error";

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const DELETING = "DELETING";
const CONFIRM = "CONFIRM";
const EDIT = "EDIT";
const ERROR_SAVE = "ERROR_SAVE";
const ERROR_DELETE = "ERROR_DELETE";

export default function Appointment(props) {
  // Functions that change state for this module are contained in useVisualMode.js
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  function del(id) {
    transition(CONFIRM);
  }

  function edit() {
    transition(EDIT);
  }

  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer,
    };

    transition(SAVING);

    props
      .bookInterview(props.id, interview)
      .then(() => transition(SHOW))
      .catch((error) => {
        console.log("error", error);
        transition(ERROR_SAVE, true);
      });
  }

  function onConfirm(id) {
    transition(DELETING, true);

    props
      .cancelInterview(id)
      .then(() => {
        transition(EMPTY);
      })
      .catch((error) => {
        console.log("error", error);
        transition(ERROR_DELETE, true);
      });
  }

  function onCancel() {
    transition(SHOW);
  }

  return (
    <article className="appointment" data-testid="appointment">
      <Header time={props.time} />
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onDelete={del}
          onEdit={edit}
          id={props.id}
        />
      )}
      {mode === CREATE && (
        <Form interviewers={props.interviewers} onSave={save} onCancel={back} />
      )}
      {mode === EDIT && (
        <Form
          interviewers={props.interviewers}
          onSave={save}
          onCancel={back}
          student={props.interview.student}
          interviewer={props.interview.interviewer.id}
          id={props.id}
        />
      )}
      {mode === CONFIRM && (
        <Confirm
          onConfirm={onConfirm}
          onCancel={onCancel}
          message="Are you sure you want to delete?"
          id={props.id}
        />
      )}
      {mode === SAVING && <Status message={"Saving..."} />}
      {mode === DELETING && <Status message={"Deleting..."} />}
      {mode === ERROR_SAVE && (
        <Error message={"Error saving appointment"} onClose={back} />
      )}
      {mode === ERROR_DELETE && (
        <Error message={"Error deleting appointment"} onClose={back} />
      )}
    </article>
  );
}
