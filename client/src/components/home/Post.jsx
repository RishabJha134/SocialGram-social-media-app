import { Stack, Typography, useMediaQuery } from "@mui/material";
import React from "react";
import { IoIosMore } from "react-icons/io";
import PostOne from "./PostOne";
import PostTwo from "./PostTwo";
import { useDispatch } from "react-redux";
import { toggleMyMenu } from "../../redux/slice";

const Post = () => {
  const _300 = useMediaQuery("(min-width:300px)");
  const _400 = useMediaQuery("(min-width:400px)");
  const _700 = useMediaQuery("(min-width:700px)");

  const dispatch = useDispatch();

  function handleMyMenu(e) {
    // Add your custom code here to handle the menu click event
    console.log("My Menu clicked");
    dispatch(toggleMyMenu(e.currentTarget));
  }

  return (
    <>
      <Stack
        flexDirection={"row"}
        justifyContent={"space-between"}
        borderBottom={"3px solid gray"}
        // alignItems={"center"}
        p={_700 ? 2 : _400 ? 1 : "5px"}
        mx={"auto"}
        width={_700 ? "70%" : _300 ? "90%" : "100%"}
        sx={{
          ":hover": {
            cursor: "pointer",
            boxShadow: _700 ? "10px 10px 10px gray" : "",
          },
          transition: "all ease-in-out 0.3s",
        }}
      >
        <Stack flexDirection={"row"} gap={_700 ? 2 : 1}>
          <PostOne></PostOne>
          <PostTwo></PostTwo>
        </Stack>
        <Stack
          flexDirection={"row"}
          gap={1}
          justifyContent={"center"}
          // backgroundColor={"red"}
          fontSize={"1rem"}
          // alignItems={"center"}
          // alignSelf={"center"}
        >
          <Typography
            variant="caption"
            color={"GrayText"}
            fontSize={"1rem"}
            position={"relative"}
            // alignItems={"center"}
            // alignSelf={"center"}
            top={5}
          >
            24h
          </Typography>
          <IoIosMore size={_700 ? 28 : 20} onClick={handleMyMenu}></IoIosMore>
        </Stack>
      </Stack>
    </>
  );
};

export default Post;
