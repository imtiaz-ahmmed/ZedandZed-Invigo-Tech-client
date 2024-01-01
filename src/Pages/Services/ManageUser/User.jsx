import { ImProfile } from "react-icons/im";
const User = ({ user }) => {
  const { name, designation, email, employeeId, role, department } = user;
  return (
    <div className="bg-gray-200 p-8 rounded-lg shadow-md text-gray-800 w-full ">
      <div className="text-lg md:text-3xl font-extrabold mb-6 flex justify-center items-center gap-3">
        <ImProfile />
        <h6>User Profile</h6>
      </div>
      <h4 className="text-[#3070a2] md:text-xl font-bold">
        Employee Name : {name}
      </h4>
      <h4 className="text-[#3e91d1] md:text-lg font-bold">
        Employee ID: {employeeId}
      </h4>
      <h5 className="text-[#3070a2] md:text-lg font-bold">
        Designation : {designation}
      </h5>
      <h5 className="text-[#3e91d1] md:text-lg font-bold">Role : {role}</h5>
      <h5 className="text-[#3070a2] md:text-lg font-bold">
        Department : {department}
      </h5>
      <h5 className="text-[#4d8bbb] md:text-lg font-bold">Email : {email}</h5>
    </div>
  );
};

export default User;
