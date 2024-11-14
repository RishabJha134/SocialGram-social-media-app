import { Stack, useMediaQuery } from "@mui/material";
import React from "react";
import { GoHome } from "react-icons/go";
import { IoIosSearch } from "react-icons/io";
import { TbEdit } from "react-icons/tb";
import { CiHeart } from "react-icons/ci";
import { RxAvatar } from "react-icons/rx";
import { Link } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { addPostModel } from "../../redux/slice";

const Navbar = () => {
  const { darkMode } = useSelector((state) => state.service);
  const _700 = useMediaQuery("(min-width:700px)");
  const _300 = useMediaQuery("(min-width:300px)");

  const dispatch = useDispatch();
  const handleAddPost = () => {
    // console.log('addPost')

    dispatch(addPostModel(true));
  };

  return (
    <>
      <Stack
        flexDirection={"row"}
        maxWidth={"100%"}
        justifyContent={"space-around"}
        alignItems={"center"}
      >
        <FiArrowLeft
          size={_300 ? "32" : "24"}
          className="image-icon"
          color={darkMode ? "white" : "black"}
        ></FiArrowLeft>
        <Link to={"/"} className="link" color={darkMode ? "white" : "black"}>
          <GoHome
            size={_300 ? "32" : "24"}
            color={darkMode ? "white" : "black"}
          ></GoHome>
        </Link>

        <Link
          to={"/search"}
          className="link"
          color={darkMode ? "white" : "black"}
        >
          <IoIosSearch
            size={_300 ? "32" : "24"}
            color={darkMode ? "white" : "black"}
          ></IoIosSearch>
        </Link>

        <TbEdit
          onClick={handleAddPost}
          size={_300 ? "32" : "24"}
          className="image-icon"
          color={darkMode ? "white" : "black"}
        ></TbEdit>
        <CiHeart
          size={_300 ? "32" : "24"}
          color={darkMode ? "white" : "black"}
        ></CiHeart>
        <Link
          to={"/profile/threads/1"}
          className="link"
          color={darkMode ? "white" : "black"}
        >
          <RxAvatar
            size={_300 ? "32" : "24"}
            color={darkMode ? "white" : "black"}
          ></RxAvatar>
        </Link>
      </Stack>
    </>
  );
};

export default Navbar;
