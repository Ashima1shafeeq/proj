import { useState } from "react";
import { Input } from "./Input";
import { Button } from "../Common/PrimaryButton";
import { Loader } from "../Common/Loader";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function RegisterStudent() {
  const registerStudent = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      let student = {
        name: name,
        cms_id: cms,
        room_no: room_no,
        batch: batch,
        dept: dept,
        course: course,
        email: email,
        father_name: fatherName,
        contact: contact,
        address: address,
        dob: dob,
        cnic: cnic,
        hostel: hostel,
        password: password
      };
      const res = await fetch("http://localhost:3000/api/student/register-student", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(student),
      });
      const data = await res.json();

      if (data.success) {
        toast.success(
          'Student ' + data.student.name + ' Registered Successfully!', {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
        setCms("");
        setName("");
        setRoomNo("");
        setBatch("");
        setDept("");
        setCourse("");
        setEmail("");
        setFatherName("");
        setContact("");
        setAddress("");
        setDob("");
        setCnic("");
        setPassword("");
        setLoading(false);
      } else {
        data.errors.forEach((err) => {
          toast.error(
            err.msg, {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
          });
        });
        setLoading(false);
      }
    } catch (err) {
      toast.error(
        err, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
      });
      setLoading(false);
    }
  };

  const hostel = JSON.parse(localStorage.getItem("hostel")).name;
  const [cms, setCms] = useState();
  const [name, setName] = useState();
  const [room_no, setRoomNo] = useState();
  const [batch, setBatch] = useState();
  const [dept, setDept] = useState();
  const [course, setCourse] = useState();
  const [email, setEmail] = useState();
  const [fatherName, setFatherName] = useState();
  const [contact, setContact] = useState();
  const [address, setAddress] = useState();
  const [dob, setDob] = useState();
  const [cnic, setCnic] = useState();
  const [password, setPassword] = useState();

  const [loading, setLoading] = useState(false);

  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-center bg-gray-900 py-10">
      <h1 className="text-white font-bold text-3xl mb-6">
        Register Student
      </h1>
      <div className="w-full max-w-4xl p-6 bg-neutral-800 rounded-lg shadow-lg">
        <form onSubmit={registerStudent} className="space-y-4">
          {/* Row 1: Name, CMS ID */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              field={{
                name: "name",
                placeholder: "Student Name",
                type: "text",
                req: true,
                value: name,
                onChange: (e) => setName(e.target.value),
              }}
            />
            <Input
              field={{
                name: "cms",
                placeholder: "Student CMS ID",
                type: "number",
                req: true,
                value: cms,
                onChange: (e) => setCms(e.target.value),
              }}
            />
          </div>
  
          {/* Row 2: DOB, CNIC */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              field={{
                name: "dob",
                placeholder: "Date of Birth",
                type: "date",
                req: true,
                value: dob,
                onChange: (e) => setDob(e.target.value),
              }}
            />
            <Input
              field={{
                name: "cnic",
                placeholder: "Student CNIC",
                type: "text",
                req: true,
                value: cnic,
                onChange: (e) => setCnic(e.target.value),
              }}
            />
          </div>
  
          {/* Row 3: Email, Contact */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              field={{
                name: "email",
                placeholder: "Student Email",
                type: "email",
                req: true,
                value: email,
                onChange: (e) => setEmail(e.target.value),
              }}
            />
            <Input
              field={{
                name: "contact",
                placeholder: "Student Contact",
                type: "text",
                req: true,
                value: contact,
                onChange: (e) => setContact(e.target.value),
              }}
            />
          </div>
  
          {/* Row 4: Father's Name */}
          <div>
            <Input
              field={{
                name: "father_name",
                placeholder: "Father's Name",
                type: "text",
                req: true,
                value: fatherName,
                onChange: (e) => setFatherName(e.target.value),
              }}
            />
          </div>
  
          {/* Row 5: Address */}
          <div>
            <label
              htmlFor="address"
              className="block text-sm font-medium text-white mb-2"
            >
              Address
            </label>
            <textarea
              name="address"
              placeholder="Student Address"
              required
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="w-full rounded-md p-2 bg-neutral-700 text-white border border-neutral-600"
            />
          </div>
  
          {/* Row 6: Room, Hostel */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              field={{
                name: "room_no",
                placeholder: "Room Number",
                type: "number",
                req: true,
                value: room_no,
                onChange: (e) => setRoomNo(e.target.value),
              }}
            />
            <Input
              field={{
                name: "hostel",
                placeholder: "Hostel Name",
                type: "text",
                req: true,
                value: hostel,
                disabled: true,
              }}
            />
          </div>
  
          {/* Row 7: Department, Course */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              field={{
                name: "dept",
                placeholder: "Department",
                type: "text",
                req: true,
                value: dept,
                onChange: (e) => setDept(e.target.value),
              }}
            />
            <Input
              field={{
                name: "course",
                placeholder: "Course",
                type: "text",
                req: true,
                value: course,
                onChange: (e) => setCourse(e.target.value),
              }}
            />
          </div>
  
          {/* Row 8: Batch, Password */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              field={{
                name: "batch",
                placeholder: "Batch",
                type: "number",
                req: true,
                value: batch,
                onChange: (e) => setBatch(e.target.value),
              }}
            />
            <Input
              field={{
                name: "password",
                placeholder: "Password",
                type: "password",
                req: true,
                value: password,
                onChange: (e) => setPassword(e.target.value),
              }}
            />
          </div>
  
          {/* Submit Button */}
          <div className="text-center">
            <Button>
              {loading ? (
                <>
                  <Loader /> Registering...
                </>
              ) : (
                "Register Student"
              )}
            </Button>
          </div>
        </form>
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick={true}
          rtl={false}
          pauseOnFocusLoss={true}
          draggable={true}
          pauseOnHover={true}
          theme="dark"
        />
      </div>
    </div>
  );
    
}

export default RegisterStudent;
