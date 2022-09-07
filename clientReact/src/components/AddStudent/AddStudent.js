import axios from 'axios';
import React, { useState, useEffect } from 'react';
import './AddStudent.scss';
import Drawler from '../Drawler/Drawler';

import { Navigate } from 'react-router-dom';
function AddStudent() {
  const getToken = () => {
    return localStorage.getItem('jwtToken');
  };

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [gender, setGender] = useState('');
  const [teams, setTeams] = useState('');

  const hdlSearchNameChange = (event) => {
    setName(event.target.value);
  };
  const hdlSearchEmailChange = (event) => {
    setEmail(event.target.value);
  };
  const hdlSearchTeamsChange = (event) => {
    setTeams(event.target.value);
  };
  const hdlSearchGenderChange = (event) => {
    setGender(event.target.value);
  };

  const hdlSubmitForm = (e) => {
    e.preventDefault();
    async function createStudent() {
      let rs = await axios.post(
        'http://localhost:8989/student/add',
        {
          name: name,
          email: email,
          teams: teams,
          gender: gender,
        },
        {
          headers: {
            Authorization: 'Bearer ' + getToken(),
          },
        }
      );
      return rs.data;
    }

    createStudent().then((res) => {
      setName('');
      setEmail('');
      setTeams('');
      setGender('');
      alert("Create new student successfully!")
    });
  };

  const teamlist = ['Team 1', 'Team 2', 'Team 3', 'Team 4', 'Team 5'];

  let token = getToken();

  if (token) {
    return (
      <div className="wrapper">
        <Drawler></Drawler>
        <div id="addStudentWrapper">
          <h1 className="title">Add Student</h1>

          <form className="mainform">
            <div className="form-group  name">
              <p>Student Name</p>
              <input
                type="text"
                value={name}
                onChange={(e) => hdlSearchNameChange(e)}
              />
            </div>
            <div className="form-group mail">
              <p>Email</p>
              <input
                type="text"
                value={email}
                onChange={hdlSearchEmailChange}
              />
            </div>

            <div className="form-group select-inp-container">
              <div className="select-inp pickteam">
                <p>Pick a team</p>
                <select onChange={hdlSearchTeamsChange}>
                  {teamlist &&
                    teamlist.length > 0 &&
                    teamlist.map((item, index) => {
                      return (
                        <option key={item} value={item}>
                          {item}
                        </option>
                      );
                    })}
                </select>
              </div>
              <div className="select-inp gender">
                <p>Choose a gender</p>
                <div>
                  <input
                    type="radio"
                    name="gender"
                    value="F"
                    onClick={hdlSearchGenderChange}
                  ></input>{' '}
                  Female
                </div>
                <div>
                  <input
                    type="radio"
                    name="gender"
                    value="M"
                    onClick={hdlSearchGenderChange}
                  ></input>{' '}
                  Male
                </div>
              </div>
            </div>

            <button onClick={(e) => hdlSubmitForm(e)} className="submit-btn">
              CREATE
            </button>
          </form>
        </div>
      </div>
    );
  } else {
    return <Navigate to="/login" replace />;
  }
}
export default AddStudent;
//same use -, diff use space
