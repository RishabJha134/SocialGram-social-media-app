import React from "react";
import { Menu, MenuItem } from "@mui/material";
import { Link } from "react-router-dom";

const MainMenu = () => {
  const handleClose = () => {};
  const handleToggleTheme = () => {};
  const handleLogout = () => {
    // Implement logout logic here
    console.log("Logged out");
  };
  return (
    <>
      <Menu
        anchorEl={""}
        open={true}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <MenuItem onClick={handleToggleTheme}> Toogle Theme</MenuItem>
        <Link to={"/profile/threads/2"} className="link">
          <MenuItem>My profile</MenuItem>
        </Link>
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
      </Menu>
    </>
  );
};

export default MainMenu;
