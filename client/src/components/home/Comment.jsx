import {
  Avatar,
  Menu,
  MenuItem,
  Stack,
  Typography,
  useMediaQuery,
} from "@mui/material";
import React, { useState } from "react";
import { IoIosMore } from "react-icons/io";
import { useSelector } from "react-redux";

const Comment = () => {
  const { darkMode } = useSelector((state) => state.service);
  const [anchorEl, setAnchorEl] = useState();
  const _700 = useMediaQuery("(min-width:700px)");
  function handleClose() {
    setAnchorEl(null);
  }
  function handleDeleteComment() {}

  return (
    <>
      <Stack
        flexDirection={"row"}
        justifyContent={"space-between"}
        px={2}
        pb={2}
        borderBottom={"1px solid gray"}
        mx={"auto"}
        width={"90%"}
      >
        <Stack flexDirection={"row"} gap={_700 ? 2 : 1}>
          <Avatar src="" alt=""></Avatar>
          <Stack flexDirection={"column"}>
            <Typography variant="h6" fontWeight={"bold"} fontSize={"0.9rem"}>
              Aditya_5001
            </Typography>
            <Typography variant="subtitle2" fontSize={"0.9rem"}>
              This is a comment
            </Typography>
          </Stack>
        </Stack>
        <Stack
          flexDirection={"row"}
          gap={1}
          alignItems={"center"}
          color={darkMode ? "white" : "GrayText"}
          fontSize={"0.9rem"}
        >
          <p>24min</p>
          <IoIosMore
            size={_700 ? 28 : 20}
            className="image-icon"
            onClick={(e) => {
              setAnchorEl(e.currentTarget);
            }}
          ></IoIosMore>
        </Stack>
      </Stack>
      <Menu
        anchorEl={anchorEl}
        open={anchorEl?true:false}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <MenuItem onClick={handleDeleteComment}> Delete </MenuItem>
      </Menu>
    </>
  );
};

export default Comment;
