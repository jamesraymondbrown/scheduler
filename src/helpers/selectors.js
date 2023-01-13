export function getAppointmentsForDay(state, day) {
  let appointments = [];
  const results = [];

  if (state.days === undefined) {
    return results;
  }

  for (let data of state.days) {
    if (data.name === day) {
      appointments = data.appointments;
    }
  }

  for (let appointment of appointments) {
    results.push(state.appointments[appointment])
  }

  return results;
};

export function getInterview(state, interview) {
  const results = {};

  if (interview === null) {
    return null;
  };

  results.student = interview.student
  results.interviewer = {
    id: interview.interviewer,
    name: state.interviewers[interview.interviewer].name,
    avatar: state.interviewers[interview.interviewer].avatar
  };

  return results;
};
