import React from "react";
import InterviewerListItem from "./InterviewerListItem";
import "components/InterviewerList.scss";

export default function InterviewerList(props) {

  const formattedInterviewers = props.interviewers.map((interviewer) => {

    return (
      <InterviewerListItem 
        key={interviewer.id} 
        name={interviewer.name} 
        avatar={interviewer.avatar} 
        selected={interviewer.id === props.value} 
        setInterviewer={(event) => props.onChange(interviewer.id)} />
    );
  });

  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">{formattedInterviewers}</ul>
    </section>
  );
}


//interviewerListItem previously returned with these values:

// selected={interviewer.id === props.interviewer} 
// setInterviewer={(event) => props.setInterviewer(interviewer.id)} /> -- changing it to onChange and value broke it in storybook, but compass told me to do that