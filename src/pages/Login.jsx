import React from "react";
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <>
      <div className="w-full h-full">
        <div className="my-auto z-50 relative top-[50%] translate-y-[25%]">
          <div className="max-w-[400px] h-[500px] mx-auto  text-white bg-white">
            <h2>Sign in</h2>
            <p></p>
            <div>
              <i></i>
              <input type="text" placeholder="web@wmovies.com" />
              <i></i>
              <input type="password" placeholder="hellomovies" />
            </div>
            <div>
              <input type="checkbox" name="" id="" />
              <span>Remember me</span>
            </div>
            <button>Log in</button>
          </div>
          <div>
            <p>
              Don't have an account?
              <Link to="signup">Sign up</Link>
            </p>
            {/*         <Link>Forgot password?</Link> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
