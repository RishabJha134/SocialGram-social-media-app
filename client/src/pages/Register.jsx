// import {
//   Button,
//   Stack,
//   TextField,
//   Typography,
//   useMediaQuery,
// } from "@mui/material";
// import { useEffect, useState } from "react";
// import { useLoginMutation, useSigninMutation } from "../redux/service";
// import { Bounce, toast } from "react-toastify";
// import Loading from "../components/common/Loading";

// const Register = () => {
//   const [login, setLogin] = useState(false);
//   const _700 = useMediaQuery("(min-width:700px)");

//   // rtk query:-
//   const [signinUser, signinUserData] = useSigninMutation();
//   // this is a function api call:- signinUser jisme hum data pass kar sakte hai aur ye signinUserData aur ye hume api se response laakar deta hai {laoding,error,success};

//   const [loginUser, loginUserData] = useLoginMutation();

//   function HandleToggleLogin() {
//     setUserName("");
//     setEmail("");
//     setPassword("");
//     setLogin((prev) => !prev);
//   }
//   const [userName, setUserName] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   async function handleLogin() {
//     // Implement login logic here
//     const data = {
//       email,
//       password,
//     };
//     console.log(data);
//     await loginUser(data);
//   }

//   // async function handleRegister() {
//   //   // Implement login logic here
//   //   const data = {
//   //     userName,
//   //     email,
//   //     password,
//   //   };
//   //   console.log(data);

//   //   // Call the signinUser function to handle registration
//   //   await signinUser(data);

//   //   // Refresh the page after the registration process is complete
//   //   window.location.reload();
//   // }

//   async function handleRegister() {
//     // Implement login logic here
//     const data = {
//       userName,
//       email,
//       password,
//     };
//     console.log(data);

//     // Call the signinUser function to handle registration
//     await signinUser(data);
//   }

//   useEffect(() => {
//     if (signinUserData.isSuccess) {
//       toast.success(signinUserData.data.msg, {
//         position: "top-center",
//         autoClose: 2500,
//         hideProgressBar: false,
//         closeOnClick: true,
//         pauseOnHover: true,
//         draggable: true,
//         theme: "colored",
//         transition: Bounce,
//       });
//       // Refresh the page after the registration process is complete
//       window.location.reload();
//     }
//     if (signinUserData.isError) {
//       toast.error(signinUserData.error.data.msg, {
//         position: "top-center",
//         autoClose: 2500,
//         hideProgressBar: false,
//         closeOnClick: true,
//         pauseOnHover: true,
//         draggable: true,
//         theme: "colored",
//         transition: Bounce,
//       });
//     }
//   }, [signinUserData.isSuccess, signinUserData.isError]);

//   useEffect(() => {
//     if (loginUserData.isSuccess) {
//       toast.success(loginUserData.data.msg, {
//         position: "top-center",
//         autoClose: 2500,
//         hideProgressBar: false,
//         closeOnClick: true,
//         pauseOnHover: true,
//         draggable: true,
//         theme: "colored",
//         transition: Bounce,
//       });
//     }
//     if (loginUserData.isError) {
//       toast.error(loginUserData.error.data.msg, {
//         position: "top-center",
//         autoClose: 2500,
//         hideProgressBar: false,
//         closeOnClick: true,
//         pauseOnHover: true,
//         draggable: true,
//         theme: "colored",
//         transition: Bounce,
//       });
//     }
//   }, [loginUserData.isSuccess, loginUserData.isError]);

//   if (signinUserData.isLoading || loginUserData.isLoading) {
//     return (
//       <Stack height={"90vh"} alignItems={"center"} justifyContent={"center"}>
//         <Loading />
//       </Stack>
//     );
//   }

//   return (
//     <>
//       <Stack
//         width={"100%"}
//         height={"100vh"}
//         flexDirection={"row"}
//         justifyContent={"center"}
//         // alignItems={"center"}
//       >
//         <Stack
//           flexDirection={"column"}
//           width={_700 ? "40%" : "90%"}
//           gap={2}
//           mt={_700 ? 20 : 20}
//           sx={
//             {
//               // backgroundColor:"Red"
//             }
//           }
//         >
//           <Typography
//             variant="h5"
//             fontSize={_700 ? "1.5rem" : "1rem"}
//             fontWeight={"bold"}
//             alignSelf={"center"}
//           >
//             {login ? "Login with Email" : "Register with Email"}
//           </Typography>
//           {login ? null : (
//             <TextField
//               onChange={(e) => {
//                 setUserName(e.target.value);
//               }}
//               value={userName}
//               variant="outlined"
//               placeholder="Enter Your userName..."
//             />
//           )}

