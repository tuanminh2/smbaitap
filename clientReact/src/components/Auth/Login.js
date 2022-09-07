import React from 'react';
import axios from 'axios';

import { useNavigate } from 'react-router-dom';

function Login() {
  let navigate = useNavigate();
  const hdlLogin = async () => {
    // event.preventDefault();
    let usernameInp = document.getElementById('usernameInp').value;
    let passwordInp = document.getElementById('passwordInp').value;


    const a = {
      username: usernameInp,
      password: passwordInp,
    };
    console.log(a);
    async function authen() {
      let rs = await axios.post('http://localhost:8989/au/dn', a);

      return rs.data;
    }
    authen()
      .then((res) => {
        console.log('SUCCESS', res.token);
        localStorage.setItem('jwtToken', res.token);
        navigate('/student');
      })
      .catch((err) => {
        alert('LOGIN FAILED');
        console.log('FAILED', err);
      });
  };
  return (
    // action="http://localhost:8989/login" method="post"
    <>
      <div>
        <div className="form-group">
          <label> User name</label>
          <input
            type="text"
            name="username"
            id="usernameInp"
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            name="password"
            id="passwordInp"
            className="form-control"
          />
        </div>

        <button
          // onClick={(event) => hdlLogin(event)}
          className="btn btn-primary"
          onClick={hdlLogin}
        >
          Submit
        </button>
      </div>

      <div className="col-12 row">
        <button onClick={() => navigate('/register')}>
          Create new account
        </button>
      </div>
    </>
  );
}
export default Login;
// localStorage.setItem('jwtToken', response.data.token);
// method:'GET',
// url:`${process.env.hostUrl||'http://localhost:8080'}/api/v1/auth/userinfo`,
// headers:{
//     'Authorization':'Bearer '+getToken()
// }
