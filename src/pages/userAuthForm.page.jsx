import { Link } from "react-router-dom";
import InputBox from "../components/input.component";
import googleIcon from "../imgs/google.png";
import AnimationWrapper from "../common/page-animation";
import { useContext, useRef, useState } from "react";
import { toast, Toaster } from "react-hot-toast";
import axios from "axios";
import { StoreInSession } from "../common/session";
import { UserContext } from "../App";
import { Navigate } from 'react-router-dom'
import { authWithGoogle } from "../common/firebase";

const UserAuthForm = ({ type }) => {
  const authForm = useRef();

  let {userAuth , setUserAuth} = useContext(UserContext);

  console.log(userAuth?.access_token);

  const handleLogin = async (ev) => {
    ev.preventDefault();
    try {
      let serverRoute = type === "sign-in" ? "/signin" : "/signup";

      let form = new FormData(formElement);
      let formData = {};

      for (let [key, value] of form.entries()) {
        formData[key] = value;
      }

      const rs = await axios.post(
        `http://localhost:3000${serverRoute}`,formData
      );
      
      StoreInSession("user" ,JSON.stringify(rs.data));
      setUserAuth(rs.data);

      toast.success(type === 'sign-in' ? "Login Success" : "Register Success");
    } catch (error) {
      toast.error(error.response.data.msg);
    }
  };
  
  const handleGoogleAuth = async (ev) => {
    ev.preventDefault();
      authWithGoogle().then(async (user) => {
      
      let serverRoute = '/google-auth';

      let formData = {
        access_token : user.accessToken
      }
      console.log(formData)
      const rs = await axios.post('http://localhost:3000' + serverRoute , 
        formData
      )
      StoreInSession("user" ,JSON.stringify(rs.data));
      setUserAuth(rs.data);


    }).catch((error) => {
      toast.error(error.response.data.msg)
      console.log(error.response.data.msg)
    });
  }

  return (

    userAuth?.access_token ? 
    <Navigate to='/' /> : 

    <AnimationWrapper keyValue={type}>
      <section className="h-cover flex items-center justify-center ">
        <Toaster />
        <form
          id='formElement'
          className="w-[80%] max-w-[400px]"
          onSubmit={handleLogin}
        >
          <h1 className="text-4xl font-gelasio capitalize text-center mb-24">
            {type === "sign-in" ? "welcome back" : "Join us today"}
          </h1>

          {type != "sign-in" ? (
            <InputBox name="fullname" type="text" placeholder="full name" />
          ) : (
            ""
          )}
          <InputBox name="email" type="email" placeholder="email" />

          <InputBox name="password" type="password" placeholder="password" />
          <button
            onClick={handleLogin}
            className="btn-dark center mt-14"
            type="submit"
          >
            {type.replace("-", " ")}
          </button>

          <div className="relative w-full flex items-center gap-2 my-10 opacity-10 uppercase text-black font-bold">
            <hr className="w-1/2 border-black" />
            <p>or</p>
            <hr className="w-1/2 border-black" />
          </div>

          <button className="btn-dark flex items-center justify-center gap-4 w-[90%] center" onClick={handleGoogleAuth}>
            <img src={googleIcon} className="w-5" />
            conutinue with google
          </button>

          {type === "sign-in" ? (
            <p className="mt-6 text-dark-grey text-xl text-center">
              Don't have an account ?
              <Link to="/signup" className="underline text-black text-xl ml-1">
                Join us today
              </Link>
            </p>
          ) : (
            <p className="mt-6 text-dark-grey text-xl text-center">
              Already a member ?
              <Link to="/signin" className="underline text-black text-xl ml-1">
                Sign in here
              </Link>
            </p>
          )}
        </form>
      </section>
    </AnimationWrapper>
  );
};

export default UserAuthForm;
