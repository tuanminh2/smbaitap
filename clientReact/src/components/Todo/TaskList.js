import axios from 'axios';
import React, { useState, useEffect } from 'react';
import './TaskList.scss';
import Drawler from '../Drawler/Drawler';
import TaskInp from './TaskInp';
function ListTask() {
  const [taskList, setTaskList] = useState([]);

  const hdlAddTask = (taskname) => {
    // const newTask = {
    //   taskName: inpTaskName,
    // };
    console.log(taskname);
    // let taskListCp = [...taskList];
    // taskListCp.push(newTask);
    // setTaskList(taskListCp);
  };

  const hdlDeleteTask = (todo) => {
    // let currentTodos = this.state.todos;
    // currentTodos = currentTodos.filter((item) => item.id !== todo.id);
    // this.setState({
    //   todos: currentTodos,
    // });
    // toast.success("delete success");
  };

  return (
    <>
      <div className="wrapper">
        <Drawler></Drawler>
        <div className="task-main">
          <TaskInp hdlAddTask={hdlAddTask} />
          <div className="task-container">
            {taskList &&
              taskList.length > 0 &&
              taskList.map((v, i) => {
                return <>v</>;
              })}
          </div>
        </div>
      </div>
    </>
  );
}
export default ListTask;
