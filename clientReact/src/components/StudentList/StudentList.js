import { ContactsOutlined } from '@material-ui/icons';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import Drawler from '../Drawler/Drawler';
import './StudentList.scss';
import Login from '../Auth/Login';
import { Navigate } from 'react-router-dom';

function StudentList() {
  const getToken = () => {
    return localStorage.getItem('jwtToken');
  };

  const [studentList, setStudentList] = useState([]);
  const [studentListCp, setStudentListCp] = useState([]);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [gender, setGender] = useState('');
  const hdlSearchNameChange = (event) => {
    let nameSearch = event.target.value;
    setName(nameSearch);

    let listcp = [...studentList];

    console.log('-', nameSearch);
    let rslist = [];

    if (email || gender) {
      rslist = listcp.filter(
        (v, i) =>
          v.name.trim().indexOf(nameSearch.trim()) !== -1 &&
          v.email.trim().indexOf(email.trim()) !== -1 &&
          v.gender.trim().indexOf(gender.trim()) !== -1
      );
    } else {
      rslist = listcp.filter(
        (v, i) => v.name.trim().indexOf(nameSearch.trim()) !== -1
      );
    }

    setStudentListCp(rslist);
  };
  const hdlSearchMailChange = (event) => {
    let emailSearch = event.target.value;
    setEmail(emailSearch);

    let listcp = [...studentList];

    console.log('-', emailSearch);
    let rslist = [];

    if (name || gender) {
      rslist = listcp.filter(
        (v, i) =>
          v.name.trim().indexOf(name.trim()) !== -1 &&
          v.email.trim().indexOf(emailSearch.trim()) !== -1 &&
          v.gender.trim().indexOf(gender.trim()) !== -1
      );
    } else {
      rslist = listcp.filter(
        (v, i) => v.email.trim().indexOf(emailSearch.trim()) !== -1
      );
    }

    setStudentListCp(rslist);
  };
  const hdlSearchGenderChange = (event) => {
    let genderSearch = event.target.value;
    setGender(genderSearch.trim());

    let listcp = [...studentList];


    let rslist = [];

    if (name || email) {
      rslist = listcp.filter(
        (v, i) =>
          v.name.trim().indexOf(name.trim()) !== -1 &&
          v.gender.trim().indexOf(genderSearch) !== -1 &&
          v.email.trim().indexOf(email.trim()) !== -1
      );
    } else {
      rslist = listcp.filter(
        (v, i) => v.gender.trim().indexOf(genderSearch.trim()) !== -1
      );
    }

    setStudentListCp(rslist);
  };

  const hdlDeleteStudent = (id) => {
    async function del() {
      let rs = await axios.delete(
        'http://localhost:8989/student/delete/' + id,
        {
          headers: {
            Authorization: 'Bearer ' + getToken(),
          },
        }
      );
      return rs.data;
    }
    del().then((res) => {
      let newList = studentList.filter((v, i) => v.id !== id);
      setStudentList(newList);
      setStudentListCp(newList);
    });
  };

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
      setStudentListCp(res);
    });
  }, []);

  let token = getToken();
  if (token) {
    return (
      <>
        <div className="wrapper">
          <Drawler></Drawler>
          <div id="studentListWrapper">
            <h1 className="title">Student List</h1>
            <div className="search-box">
              <div className="search-item name">
                <p>Search by Name</p>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => hdlSearchNameChange(e)}
                />
              </div>
              <div className="search-item mail">
                <p>Search by Email</p>
                <input
                  type="text"
                  value={email}
                  onChange={hdlSearchMailChange}
                />
              </div>
              <div className="search-item gender">
                <p>Gender</p>
                <div className="gender-ratio-container">
                  <div>
                    <label>Male</label>
                    <input
                      type="radio"
                      name="gender"
                      value="M"
                      onChange={(e) => hdlSearchGenderChange(e)}
                    />
                  </div>
                  <div>
                    <label>FeMale</label>
                    <input
                      type="radio"
                      name="gender"
                      value="F"
                      onChange={(e) => hdlSearchGenderChange(e)}
                    />
                  </div>

                  <div>
                    <label>All</label>
                    <input
                      type="radio"
                      name="gender"
                      value=""
                      onChange={(e) => hdlSearchGenderChange(e)}
                    />
                  </div>
                </div>
              </div>
            </div>

            <table className="table table-striped">
              <thead>
                <tr>
                  <th>id</th>
                  <th>name</th>
                  <th>email</th>
                  <th>gender</th>
                  <th>team</th>
                  <th>action</th>
                </tr>
              </thead>
              <tbody>
                {studentListCp &&
                  studentListCp.length > 0 &&
                  studentListCp.map((item, index) => {
                    return (
                      <tr key={item.id}>
                        <td>{item.id}</td>
                        <td>{item.name}</td>
                        <td>{item.email}</td>
                        <td>{item.gender}</td>

                        <td>{item.teams}</td>
                        <td>
                          <span
                            className="del-student-btn"
                            onClick={() => hdlDeleteStudent(item.id)}
                          >
                            <i className="fa fa-trash" aria-hidden="true"></i>
                          </span>
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
        </div>
      </>
    );
  } else {
    return <Navigate to="/login" replace />;
    // return(<Login/>)
  }
}
export default StudentList;
