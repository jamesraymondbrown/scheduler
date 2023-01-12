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

  console.log(results)
  return results;
}
