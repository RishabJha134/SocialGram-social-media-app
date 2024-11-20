import {
  Button,
  Stack,
  TextField,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useLoginMutation, useSigninMutation } from "../redux/service";
import { Bounce, toast } from "react-toastify";
import Loading from "../components/common/Loading";

const Register = () => {
  const [login, setLogin] = useState(false);
  const _700 = useMediaQuery("(min-width:700px)");

  // rtk query:-
  const [signinUser, signinUserData] = useSigninMutation();
  // this is a function api call:- signinUser jisme hum data pass kar sakte hai aur ye signinUserData aur ye hume api se response laakar deta hai {laoding,error,success};

  const [loginUser, loginUserData] = useLoginMutation();

  function HandleToggleLogin() {
    setUserName("");
    setEmail("");
    setPassword("");
    setLogin((prev) => !prev);
  }
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleLogin() {
    // Implement login logic here
    const data = {
      email,
      password,
    };
    console.log(data);
    await loginUser(data);
  }

  // async function handleRegister() {
  //   // Implement login logic here
  //   const data = {
  //     userName,
  //     email,
  //     password,
  //   };
  //   console.log(data);

  //   // Call the signinUser function to handle registration
  //   await signinUser(data);

  //   // Refresh the page after the registration process is complete
  //   window.location.reload();
  // }

  
  async function handleRegister() {
    // Implement login logic here
    const data = {
      userName,
      email,
      password,
    };
    console.log(data);

    // Call the signinUser function to handle registration
    await signinUser(data);
  }

  useEffect(() => {
    if (signinUserData.isSuccess) {
      toast.success(signinUserData.data.msg, {
        position: "top-center",
        autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "colored",
        transition: Bounce,
      });
      // Refresh the page after the registration process is complete
      window.location.reload();
    }
    if (signinUserData.isError) {
      toast.error(signinUserData.error.data.msg, {
        position: "top-center",
        autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "colored",
        transition: Bounce,
      });
    }
  }, [signinUserData.isSuccess, signinUserData.isError]);

  useEffect(() => {
    if (loginUserData.isSuccess) {
      toast.success(loginUserData.data.msg, {
        position: "top-center",
        autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "colored",
        transition: Bounce,
      });
    }
    if (loginUserData.isError) {
      toast.error(loginUserData.error.data.msg, {
        position: "top-center",
        autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "colored",
        transition: Bounce,
      });
    }
  }, [loginUserData.isSuccess, loginUserData.isError]);

  if (signinUserData.isLoading || loginUserData.isLoading) {
    return (
      <Stack height={"90vh"} alignItems={"center"} justifyContent={"center"}>
        <Loading />
      </Stack>
    );
  }

  return (
    <>
      <Stack
        width={"100%"}
        height={"100vh"}
        flexDirection={"row"}
        justifyContent={"center"}
        // alignItems={"center"}
      >
        <Stack
          flexDirection={"column"}
          width={_700 ? "40%" : "90%"}
          gap={2}
          mt={_700 ? 20 : 20}
          sx={
            {
              // backgroundColor:"Red"
            }
          }
        >
          <Typography
            variant="h5"
            fontSize={_700 ? "1.5rem" : "1rem"}
            fontWeight={"bold"}
            alignSelf={"center"}
          >
            {login ? "Login with Email" : "Register with Email"}
          </Typography>
          {login ? null : (
            <TextField
              onChange={(e) => {
                setUserName(e.target.value);
              }}
              value={userName}
              variant="outlined"
              placeholder="Enter Your userName..."
            />
          )}

          <TextField
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            value={email}
            variant="outlined"
            placeholder="Enter Your Email..."
          />
          <TextField
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            value={password}
            variant="outlined"
            placeholder="Enter Your Password..."
          />
          <Button
            onClick={login ? handleLogin : handleRegister}
            size="large"
            sx={{
              width: "100%",
              height: 52,
              bgcolor: "green",
              color: "white",
              fontSize: "1rem",
              ":hover": {
                bgcolor: "blue",
                cursor: "pointer",
              },
            }}
          >
            {login ? "Login" : "Register"}
          </Button>
          <Typography
            variant="subtitle2"
            fontSize={_700 ? "1.3rem" : "1rem"}
            alignSelf={"center"}
          >
            {login ? "Don't have an account?" : "Already have an account?"}{" "}
            <span onClick={HandleToggleLogin} className="login-link">
              {login ? "Register" : "Login"}
            </span>
          </Typography>
        </Stack>
      </Stack>
    </>
  );
};

export default Register;
