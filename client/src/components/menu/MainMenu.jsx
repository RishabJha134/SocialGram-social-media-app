import React, { useEffect } from "react";
import { Menu, MenuItem } from "@mui/material";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addMyInfo, toggleMainMenu, toggleThemeMode } from "../../redux/slice";
import { useLogoutMeMutation } from "../../redux/service";

const MainMenu = () => {
  const { anchorE1, myInfo } = useSelector((state) => state.service);

  // rtk query:-
  const [logoutMeUser, logoutMeUserData] = useLogoutMeMutation();
  console.log("logoutMeUserData", JSON.stringify(logoutMeUserData));

  console.log(anchorE1);
  const dispatch = useDispatch();
  const handleClose = () => {
    dispatch(toggleMainMenu(null));
  };
  const handleToggleTheme = () => {
    handleClose();
    dispatch(toggleThemeMode());
  };

  const handleLogout = async () => {
    handleClose();
    await logoutMeUser();
  };

  useEffect(() => {
    console.log("logoutMeUserData.isSuccess" + logoutMeUserData.isSuccess);
    if (logoutMeUserData.isSuccess) {
      // dispatch(addMyInfo(null));
      window.location.reload();
      console.log("Logged out" + logoutMeUserData);
      console.log("Logged out" + logoutMeUserData.data);
    }
  }, [logoutMeUserData.isSuccess]);
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
        <Link to={`/profile/threads/${myInfo?._id}`} className="link">
          <MenuItem>My profile</MenuItem>
        </Link>
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
      </Menu>
    </>
  );
};

export default MainMenu;
