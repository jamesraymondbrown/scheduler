import React, { useState } from "react";
import InterviewerList from "components/InterviewerList";
import Button from "components/Button";

export default function Form(props) {

  const [student, setStudent] = useState(props.student || "");
  const [interviewer, setInterviewer] = useState(props.interviewer || null);

  const reset = () => {
    setStudent("");
    setInterviewer(null);
    props.onCancel()
  }

  const cancel = {
    reset
  }

  return (
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form autoComplete="off">
          <input
            className="appointment__create-input text--semi-bold"
            name="name"
            type="text"
            placeholder="Enter Student Name"
            onChange={(event) => setStudent(event.target.value)}
          /*
            This must be a controlled component
            your code goes here
          */
          />
        </form>
        {/* <h1>{student}</h1> */}
        <InterviewerList
          interviewers={props.interviewers}
        /* your code goes here */
        />
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button danger onClick={() => cancel()}>Cancel</Button>
          <Button confirm onClick={props.onSave} /* your code goes here */>Save</Button>
        </section>
      </section>
    </main>
  );
}

// <Button danger onClick={props.onCancel}>Cancel</Button>