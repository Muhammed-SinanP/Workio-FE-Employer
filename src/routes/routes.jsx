import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import HomePage from "../pages/HomePage";
import LoginPage from "../pages/auth/LoginPage";
import RegisterPage from "../pages/auth/RegisterPage";
import JobApplicationsPage from "../pages/user/JobApplicationsPage";
import ProtectedRoutes from "./ProtectedRoutes";
import ErrorPage from "../pages/ErrorPage";
import JobPostsPage from "../pages/user/JobPostsPage";
import NewJobPostPage from "../pages/user/NewJobPostPage";
import UpdateJobPostPage from "../pages/user/UpdateJobPostPage";
import ProfilePage from "../pages/user/ProfilePage";
import ChangePasswordPage from "../pages/user/ChangePasswordPage";
import ForgotPasswordPage from "../pages/auth/ForgotPasswordPage";
import ResetPasswordPage from "../pages/auth/ResetPasswordPage";

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
        element: <ForgotPasswordPage/>,
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
            element: <ProfilePage />,
          },
          {
            path:"changeMyPassword",
            element:<ChangePasswordPage/>
          },
          {
            path: "myJobPosts",
            element: <JobPostsPage />,
          },
          {
            path: "jobApplications/:jobId",
            element: <JobApplicationsPage />,
          },
          {
            path: "newJobPost",
            element: <NewJobPostPage />,
          },
          {
            path: "updateJobPost/:jobId",
            element: <UpdateJobPostPage />,
          },
        ],
      },

      {
        path: "auth",
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
