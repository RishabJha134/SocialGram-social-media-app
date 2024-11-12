import React from "react";
import { Stack, useMediaQuery } from "@mui/material";
import Comment from "../../../components/home/Comment";

const Replies = () => {
  const _700 = useMediaQuery("(min-width:700px)");

  return (
    <>
      <Stack flexDirection={"column"} gap={2} width={_700?"800px":"90%"} mx={"auto"}>
        <Comment></Comment>
      </Stack>
    </>
  );
};

export default Replies;
