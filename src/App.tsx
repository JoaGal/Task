import React, { useState } from "react";
import "./App.css";
import ping from "./Images/Ping2.png";
import useLocalStorage from 'use-local-storage';

type FormElement = React.FormEvent<HTMLFormElement>;
interface Task {
  name: string;
  done: boolean;
}

function App() {
  const [newTask, setNewTask] = useState<string>("");
  const [tasks, setTasks] = useLocalStorage<Task[]>("Task", []);

  const handleSubmit = (e: FormElement) => {
    e.preventDefault();
    addTask(newTask);
    setNewTask("");
  };

  const addTask = (name: string) => {
    const newTasks = [...tasks, { name, done: false }];
    setTasks(newTasks);
    
  };

  const doneTask = (i: number): void =>{
    const newTasks: Task[] = [...tasks];
    newTasks[i].done = !newTasks[i].done;
    setTasks(newTasks);
  }

  const removeTask = (i: number): void =>{
    const newTasks: Task[] = [...tasks];
    newTasks.splice(i,1);
    setTasks(newTasks);
  }

  return (
    <div className="container">
      <img src={ping} className="img-task" />
      <div className="container-task">
        <div className="form-task">
          <form onSubmit={handleSubmit}>
            <h1 className="h1-task">Task</h1>
            <hr />
            <hr />
            <input
              type="text"
              onChange={(e) => setNewTask(e.target.value)}
              value={newTask}
              className="input-task"
            />
            <button className="button-task-input">Save</button>
          </form>
          {tasks.map((t: Task, i: number) => {
            return (
              <div className="div-list-task" key={i}>
                <p className="script-task">-</p>
                <h2 className={`h2-task ${t.done && "finish"}`} key={i}>
                  {t.name}
                </h2>
                  <button className="button-task" onClick={()=> doneTask(i)}>
                    {t.done && "✓"}
                  </button>
                  <button className="button-delete-task" onClick={()=>removeTask(i)}>
                    🗑
                  </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default App;
