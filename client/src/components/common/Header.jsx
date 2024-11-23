import React from "react";
import { Grid, Stack, useMediaQuery } from "@mui/material";
import Navbar from "./Navbar";
import { IoMenu } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { toggleMainMenu } from "../../redux/slice";
import { Link } from "react-router-dom";

const Header = () => {
  const _700 = useMediaQuery("(min-width:700px)");
  const { darkMode } = useSelector((state) => state.service);
  const dispatch = useDispatch();
  function handleToggleMainMenu(e) {
    // console.log(e.currentTarget);
    dispatch(toggleMainMenu(e.currentTarget));
  }

  return (
    <>
      {_700 ? (
        <Stack
          flexDirection={"row"}
          height={52}
          justifyContent={"space-around"}
          alignItems={"center"}
          position={"sticky"}
          top={0}
          py={1}
          sx={{ marginTop: 5 }}
        >
          <Link to={"/"}>
            {darkMode ? (
              <img
                src="social-graph-high-resolution-logo-transparent (2).png"
                className="mb-12"
                alt="logo"
                width={90}
                height={40}
              />
            ) : (
              <img
                className="mb-12"
                src="social-graph-high-resolution-logo-transparent (1).png"
                alt="logo"
                width={90}
                height={40}
              />
            )}
          </Link>

          <Stack
            justifyContent={"center"}
            width={"550px"}
            bgcolor={darkMode ? "" : "aliceblue"}
            zIndex={2}
            height={96}
          >
            <Navbar></Navbar>
          </Stack>

          <IoMenu
            size={36}
            className="image-icon"
            color="gray"
            onClick={handleToggleMainMenu}
          ></IoMenu>
        </Stack>
      ) : (
        <>
          <Stack
            position={"fixed"}
            bottom={0}
            justifyContent={"center"}
            width={"100%"}
            height={52}
            p={1}
            bgcolor={darkMode ? "" : "aliceblue"}
            zIndex={2}
          >
            <Navbar></Navbar>
          </Stack>
          <Grid
            container
            height={60}
            justifyContent={"flex-end"}
            alignItems={"center"}
            p={1}
          >
            <Grid item xs={6}>
              <Link to={"/"}>
                {darkMode ? (
                  <img
                    src="social-graph-high-resolution-logo-transparent (2).png"
                    className="mb-12"
                    alt="logo"
                    width={90}
                    height={40}
                  />
                ) : (
                  <img
                    className="mb-12"
                    src="social-graph-high-resolution-logo-transparent (1).png"
                    alt="logo"
                    width={90}
                    height={40}
                  />
                )}
              </Link>
            </Grid>
            <IoMenu
              size={36}
              className="image-icon"
              color="gray"
              onClick={handleToggleMainMenu}
            ></IoMenu>
          </Grid>
        </>
      )}
    </>
  );
};

export default Header;
