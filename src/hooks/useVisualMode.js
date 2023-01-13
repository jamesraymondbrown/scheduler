import { useState } from "react";



export default function useVisualMode(initialMode) {
  const [mode, setMode] = useState(initialMode);
  const [history, setHistory] = useState([initialMode]);

  const transition = function(arg, replace = false) {
    setMode(arg)
    const newHistory = [...history];
    if (replace !== false) {
      newHistory.pop();
      newHistory.push(arg)
    } else {
      newHistory.push(arg);
    }
    setHistory(newHistory);
  };

  const back = function() {
    if (history.length < 2) {
      setHistory("Cannot go back further")
      return;
    }
    setMode(history[history.length-2])
    const newHistory = [...history];
    newHistory.pop();
    setHistory(newHistory);

  };


  return { mode, transition, back }
};