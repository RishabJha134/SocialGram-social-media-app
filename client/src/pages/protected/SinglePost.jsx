import { Stack, TextField } from "@mui/material";
import React, { useState } from "react";
import Post from "../../components/home/Post";
import Comment from "../../components/home/Comment";

const SinglePost = () => {
  const [comment, setComment] = useState("");
  return (
    <>
      <Stack flexDirection={"column"} my={5} gap={2}>
        <Post></Post>
        <Stack flexDirection={"column"} gap={2} width={"80%"} mx={"auto"}>
          <Comment></Comment>
        </Stack>
        <TextField
          variant="outlined"
          autoFocus
          placeholder="Comments here..."
          id="comment"
          onChange={(e) => {
            setComment(e.target.value);
          }}
          sx={{
            width: "50%",
            mx: "auto",
            my: 5,
            p: 1,
          }}
        ></TextField>
      </Stack>
    </>
  );
};

export default SinglePost;
