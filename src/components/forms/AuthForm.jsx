import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { axiosInstance } from "../../config/axiosInstance";
import { useDispatch } from "react-redux";
import { saveUserData } from "../../redux/features/userSlice";
import googleIcon from "../../assets/googleIcon.png";

const AuthForm = ({ isRegister,formData,setFormData }) => {
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
    console.log(" success", formData);
    try {
      const response = await axiosInstance({
        method: "POST",
        url: isRegister ? "/auth/register/employer" : "/auth/login/employer",
        data: formData,
      });
      console.log(response);
      if (response.status === 200) {
        dispatch(saveUserData());
        navigate("/");
      }
    } catch (err) {
      console.error("Error during sign:", err.response?.data?.message || err);
    }
  }
  function googleSignIn() {
    try {
      console.log("google clicked");

      window.location.href = `${
        import.meta.env.VITE_BACKEND_URL
      }/api/auth/googleSign/employer`;
    } catch (err) {
      console.log(err);
    }
  }
  return (
   
        <div className="border shadow-md shadow-gray-500 rounded-sm border-black px-10 pb-5">
          <div className="text-center text-xl font-semibold mb-4 mt-2">
            {isRegister ? "Register" : "Login"}
          </div>
          {isRegister ? (
            <div className="text-xs text-center">
              Already have an account?{" "}
              <NavLink
                to="/sign/login"
                className="text-blue-600 hover:underline"
              >
                Login
              </NavLink>
            </div>
          ) : (
            <div className="text-xs text-center">
              New to Workio?{" "}
              <NavLink
                to="/sign/register"
                className="text-blue-600 hover:underline"
              >
                Register
              </NavLink>
            </div>
          )}
          <div className="w-full border-b my-2"></div>
          <button
            onClick={googleSignIn}
            className="border w-full border-black rounded-sm cursor-pointer px-1 py-1 hover:border-brandColor hover:text-brandColor hover:shadow-md active:shadow-none flex justify-evenly items-center mt-4 mb-2"
          >
            <img src={googleIcon} alt="google icon" className="h-4" />
            <span className="text-sm">Continue with Google</span>
          </button>
          <div className="flex w-full justify-center items-center">
            <div className="border-b w-full"></div>
            <div className="px-2 text-xs text-gray-400">or</div>
            <div className="border-b w-full"></div>
          </div>
          <form onSubmit={handleSubmit} className="flex flex-col gap-1">
            {isRegister && (
              <div>
                <label htmlFor="userName" className="text-sm">
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
              <label htmlFor="userEmail" className="text-sm">
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
              <label htmlFor="userPassword" className="text-sm">
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
            {isRegister && (
              <div>
                <label htmlFor="userConfirmPassword" className="text-sm">
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
                className={`btn text-white pl-1 border w-full mt-2 text-sm font-medium py-1 ${
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
