import React from 'react';
import axios from 'axios';

import { useNavigate } from 'react-router-dom';
function Register() {
  let navigate = useNavigate();
  const hdlSubmitForm = (e) => {
    e.preventDefault();
    async function createUser() {
      let firstNameInp = document.getElementById('firstNameInp').value;
      let lastNameInp = document.getElementById('lastNameInp').value;
      let userNameInp = document.getElementById('userNameInp').value;
      let passwordInp = document.getElementById('passwordInp').value;
      const data = {
        firstname: firstNameInp,
        lastname: lastNameInp,
        username: userNameInp,
        password: passwordInp,
      };
      console.log(data);
      let rs = await axios.post('http://localhost:8989/user/add', data);
      return rs.data;
    }
    createUser()
      .then((res) => {
        console.log(res.data);

        navigate('/login');
      })
      .catch((err) => {
        alert('REGISTER FAILED');
        console.log('FAILED', err);
      });
  };

  return (
    <>
      <form>
        <div className="form-group">
          <label>First Name</label>
          <input
            type="text"
            id="firstNameInp"
            className="form-control"
            required
          />
        </div>
        <div className="form-group">
          <label>Last Name</label>
          <input
            type="text"
            id="lastNameInp"
            className="form-control"
            required
          />
        </div>

        <div className="form-group">
          <label>User name</label>
          <input
            type="text"
            id="userNameInp"
            className="form-control"
            required
          />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            id="passwordInp"
            className="form-control"
            required
          />
        </div>
        <div className="form-group">
          <label>Confirm password</label>
          <input
            type="password"
            id="confirm-password"
            className="form-control"
            required
          />
        </div>

        <button
          type="submit"
          onClick={hdlSubmitForm}
          className="btn btn-primary"
        >
          Submit
        </button>
      </form>


    </>
  );
}
export default Register;
