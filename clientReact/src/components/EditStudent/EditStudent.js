import axios from 'axios';
import React, { useState, useEffect } from 'react';
import './EditStudent.scss';
import Drawler from '../Drawler/Drawler';

import { Navigate } from 'react-router-dom';
function EditStudent() {
  const getToken = () => {
    return localStorage.getItem('jwtToken');
  };

  const [studentList, setStudentList] = useState([]);
  useEffect(() => {
    async function getData() {
      let rs = await axios.get('http://localhost:8989/student', {
        headers: {
          Authorization: 'Bearer ' + getToken(),
        },
      });
      return rs.data;
    }
    getData().then((res) => {
      setStudentList(res);
    });
  }, []);

  const hdlUpdateBtn = (event) => {
    event.preventDefault();

    let nameinp = document.getElementById('nameInp').value;
    let teamsinp = document.getElementById('teamInp').value;
    const data = { name: nameinp, teams: teamsinp };
 
    async function postData() {
      let rs = await axios.put('http://localhost:8989/student/update', data, {
        headers: {
          Authorization: 'Bearer ' + getToken(),
        },
      });
      return rs.data;
    }
    postData().then((res) => {
      let idx = studentList.findIndex((stu) => stu.id == res.id);
      let studentListCp = [...studentList];
      studentListCp[idx] = res;
      setStudentList(studentListCp);
      alert("Update student success")
    });
  };



  let token = getToken();
  if (token) {
    return (
      <div className="wrapper">
        <Drawler></Drawler>
        <div id="editStudentWrapper">
          <h3 className="title">Student List</h3>
          <table className="table table-striped">
            <thead>
              <tr>
                <th>id</th>
                <th>name</th>
                <th>email</th>
                <th>gender</th>
                <th>team</th>
              </tr>
            </thead>
            <tbody>
              {studentList &&
                studentList.length > 0 &&
                studentList.map((item, index) => {
                  return (
                    <tr key={item.id}>
                      <td>{item.id}</td>
                      <td>{item.name}</td>
                      <td>{item.email}</td>
                      <td>{item.gender}</td>

                      <td>{item.teams}</td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
          <div className="row">
            <h2>Reassign a team for an existing student</h2>
          </div>
          <form>
            <div className="form-group">
              <label>Name</label>
              <input id="nameInp" className="form-control" />
            </div>
            <div className="form-group">
              <label>Team</label>
              <input id="teamInp" className="form-control" />
            </div>
            <div className="form-group">
              <button
                onClick={(event) => hdlUpdateBtn(event)}
                className="btn btn-success"
                type="submit"
              >
                UPDATE
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  } else {
    return <Navigate to="/login" replace />;
  }
}
export default EditStudent;
//same use -, diff use space
