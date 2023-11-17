import { Link, useNavigate } from "react-router-dom";
import { CiLogin } from "react-icons/ci";
import logo from "../../../public/c_logo.jpg";
import { useContext } from "react";
import { AuthContext } from "../../Providers/AuthProviders";
import Swal from "sweetalert2";
const Login = () => {
  const { signIn } = useContext(AuthContext);
  const navigate = useNavigate();

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
  return (
    <div>
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
                  type="email"
                  name="email"
                  placeholder="email"
                  className="input input-bordered"
                  required
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input
                  type="password"
                  name="password"
                  placeholder="password"
                  className="input input-bordered"
                  required
                />
                <label className="label">
                  <Link
                    to="/register"
                    className="label-text-alt link link-hover"
                  >
                    Forgot password? Register
                  </Link>
                </label>
              </div>
              <div className="form-control mt-6">
                <div className="relative inline-flex items-center justify-center p-4 px-6 py-3 overflow-hidden font-medium text-indigo-600 transition duration-300 ease-out border-2 border-[#015597] rounded-full shadow-md group">
                  <span className="absolute inset-0 flex items-center justify-center  h-full text-white duration-300 -translate-x-full bg-[#015597] group-hover:translate-x-0 ease">
                    <button className="text-2xl flex items-center cursor-pointer  ">
                      <input type="submit" value=" " />
                      <CiLogin />
                    </button>
                  </span>

                  <span className="absolute flex items-center justify-center w-full h-full text-[#015597] transition-all duration-300 transform group-hover:translate-x-full ease">
                    Login
                  </span>
                  <span className="relative invisible">Login</span>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
