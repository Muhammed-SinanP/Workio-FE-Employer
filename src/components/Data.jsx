import PostAddIcon from "@mui/icons-material/PostAdd";
import ArticleIcon from "@mui/icons-material/Article";
import PersonIcon from '@mui/icons-material/Person';
import HomeIcon from "@mui/icons-material/Home";

export const navbarData = [
  {
  title: "Home",
    path: "/",
      icon: <HomeIcon fontSize="small" />,
  },
]

export const userNavbarData = [
  {
    title: "Job Posts",
    path: "/myJobPosts",
    icon: <ArticleIcon fontSize="small" />,
  },
  {
    title: "New Job",
    path: "/newJobPost",
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
    title: "Post your job",
    description: "Then just add a title, description , location, etc., to your job post, and post it.",
  },
  {
    index: 3,
    title: "Get verified",
    description: "After you post your job, Workio team will verify the post and approve/reject your post accordingly.",
  },
  {
    index:4,
    title:"Sit back and relax",
    description:"Once your job post is approved, job seekers will apply for it which you can view in job posts - view application section."
  }
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
        link: import.meta.env.VITE_FRONTEND_SEEKER
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