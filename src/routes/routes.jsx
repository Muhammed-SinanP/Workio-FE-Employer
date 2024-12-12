import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import HomePage from "../pages/HomePage";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";

import MyProfilePage from "../pages/MyProfilePage";
import MyJobPostsPage from "../pages/MyJobPostsPage";
import JobApplicationsPage from "../pages/JobApplicationsPage";

import NewJobPost from "../pages/NewJobPost";
import UpdateJobPost from "../pages/UpdateJobPost";
import ProtectedRoutes from "./ProtectedRoutes";
import ErrorPage from "../pages/ErrorPage";
import ForgotPasswordPage from "../pages/ForgotPasswordPage";
import ResetPasswordPage from "../pages/ResetPasswordPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement:<ErrorPage/>,
    children: [

      {
        path: "",
        element: <HomePage />,
      },
      {
        path: "/forgotPassword",
        element: <ForgotPasswordPage />,
      },
      {
        path: "/resetPassword/:resetToken",
        element: <ResetPasswordPage/>,
      },
      {
        element: <ProtectedRoutes signIn={true} />, 
        children: [
          {
            path: "myProfile",
            element: <MyProfilePage />,
          },
          {
            path: "myJobPosts",
            element: <MyJobPostsPage />,
          },
          {
            path: "jobApplications/:jobId",
            element: <JobApplicationsPage />,
          },
          {
            path: "createNewJobPost",
            element: <NewJobPost />,
          },
          {
            path: "updateJobPost/:jobId",
            element: <UpdateJobPost />,
          },
        ],
      },

      {
        path: "sign",
        element: <ProtectedRoutes signIn={false} />,
        children: [
           
      
              {
                path: "login",
                element: <LoginPage />,
              },
              {
                path: "register",
                element: <RegisterPage />,
              },
            
          
        ],
      },
    ],
  },
]);
