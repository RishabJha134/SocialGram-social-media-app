import React from "react";
import { Menu, MenuItem } from "@mui/material";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toggleMainMenu, toggleThemeMode } from "../../redux/slice";

const MainMenu = () => {
  const { anchorE1 } = useSelector((state) => state.service);
  console.log(anchorE1);
  const dispatch = useDispatch();
  const handleClose = () => {
    dispatch(toggleMainMenu(null));
  };
  const handleToggleTheme = () => {
    handleClose();
    dispatch(toggleThemeMode());
  };
  const handleLogout = () => {
    // Implement logout logic here
    console.log("Logged out");
  };
  return (
    <>
      <Menu
        anchorEl={anchorE1} // ye element kis position par open hona chahiye kis element ke pass open hona chahiye.
        open={anchorE1 ? true : false}
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
