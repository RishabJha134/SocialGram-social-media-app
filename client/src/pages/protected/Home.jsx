import React from "react";
import Input from "../../components/home/Input";
import { Button, Stack } from "@mui/material";
import Post from "../../components/home/Post";

const Home = () => {
  return (
    <>
      <Input></Input>
      <Stack flexDirection={"column"} gap={2} marginBottom={10}>
        <Post></Post>
      </Stack>
      <Button size="large" sx={{
        my:5,p:3,textDecoration:"underline",cursor:"pointer"
      }}>
        Load More
      </Button>
    </>
  );
};

export default Home;