//           <TextField
//             onChange={(e) => {
//               setEmail(e.target.value);
//             }}
//             value={email}
//             variant="outlined"
//             placeholder="Enter Your Email..."
//           />
//           <TextField
//             onChange={(e) => {
//               setPassword(e.target.value);
//             }}
//             value={password}
//             variant="outlined"
//             placeholder="Enter Your Password..."
//           />
//           <Button
//             onClick={login ? handleLogin : handleRegister}
//             size="large"
//             sx={{
//               width: "100%",
//               height: 52,
//               bgcolor: "green",
//               color: "white",
//               fontSize: "1rem",
//               ":hover": {
//                 bgcolor: "blue",
//                 cursor: "pointer",
//               },
//             }}
//           >
//             {login ? "Login" : "Register"}
//           </Button>
//           <Typography
//             variant="subtitle2"
//             fontSize={_700 ? "1.3rem" : "1rem"}
//             alignSelf={"center"}
//           >
//             {login ? "Don't have an account?" : "Already have an account?"}{" "}
//             <span onClick={HandleToggleLogin} className="login-link">
//               {login ? "Register" : "Login"}
//             </span>
//           </Typography>
//         </Stack>
//       </Stack>
//     </>
//   );
// };

// export default Register;

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useLoginMutation, useSigninMutation } from "../redux/service";
import { Bounce, toast } from "react-toastify";
import Loading from "../components/common/Loading";
import { Mail, Lock, User, ArrowRight } from "lucide-react";

const Register = () => {
  const [login, setLogin] = useState(false);
  const [signinUser, signinUserData] = useSigninMutation();
  const [loginUser, loginUserData] = useLoginMutation();

  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const HandleToggleLogin = () => {
    setUserName("");
    setEmail("");
    setPassword("");
    setLogin((prev) => !prev);
  };

  const handleLogin = async () => {
    const data = { email, password };
    await loginUser(data);
  };

  const handleRegister = async () => {
    const data = { userName, email, password };
    await signinUser(data);
  };

  useEffect(() => {
    // setUserName("");
    // setEmail("");
    // setPassword("");
    if (signinUserData.isSuccess) {
      toast.success(signinUserData.data.msg, {
        position: "top-center",
        autoClose: 2500,
        theme: "colored",
        transition: Bounce,
      });
      window.location.reload();
    }
    if (signinUserData.isError) {
      toast.error(signinUserData.error.data.msg, {
        position: "top-center",
        autoClose: 2500,
        theme: "colored",
        transition: Bounce,
      });
    }
  }, [signinUserData]);

  useEffect(() => {
    // setUserName("");
    // setEmail("");
    // setPassword("");
    if (loginUserData.isSuccess) {
      toast.success(loginUserData.data.msg, {
        position: "top-center",
        autoClose: 2500,
        theme: "colored",
        transition: Bounce,
      });
    }
    if (loginUserData.isError) {
      toast.error(loginUserData.error.data.msg, {
        position: "top-center",
        autoClose: 2500,
        theme: "colored",
        transition: Bounce,
      });
    }
  }, [loginUserData]);

  if (signinUserData.isLoading || loginUserData.isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loading />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100 flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full space-y-8 bg-white/80 backdrop-blur-lg p-8 rounded-2xl shadow-xl"
      >
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            {login ? "Welcome back!" : "Create your account"}
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            {login ? "Sign in to your account" : "Join our community today"}
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={(e) => e.preventDefault()}>
          <div className="rounded-md space-y-4">
            {!login && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
                className="relative"
              >
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type="text"
                  placeholder="Username"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  className="appearance-none relative block w-full pl-12 pr-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm transition-all duration-300"
                />
              </motion.div>
            )}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="relative"
            >
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="email"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="appearance-none relative block w-full pl-12 pr-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm transition-all duration-300"
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="relative"
            >
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="appearance-none relative block w-full pl-12 pr-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm transition-all duration-300"
              />
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <button
              onClick={login ? handleLogin : handleRegister}
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transform transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
            >
              <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                <ArrowRight className="h-5 w-5 text-indigo-300 group-hover:text-indigo-200 transition-all duration-300" />
              </span>
              {login ? "Sign in" : "Create account"}
            </button>
          </motion.div>
        </form>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-center"
        >
          <p className="text-sm text-gray-600">
            {login ? "Don't have an account?" : "Already have an account?"}{" "}
            <button
              onClick={HandleToggleLogin}
              className="font-medium text-indigo-600 hover:text-indigo-500 transition-colors duration-300"
            >
              {login ? "Sign up" : "Sign in"}
            </button>
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Register;
