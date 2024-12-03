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

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [

      {
        path: "",
        element: <HomePage />,
      },
      {
        element: <ProtectedRoutes signIn={true} />, // Wrap all protected routes
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
        children: [
          {
            element: <ProtectedRoutes signIn={false} />, // Wrap all public routes
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
    ],
  },
]);
