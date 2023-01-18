import { useState } from "react";

export default function useVisualMode(initialMode) {
  const [mode, setMode] = useState(initialMode);
  const [history, setHistory] = useState([initialMode]);

  // Function to transition the appointment module (index.js) from show, edit, add, delete, error, empty, etc.
  const transition = function (arg, replace = false) {
    setMode(arg);
    const newHistory = [...history];
    if (replace !== false) {
      newHistory.pop();
      newHistory.push(arg);
    } else {
      newHistory.push(arg);
    }
    setHistory(newHistory);
  };

  // Function to return the appontment module to its previous state, if the user cancels an action
  const back = function () {
    if (history.length < 2) {
      setHistory("Cannot go back further");
      return;
    }
    setMode(history[history.length - 2]);
    const newHistory = [...history];
    newHistory.pop();
    setHistory(newHistory);
  };

  return { mode, transition, back };
}
