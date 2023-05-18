import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from 'firebase/auth';
import auth from "../firebase";


const initialState = {
  firstName: "",
  lastName: "",
  email: "",
  passWord: "",
  confirmPassword: "",
}

const Auth = ({ setActive }) => {
  const [state, setState] = useState(initialState);
  const [signUp, setSignUp] = useState(false);

  const navigate = useNavigate();

  const { email, passWord, firstName, lastName, confirmPassword } = state;

  const handleChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const handleAuth = async (e) => {
    e.preventDefault();
    if (!signUp) {
      if (email && passWord) {
        const { user } = await signInWithEmailAndPassword(auth, email, passWord);
        setActive("home");
      } else {
        return toast.error("All fields are mandatory to fill");
      }
    } else {
      if (passWord !== confirmPassword) {
        return toast.error("Password don't match");
      }
      if (firstName && lastName && email && passWord) {
        const { user } = await createUserWithEmailAndPassword(
          auth,
          email,
          passWord,
        );
        await updateProfile(user, { displayName: `${firstName} ${lastName}` });
        setActive("home");
      } else {
        return toast.error("All fields are mandatory to fill");
      }
    }
    navigate("/");
  };
  return (
    <div className="pt-28 text-center w-full">
      <div className="text-white text-xl font-bold">
        {!signUp ? "Sign-In" : "Sign-Up"}
      </div>
      <div className="w-1/2 mx-auto mt-6">
        <form className="input" onSubmit={handleAuth}>
          {signUp && (
            <div className="flex justify-between">
              <div className="">
                <input className="w-full px-12 py-2 mb-8 font-semibold rounded" type="text" placeholder="First Name..." name='firstName' value={firstName} onChange={handleChange} />
              </div>
              <div className="">
                <input className="w-full px-12 py-2 mb-8 font-semibold rounded" type="text" placeholder="Last Name..." name='lastName' value={lastName} onChange={handleChange} />
              </div>
            </div>
          )}
          <div className="">
            <input className='w-full py-2 mb-8 pl-2 font-semibold rounded' type="email" placeholder="Email..." name='email' value={email} onChange={handleChange} />
          </div>
          <div className="">
            <input className='w-full py-2 mb-8 pl-2 font-semibold rounded' type="password" placeholder="Password..." name='passWord' value={passWord} onChange={handleChange} />
          </div>
          {signUp && (
            <div className="">
              <input className='w-full py-2 mb-8 pl-2 font-semibold rounded' type="password" placeholder="Confirm Password..." name='confirmPassword' value={confirmPassword} onChange={handleChange} />
            </div>
          )}
          <div className="button">
            <button className={`rounded font-bold text-white text-xl w-80 py-2 ${!signUp ? "rounded bg-red-500 font-bold text-white text-xl w-80 py-2" : "rounded bg-blue-500 font-bold text-white text-xl w-80 py-2"}`} type="submit">
              {!signUp ? "Sign-In" : "Sign-Up"}
            </button>
          </div>
        </form>
        <div className="mt-4 font-medium">
          {!signUp ? (
            <>
              <div className="para-container">
                <p className="text-white">
                  Don't have an account ? <span className='text-orange-600 cursor-pointer' onClick={() => setSignUp(true)}>Sign Up</span>
                </p>
              </div>
            </>
          ) : (
            <>
              <div className="para-container">
                <p className="text-white">
                  Already have an account ? <span className='text-blue-800 cursor-pointer' onClick={() => setSignUp(false)}>Sign In</span>
                </p>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default Auth;