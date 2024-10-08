import { Link, useNavigate } from "react-router-dom";
import { CiLogin } from "react-icons/ci";
import { RiEyeCloseFill } from "react-icons/ri";
import { FaEye } from "react-icons/fa";
import logo from "../../../public/c_logo.jpg";
import { useContext, useRef, useState } from "react";
import { AuthContext } from "../../Providers/AuthProviders";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet";

const Login = () => {
  const { signIn, resetPassword } = useContext(AuthContext);
  const navigate = useNavigate();
  const [passwordVisible, setPasswordVisible] = useState(false);
  const emailRef = useRef();
  const handleLogin = (event) => {
    event.preventDefault();
    const form = event.target;
    const email = form.email.value;
    const password = form.password.value;

    signIn(email, password).then((result) => {
      const user = result.user;
      console.log(user);
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Welcome back! Let's dive in!",
        showConfirmButton: false,
        timer: 1500,
      });
      navigate("/");
    });
  };

  const handleResetPassword = (event) => {
    const email = emailRef.current.value;
    if (!email) {
      Swal.fire({
        icon: "warning",
        title: "Oops!",
        text: "Please enter your email address to reset your password.",
      });
      return;
    }

    resetPassword(email)
      .then(() => {
        Swal.fire({
          icon: "success",
          title: "Password Reset Email Sent!",
          text: `An email has been sent to ${email} with instructions to reset your password. Please check your inbox.`,
        });
      })
      .catch((error) => {
        console.log(error);
        Swal.fire({
          icon: "error",
          title: "Oops!",
          text: "An error occurred while processing your request. Please try again later.",
        });
      });
  };

  return (
    <div>
      <Helmet>
        <title>ZnZ || Login</title>
      </Helmet>

      <img className="mx-auto" src={logo} alt="" />
      <div className="hero mt-5 ">
        <div className="hero-content flex-col lg:flex-row-reverse  md:gap-16">
          <div className="md:w-1/2 text-center lg:text-left">
            <h1 className="text-3xl px-2 font-bold text-[#015597]">
              Welcome to <br /> ZedandZed InvigoTech!
            </h1>
            <p className="py-6 px-2 text-justify ">
              ZedandZed IT Services Ltd. excels with InvigoTech, an innovative
              inventory management solution.
            </p>
          </div>
          <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
            <form onSubmit={handleLogin} className="card-body">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  ref={emailRef}
                  type="email"
                  name="email"
                  placeholder="email"
                  className="input input-bordered input-info"
                  required
                />
              </div>
              <div className="form-control relative">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input
                  type={passwordVisible ? "text" : "password"}
                  name="password"
                  placeholder="password"
                  className="input input-bordered input-info"
                  required
                />
                <span
                  className="absolute mt-14 ms-52 md:ms-72 cursor-pointer"
                  onClick={() => setPasswordVisible(!passwordVisible)}
                >
                  {passwordVisible ? <RiEyeCloseFill /> : <FaEye />}
                </span>

                <span className="label">
                  <button
                    onClick={handleResetPassword}
                    className="label-text-alt link link-hover"
                  >
                    Forgot password?
                  </button>
                </span>
              </div>
              <div className="form-control mt-6">
                <button className="relative inline-flex items-center justify-center p-4 px-6 py-3 overflow-hidden font-medium text-indigo-600 transition duration-300 ease-out border-2 border-[#015597] rounded-full shadow-md group">
                  <span className="absolute inset-0 flex items-center justify-center  h-full text-white duration-300 -translate-x-full bg-[#015597] group-hover:translate-x-0 ease">
                    <span className="text-2xl flex items-center cursor-pointer">
                      <input type="submit" value=" " />
                      <CiLogin />
                    </span>
                  </span>

                  <span className="absolute flex items-center justify-center w-full h-full text-[#015597] transition-all duration-300 transform group-hover:translate-x-full ease">
                    Login
                  </span>
                  <span className="relative invisible">Login</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
