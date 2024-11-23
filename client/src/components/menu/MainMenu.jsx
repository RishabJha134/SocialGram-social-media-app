import React, { useEffect } from "react";
import { Menu, MenuItem } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addMyInfo, toggleMainMenu, toggleThemeMode } from "../../redux/slice";
import { useLogoutMeMutation } from "../../redux/service";
import { Bounce, toast } from "react-toastify";

const MainMenu = () => {
  const { anchorE1, myInfo } = useSelector((state) => state.service);
  const navigate = useNavigate();

  // rtk query:-
  const [logoutMeUser, logoutMeUserData] = useLogoutMeMutation();
  // console.log("logoutMeUserData", JSON.stringify(logoutMeUserData));

  // console.log(anchorE1);
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
    if (logoutMeUserData.isSuccess) {
      toast.warning(logoutMeUserData.data.msg, {
        position: "top-center",
        autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "colored",
        transition: Bounce,
      });
      navigate("/");
    }
    if (logoutMeUserData.isError) {
      toast.error(logoutMeUserData.error.data.msg, {
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
  }, [logoutMeUserData.isSuccess, logoutMeUserData.isError]);
  return (
    <>
      <Menu
        anchorEl={anchorE1} // ye element kis position par open hona chahiye kis element ke pass open hona chahiye.
        open={anchorE1 ? true : false}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <MenuItem onClick={handleToggleTheme}> Toggle Theme</MenuItem>
        <Link to={`/profile/threads/${myInfo?._id}`} className="link">
          <MenuItem>My profile</MenuItem>
        </Link>
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
      </Menu>
    </>
  );
};

export default MainMenu;
