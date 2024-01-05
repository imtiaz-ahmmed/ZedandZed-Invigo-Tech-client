import { GiArchiveRegister } from "react-icons/gi";
import logo from "../../../public/c_logo.jpg";
import { useForm } from "react-hook-form";
import { useContext, useState } from "react";
import { AuthContext } from "../../Providers/AuthProviders";
import { Link } from "react-router-dom";
import { FaHome } from "react-icons/fa";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet";
import { RiEyeCloseFill } from "react-icons/ri";
import { FaEye } from "react-icons/fa";
import Navigation from "../../Shared/Navbar/Navigation";
const Register = () => {
  const { register, handleSubmit, reset } = useForm();
  const { createUser } = useContext(AuthContext);
  const [passwordVisible, setPasswordVisible] = useState(false);

  const onSubmit = (data) => {
    console.log(data);
    createUser(data.email, data.password).then((result) => {
      const saveUser = {
        name: data.name,
        employeeId: data.employeeId,
        email: data.email,
        designation: data.designation,
        role: data.role,
        department: data.department,
      };
      fetch("https://zedand-zed-invigo-tech-server.vercel.app/users", {
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
      <Helmet>
        <title>ZnZ || Registration</title>
      </Helmet>
      <hr />
      <Navigation></Navigation>
      <hr />
      <img className="mx-auto" src={logo} alt="" />
      <div className="hero mt-4 ">
        <div className="hero-content flex-col lg:flex-row-reverse  md:gap-16">
          <div className="md:w-4/12 text-center lg:text-left">
            <h1 className="text-3xl px-2 font-bold text-[#015597]">
              Add New User
            </h1>
            <p className="py-6 px-2 text-justify ">
              ZedandZed IT Services Ltd. excels with InvigoTech, an innovative
              inventory management solution.
            </p>
          </div>
          <div className="card flex-shrink-0 w-full max-w-md shadow-2xl bg-base-100">
            <form onSubmit={handleSubmit(onSubmit)} className="card-body">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Employee Name</span>
                </label>
                <input
                  {...register("name")}
                  type="text"
                  name="name"
                  placeholder="name"
                  className="input input-bordered input-info"
                  required
                />
              </div>

              <div className="md:grid md:grid-cols-2 md:gap-4">
                {" "}
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Employee ID</span>
                  </label>
                  <input
                    {...register("employeeId")}
                    type="text"
                    name="employeeId"
                    placeholder="employee Id"
                    className="input input-bordered input-info"
                    required
                  />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Department</span>
                  </label>
                  <select
                    {...register("department")}
                    name="department"
                    className="select select-bordered select-info"
                    required
                  >
                    <option value="">Select Department</option>
                    <option value="finance">Finance</option>
                    <option value="marketing">Marketing</option>
                    <option value="operations_management">
                      Operations Management
                    </option>
                    <option value="human_resources">Human Resources</option>
                    <option value="information_technology">
                      Information Technology
                    </option>
                  </select>
                </div>
              </div>

              <div className="md:grid md:grid-cols-2 md:gap-4">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Designation</span>
                  </label>
                  <input
                    {...register("designation")}
                    type="text"
                    name="designation"
                    placeholder="designation"
                    className="input input-bordered input-info"
                    required
                  />
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Role</span>
                  </label>
                  <select
                    {...register("role")}
                    name="role"
                    className="select select-bordered select-info"
                    required
                  >
                    <option value="">Select Role</option>
                    <option value="admin">Admin</option>
                    <option value="moderator">Moderator</option>
                    <option value="editor">Editor</option>
                  </select>
                </div>
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
                  className="input input-bordered input-info"
                  required
                />
              </div>
              <div className="form-control relative">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input
                  {...register("password")}
                  type={passwordVisible ? "text" : "password"}
                  name="password"
                  placeholder="password"
                  className="input input-bordered input-info"
                  required
                />
                <span
                  className="absolute mt-14 ms-48 md:ms-80 cursor-pointer"
                  onClick={() => setPasswordVisible(!passwordVisible)}
                >
                  {passwordVisible ? <RiEyeCloseFill /> : <FaEye />}
                </span>
              </div>

              <div className="form-control mt-6">
                <button className="relative inline-flex items-center justify-center p-4 px-6 py-3 overflow-hidden font-medium text-indigo-600 transition duration-300 ease-out border-2 border-[#015597] rounded-full shadow-md group">
                  <span className="absolute inset-0 flex items-center justify-center w-full h-full text-white duration-300 -translate-x-full bg-[#015597] group-hover:translate-x-0 ease">
                    <span className="text-2xl flex items-center cursor-pointer">
                      <input type="submit" value=" " />
                      <GiArchiveRegister />
                    </span>
                  </span>

                  <span className="absolute flex items-center justify-center w-full h-full text-[#015597] transition-all duration-300 transform group-hover:translate-x-full ease">
                    Register
                  </span>
                  <span className="relative invisible">Register</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
