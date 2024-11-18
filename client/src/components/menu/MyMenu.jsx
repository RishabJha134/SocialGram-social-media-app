import { Menu, MenuItem } from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleMyMenu } from "../../redux/slice";
import { useDeletePostMutation } from "../../redux/service";
import { Bounce, toast } from "react-toastify";

const MyMenu = () => {
  const { anchorE2, postId } = useSelector((state) => state.service);
  const dispatch = useDispatch();
  const [deletePost, deletePostData] = useDeletePostMutation();

  function handleClose() {
    dispatch(toggleMyMenu(null));
  }
  async function handleDeletePost() {
    handleClose();
    await deletePost(postId);
  }

  useEffect(() => {
    if (deletePostData.isSuccess) {
      // console.log("deletePostData.isSuccess" + deletePostData.isSuccess);
      toast.warning(deletePostData.data.msg, {
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
    if (deletePostData.isError) {
      // console.log("deletePostData.isError" + deletePostData.isError);
      toast.error(deletePostData.error.data.msg, {
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
  }, [deletePostData.isSuccess, deletePostData.isError]);

  return (
    <>
      <Menu
        anchorEl={anchorE2}
        open={anchorE2 ? true : false}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <MenuItem onClick={handleDeletePost}> Delete </MenuItem>
      </Menu>
    </>
  );
};

export default MyMenu;
