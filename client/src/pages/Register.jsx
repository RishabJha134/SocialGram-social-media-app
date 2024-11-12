import {
  Button,
  Stack,
  TextField,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { useState } from "react";

const Register = () => {
  const [login, setLogin] = useState(false);
  const _700 = useMediaQuery("(min-width:700px)");
  function HandleToggleLogin() {
    setUsername("");
    setEmail("");
    setPassword("");
    setLogin((prev) => !prev);
  }
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleLogin() {
    // Implement login logic here
    const data = {
      email,
      password,
    };
    console.log(data);
  }

  function handleRegister() {
    // Implement login logic here
    const data = {
      username,
      email,
      password,
    };
    console.log(data);
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
          width={_700?"40%":"90%"}
          gap={2}
          mt={_700 ? 20 : 0}
          sx={
            {
              // backgroundColor:"Red"
            }
          }
        >
          <Typography
            variant="h5"
            fontSize={_700?"1.5rem":"1rem"}
            fontWeight={"bold"}
            alignSelf={"center"}
          >
            {login ? "Login with Email" : "Register with Email"}
          </Typography>
          {login ? null : (
            <TextField
              onChange={(e) => {
                setUsername(e.target.value);
              }}
              value={username}
              variant="outlined"
              placeholder="Enter Your UserName..."
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
