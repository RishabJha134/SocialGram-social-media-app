import { Menu, MenuItem } from "@mui/material";
import React from "react";

const MyMenu = () => {
  function handleClose() {}
  function handleDeletePost() {}
  return (
    <>
      <Menu
        anchorEl={""}
        open={true}
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
