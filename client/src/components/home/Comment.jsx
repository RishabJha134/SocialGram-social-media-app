import {
  Avatar,
  Menu,
  MenuItem,
  Stack,
  Typography,
  useMediaQuery,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { IoIosMore } from "react-icons/io";
import { useSelector } from "react-redux";
import {
  useDeleteCommentMutation,
  useSinglePostQuery,
} from "../../redux/service";

const Comment = ({ e, postId }) => {
  const [isAdmin, setIsAdmin] = useState();
  const [deleteComment, deleteCommentData] = useDeleteCommentMutation();
  const { refetch } = useSinglePostQuery(postId);
  const { darkMode, myInfo } = useSelector((state) => state.service);
  const [anchorEl, setAnchorEl] = useState();
  const _700 = useMediaQuery("(min-width:700px)");

  function handleClose() {
    setAnchorEl(null);
  }
  async function handleDeleteComment() {
    const info = {
      postId,
      id: e?._id,
    };
    await deleteComment(info);
    handleClose();
    refetch();
  }

  const checkIsAdmin = () => {
    if (e && myInfo) {
      if (e.admin._id === myInfo._id) {
        setIsAdmin(true);
        return;
      }
    }
    setIsAdmin(false);
  };

  useEffect(() => {
    checkIsAdmin();
  }, []);

  useEffect(() => {
    if (deleteCommentData.isSuccess) {
      console.log("deleteCommentData.isSuccess" + deleteCommentData.isSuccess);
    }
    if (deleteCommentData.isError) {
      console.log("deleteCommentData.isError" + deleteCommentData.isError);
    }
  }, [deleteCommentData.isSuccess, deleteCommentData.isError]);

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
          <Avatar
            src={e ? e.admin.profilePic : ""}
            alt={e ? e.admin.userName : ""}
          ></Avatar>
          <Stack flexDirection={"column"}>
            <Typography variant="h6" fontWeight={"bold"} fontSize={"0.9rem"}>
              {e ? e.admin.userName : ""}
            </Typography>
            <Typography variant="subtitle2" fontSize={"0.9rem"}>
              {e ? e.text : ""}
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
          {isAdmin ? (
            <IoIosMore
              size={_700 ? 28 : 20}
              className="image-icon"
              onClick={(e) => {
                setAnchorEl(e.currentTarget);
              }}
            ></IoIosMore>
          ) : (
            <IoIosMore size={_700 ? 28 : 20} className="image-icon"></IoIosMore>
          )}
        </Stack>
      </Stack>
      <Menu
        anchorEl={anchorEl}
        open={anchorEl ? true : false}
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
