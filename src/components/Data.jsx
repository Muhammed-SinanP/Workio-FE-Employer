import PostAddIcon from "@mui/icons-material/PostAdd";
import ArticleIcon from "@mui/icons-material/Article";
import PersonIcon from '@mui/icons-material/Person';
export const userOptions = [
  {
    title: "Job Posts",
    path: "/myJobPosts",
    icon: <ArticleIcon fontSize="small" />,
  },
  {
    title: "New Job",
    path: "/createNewJobPost",
    icon: <PostAddIcon fontSize="small" />,
  },
  {
      title:"My Profile",
      path:"/myProfile",
      icon:<PersonIcon fontSize="small"/>
  },
];

export const stepsToUse = [
  {
    index: 1,
    title: "Create your free account",
    description: "All you need is your email address to create an account and start building your job post.",
  },
  {
    index: 2,
    title: "Build your job post",
    description: "Then just add a title, description , location, etc., to your job post, and you're ready to go.",
  },
  {
    index: 3,
    title: "Post your job and relax",
    description: "After you post your job, job seekers will apply for it which you can view in job posts - view application section.",
  },
];

export const footerEmployerData=[
    {
        title:"Create Free Account",
        path:"/sign/register"
    },
    {
        title:"Post A Job",
        path:"/createNewJobPost"
    },
    
]

export const footerSeekerData=[
    {
        title:"Job Seeker Center",
        link:import.meta.env.VITE_FRONTEND_SEEKER
    },
    
    
]

export const footerContactData = [
    {
        title:"Email us",
        emailTo:"mailto:iam.muhammedsinan.p@gmail.com"
    },
    

]


export const footerBrandData = [
    {
        title:"Privacy Policy"
    },
    {
        title:"Terms Of Use"
    },
    {
        title:"Cookie Policy"
    }
]