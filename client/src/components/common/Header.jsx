import React from "react";
import { Grid, Stack, useMediaQuery } from "@mui/material";
import Navbar from "./Navbar";
import { IoMenu } from "react-icons/io5";

const Header = () => {
  const _700 = useMediaQuery("(min-width:700px)");

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
          <img
            src="Threads-logo-black-bg.webp"
            alt="logo"
            width={60}
            height={48}
          />
          <Stack
            justifyContent={"center"}
            width={"550px"}
            bgcolor={"aliceblue"}
            zIndex={2}
            height={96}
          >
            <Navbar></Navbar>
          </Stack>

          <IoMenu size={36} className="image-icon" color="gray"></IoMenu>
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
            bgcolor={"aliceblue"}
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
              <img
                src="Threads-logo-black-bg.webp"
                alt="logo"
                width={60}
                height={35}
              />
            </Grid>
            <IoMenu size={36} className="image-icon" color="gray"></IoMenu>
          </Grid>
        </>
      )}
    </>
  );
};

export default Header;
