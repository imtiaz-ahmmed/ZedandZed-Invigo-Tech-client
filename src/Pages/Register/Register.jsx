import { GiArchiveRegister } from "react-icons/gi";
import logo from "../../../public/c_logo.jpg";
import { useForm } from "react-hook-form";
import { useContext } from "react";
import { AuthContext } from "../../Providers/AuthProviders";
import { Link } from "react-router-dom";
import { FaHome } from "react-icons/fa";
import Swal from "sweetalert2";

const Register = () => {
  const { register, handleSubmit, reset } = useForm();
  const { createUser } = useContext(AuthContext);

  const onSubmit = (data) => {
    console.log(data);
    createUser(data.email, data.password).then((result) => {
      const saveUser = {
        name: data.name,
        email: data.email,
        designation: data.designation,
      };
      fetch("http://localhost:5000/users", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(saveUser),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.insertedId) {
            const loggedUser = result.user;
            console.log(loggedUser);
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: "New User Added",
              showConfirmButton: false,
              timer: 1500,
            });
            reset();
          }
        });
    });
  };

  return (
    <div>
      <img className="mx-auto" src={logo} alt="" />
      <div className="hero mt-4 ">
        <div className="hero-content flex-col lg:flex-row-reverse  md:gap-16">
          <div className="md:w-1/2 text-center lg:text-left">
            <h1 className="text-3xl px-2 font-bold text-[#015597]">
              Add New User
            </h1>
            <p className="py-6 px-2 text-justify ">
              ZedandZed IT Services Ltd. excels with InvigoTech, an innovative
              inventory management solution.
            </p>
          </div>
          <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
            <form onSubmit={handleSubmit(onSubmit)} className="card-body">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Name</span>
                </label>
                <input
                  {...register("name")}
                  type="text"
                  name="name"
                  placeholder="name"
                  className="input input-bordered"
                  required
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Designation</span>
                </label>
                <input
                  {...register("designation")}
                  type="text"
                  name="designation"
                  placeholder="designation"
                  className="input input-bordered"
                  required
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  {...register("email")}
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
                  {...register("password")}
                  type="password"
                  name="password"
                  placeholder="password"
                  className="input input-bordered"
                  required
                />
              </div>
              <div className="form-control mt-6">
                <div className="relative inline-flex items-center justify-center p-4 px-6 py-3 overflow-hidden font-medium text-indigo-600 transition duration-300 ease-out border-2 border-[#015597] rounded-full shadow-md group">
                  <span className="absolute inset-0 flex items-center justify-center w-full h-full text-white duration-300 -translate-x-full bg-[#015597] group-hover:translate-x-0 ease">
                    <button className="text-2xl flex items-center cursor-pointer">
                      <input type="submit" value=" " />
                      <GiArchiveRegister />
                    </button>
                  </span>

                  <span className="absolute flex items-center justify-center w-full h-full text-[#015597] transition-all duration-300 transform group-hover:translate-x-full ease">
                    Register
                  </span>
                  <span className="relative invisible">Register</span>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
      <Link to="/">
        <div className="text-sm flex gap-1 md:px-40 px-8  items-center py-5 text-[#015597] font-bold ">
          <FaHome />
          <h6>Back to Home</h6>
        </div>
      </Link>
    </div>
  );
};

export default Register;
