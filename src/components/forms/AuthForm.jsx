import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { axiosInstance } from "../../config/axiosInstance";
import { useDispatch } from "react-redux";
import { saveUserData } from "../../redux/features/userSlice";
import googleIcon from "../../assets/googleIcon.png";
import toast from "react-hot-toast"

const  AuthForm = ({ isRegister,formData,setFormData }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  

  const isFormValid =
    Object.values(formData).every((value) => value.trim() !== "") &&
    (!isRegister || formData.userPassword === formData.userConfirmPassword);

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  }
  async function handleSubmit(e) {
    e.preventDefault();
    
    try {
      const response = await axiosInstance({
        method: "POST",
        url: isRegister ? "/auth/register/employer" : "/auth/login/employer",
        data: formData,
      });
      console.log(response);
      if (response.status === 200) {
        dispatch(saveUserData());
        toast.success("SignIn success")
        navigate("/");
      }
    } catch (err) {
      
      if(err.status===409){
        toast.error("User already exist.Please login")
      }
      else if(err.status==404){
        toast.error("No such user exists.Please register")
      }
      else if(err.status===401){
        toast.error("Incorrect password")
      }
      else{
        console.error("Error during sign:", err.response?.data?.message || err);
      }
    }
  }
  function googleSignIn() {
    try {
      

      window.location.href = `${
        import.meta.env.VITE_BACKEND_URL
      }/api/auth/googleSign/employer`;
    } catch (err) {
      console.log(err);
    }
  }
  return (
   
        <div className="shadow-sm dark:shadow-darkColor-text px-10 pb-5 bg-white rounded-md dark:bg-darkColor">
          <div className="text-center text-xl font-semibold mb-4 mt-2">
            {isRegister ? "Register" : "Login"}
          </div>
          {isRegister ? (
            <div className="text-xs text-center">
              <span className="font-light">Already have an account? </span>
              <NavLink
                to="/sign/login"
                className="text-blue-600 hover:underline"
              >
                Login
              </NavLink>
            </div>
          ) : (
            <div className="text-xs text-center">
              <span className="font-light">New to Workio? </span>
              <NavLink
                to="/sign/register"
                className="text-blue-600 hover:underline"
              >
                Register
              </NavLink>
            </div>
          )}
          <div className="w-full border-b my-4 "></div>
          <button
            onClick={googleSignIn}
            className="flex border  border-brandColor rounded-md p-2 w-full items-center justify-center gap-2 text-brandColor hover:bg-brandColor hover:text-white active:scale-95 transition-all duration-300 ease-in-out"
          >
            <img src={googleIcon} alt="google icon" className="h-4" />
            <span className="text-sm">Continue with Google</span>
          </button>
          <div className="flex w-full mt-4 justify-center items-center">
            <div className="border-b w-full"></div>
            <div className="px-2 text-xs text-gray-400">or</div>
            <div className="border-b w-full"></div>
          </div>
          <form onSubmit={handleSubmit} className="flex flex-col gap-1">
            {isRegister && (
              <div>
                <label htmlFor="userName" className="text-sm text-brandColor">
                  Your/Company name
                </label>
                <br />
                <input
                  type="text"
                  id="userName"
                  name="userName"
                  value={formData.userName}
                  placeholder="Jhon Doe"
                  className="inputStyle"
                  onChange={handleChange}
                />
              </div>
            )}
            <div>
              <label htmlFor="userEmail" className="text-sm  text-brandColor">
                Email
              </label>
              <br />
              <input
                type="email"
                id="userEmail"
                name="userEmail"
                value={formData.userEmail}
                placeholder="jhondoe@gmail.com"
                className="inputStyle"
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="userPassword" className="text-sm  text-brandColor">
                Password
              </label>
              <br />
              <input
                type="password"
                id="userPassword"
                name="userPassword"
                value={formData.userPassword}
                placeholder="****"
                className="inputStyle"
                onChange={handleChange}
              />
            </div>
            {!isRegister&&<div className="text-end -mt-1.5"><span onClick={()=>navigate("/forgotPassword")} className="text-blue-500 hover:text-blue-700 text-xs cursor-pointer font-medium">forgot password ?</span></div>}
            {isRegister && (
              <div>
                <label htmlFor="userConfirmPassword" className="text-sm  text-brandColor">
                  Confirm password
                </label>
                <br />
                <input
                  type="password"
                  id="userConfirmPassword"
                  name="userConfirmPassword"
                  value={formData.userConfirmPassword}
                  placeholder="****"
                  className="inputStyle"
                  onChange={handleChange}
                />
              </div>
            )}
            <div>
              <input
                type="submit"
                value={isRegister?"Register":"Login"}
                className={`signBtn text-white pl-1 border w-full mt-2 text-sm font-medium py-1 ${
                  isFormValid
                    ? "bg-brandColor shadow-black shadow-sm active:shadow-none border-brandColor hover:shadow-sm hover:shadow-black"
                    : "bg-brandColor-light hover:shadow-none hover:border-brandColor-light border-brandColor-light hover:bg-brandColor-light cursor-not-allowed"
                }`}
                disabled={!isFormValid}
              />
            </div>
          </form>
        </div>
     
  );
};

export default AuthForm;
