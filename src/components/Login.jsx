import React, { useContext, useState, useEffect } from "react";
import icons from "../constants/icons";
import axios from "axios";
import jwtDecode from "jwt-decode";
import AuthContext from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { Role } from "../constants/Role";
import { BACKEND_URL } from "../config";
import useTogglePassword from "../hooks/useTogglePassword";

function Login() {
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const { setAuth } = useContext(AuthContext);
  const navigate = useNavigate();
  const [PasswordInputType, Icon] = useTogglePassword();
  const emailChangeHandler = (e) => {
    setEmailId(e.target.value);
  };
  const passwordChangeHandler = (e) => {
    setPassword(e.target.value);
  };

  let nametoken;
  const handleSubmit = (e) => {
    e.preventDefault();
    const LoginDetails = { email: emailId, password: password };
    axios
      .post(`${BACKEND_URL}/login`, LoginDetails)
      .then((res) => {
        if (res.status === 200) {
          const name = jwtDecode(res.data.jwt).name;
          nametoken = jwtDecode(res.data.jwt);
          const isAdmin =
            jwtDecode(res.data.jwt).role === Role.SUPER ||
            jwtDecode(res.data.jwt).role === Role.ADMIN;
          //TODO : Encrypt these keys and values before setting on LS
          localStorage.setItem(process.env.REACT_APP_TOKEN, res.data.jwt);
          setAuth({
            isLoggedIn: true,
            isAdmin,
            name,
          });
          navigate("/home");
        }
      })
      .catch((error) => {
        console.log(error);
        alert(
          "Inavlid Credentials! Please enter correct username and password."
        );
      });
    setEmailId("");
    setPassword("");
  };

  useEffect(() => {
    let isAuth = localStorage.getItem(process.env.REACT_APP_TOKEN, nametoken);
    if (isAuth && isAuth !== "undefined") {
      navigate("/home");
    }
  }, []);

  return (
    <div className="login">
      <div className="login-container">
        <div className="login-body">
          <h2 style={{ paddingTop: "20px" }}>Gk PolyBags</h2>
          <img
            className="site-logo"
            src="https://www.freeiconspng.com/thumbs/logo-design/logo-design-icon-symbol-4.png"
            alt=""
          />
          <hr />
          <p>Please login to your Account</p>

          <form className="login-form" onSubmit={handleSubmit}>
            <div className="username-field inputfield-wrapper">
              {/* <img className="user-icon" src={usericon} alt="" /> */}
              <input
                className="user"
                type="text"
                value={emailId}
                placeholder="Username"
                onChange={emailChangeHandler}
                required
              />
            </div>
            <div className="password-field inputfield-wrapper">
              {/* <img className="user-icon" src={lockicon} alt="" /> */}
              <input
                className="pass"
                type={PasswordInputType}
                value={password}
                placeholder="Password"
                onChange={passwordChangeHandler}
                required
              />
              {Icon}
            </div>
            <div className="submit-container">
              <div className="rememberme-container">
                <div className="remcheckbox-wrapper">
                  <input
                    type="checkbox"
                    className="remember remcheckbox"
                    name="remember"
                  />
                </div>
                <label htmlFor="remember" className="remember">
                  Remember me
                </label>
              </div>
              <button className="login-btn" type="submit">
                Login
              </button>
            </div>
          </form>
        </div>
        {/* <div className='forget-pass'>
				<p>
					Forget your password? <a href='# '>Click here</a>
				</p>
			</div> */}
      </div>
    </div>
  );
}

export default Login;
