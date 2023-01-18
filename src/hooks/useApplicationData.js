import { useState, useEffect } from "react";
import axios from "axios";

export default function useApplicationData() {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {},
  });

  // our GET calls to load api data
  useEffect(() => {
    Promise.all([
      axios.get("/api/days"),
      axios.get("/api/appointments"),
      axios.get("/api/interviewers"),
    ]).then((all) => {
      setState((prev) => ({
        ...prev,
        days: all[0].data,
        appointments: all[1].data,
        interviewers: all[2].data,
      }));
    });
  }, []);

  // This updates the number of appointments remaining, show on the sidebar
  function updatedDays(appointments) {
    const day = state.day;
    let dayInteger = 0;

    // Getting the number value of each day, using the day's name
    if (day === "Monday") {
      dayInteger = 0;
    } else if (day === "Tuesday") {
      dayInteger = 1;
    } else if (day === "Wednesday") {
      dayInteger = 2;
    } else if (day === "Thursday") {
      dayInteger = 3;
    } else if (day === "Friday") {
      dayInteger = 4;
    }

    // Go through each appointment for that day and count how many have interview values of null
    let spots = 0;
    const todaysAppointmentIds = state.days[dayInteger].appointments;

    for (const appointment of todaysAppointmentIds) {
      if (appointments[appointment].interview === null) {
        spots = spots + 1;
      }
    }

    const newDays = [...state.days];
    newDays[dayInteger] = { ...state.days[dayInteger], spots };

    return newDays;
  }

  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview },
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };

    return axios.put(`/api/appointments/${id}`, { interview }).then((res) => {
      setState({
        ...state,
        appointments,
        days: updatedDays(appointments),
      });
    });
  }

  function cancelInterview(id) {
    const appointment = {
      ...state.appointments[id],
      interview: null,
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };

    return axios.delete(`/api/appointments/${id}`).then((res) => {
      setState({
        ...state,
        appointments,
        days: updatedDays(appointments),
      });
    });
  }

  const setDay = (day) => setState({ ...state, day });

  return { state, setDay, bookInterview, cancelInterview };
}
