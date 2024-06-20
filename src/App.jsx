import "./App.css";
import React from "react";
function App(tasks) {
  return (
    <>
      <div>
        <h1>Liste des tâches</h1>
        <ul>
          {tasks.map((task) => (
            <li key={task.id}>{task.title}</li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default App;
