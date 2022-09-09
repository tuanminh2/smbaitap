import axios from 'axios';
import React, { useState, useEffect } from 'react';

function TaskInp(props) {
  const [inpTaskName, setInpTaskName] = useState('');

  const hdlInpTaskNameChange = (event) => {
    event.preventDefault();
    setInpTaskName(event.target.value);
  };

  const hdlAddTask = () => {
    let { hdlAddTask } = props;
    hdlAddTask('adsbfafsda');
  };
  return (
    <>
      <div className="task-inp ">
        <div className="task-form form-group">
          <input
            className="fomr-control"
            type="text"
            name=""
            onChange={(event) => hdlInpTaskNameChange(event)}
            value={inpTaskName}
          />

          <button onClick={hdlAddTask}>Add</button>
        </div>
      </div>
    </>
  );
}
export default TaskInp;
