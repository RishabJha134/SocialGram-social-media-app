import { Menu, MenuItem } from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleMyMenu } from "../../redux/slice";

const MyMenu = () => {
  const { anchorE2 } = useSelector((state) => state.service);
  const dispatch = useDispatch();

  function handleClose() {
    dispatch(toggleMyMenu(null));
  }
  function handleDeletePost() {}
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


