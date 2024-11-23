import React, { useEffect, useState } from "react";

import {
  Avatar,
  Button,
  Chip,
  IconButton,
  Stack,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { FaInstagram } from "react-icons/fa6";
import { Link, Outlet, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { editProfileModel, toggleChatBot } from "../../../redux/slice";
// import { Helmet } from "react-helmet-async";
import {
  useFollowUserMutation,
  useUserDetailsQuery,
} from "../../../redux/service";
import EditProfile from "./../../../components/modals/EditProfile";
import { Bounce, toast } from "react-toastify";
import MagicAI from "../../../components/common/MagicAI";
// import MagicAI from './../../../components/common/MagicAI';
import { AiOutlineRobot } from "react-icons/ai";
import { Box, UserPlus } from "lucide-react";

const ProfileLayout = () => {
  const _300 = useMediaQuery("(min-width:300px)");
  const _500 = useMediaQuery("(min-width:500px)");
  const _700 = useMediaQuery("(min-width:700px)");

  const dispatch = useDispatch();
  const { darkMode, myInfo, openBot } = useSelector((state) => state.service);

  const params = useParams();
  // console.log(params);
  const { data } = useUserDetailsQuery(params?.id);
  // console.log(
  //   "useUserDetailsQuery" + JSON.stringify(data?.user.followers.length)
  // );
  const [followUser, followUserData] = useFollowUserMutation();
  const [myAccount, setMyAccount] = useState();
  const [isFollowing, setIsFollowing] = useState();

  async function checkIsFollowing() {
    if (data && myInfo) {
      // mai jiski profile par hu agar us user ki followers ke andar meri id hai iska matlab hai ki mai usko follow karta hu:-
      const isTrue = data.user.followers.filter((e) => e._id === myInfo._id);
      if (isTrue.length > 0) {
        setIsFollowing(true);
        return;
      }
      setIsFollowing(false);
    }
  }

  const checkIsMyAccount = () => {
    if (data && myInfo) {
      const isTrue = data.user._id === myInfo._id;
      setMyAccount(isTrue);
    }
  };

  const handleFollow = async () => {
    if (data) {
      await followUser(data.user._id);
    }
  };

  function handleOpenEditProfile() {
    dispatch(editProfileModel(true));
  }

  function handleBot() {
    console.log("Bot from home page");
    dispatch(toggleChatBot());
  }

  useEffect(() => {
    if (followUserData.isSuccess) {
      toast.success(followUserData.data.msg, {
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
    if (followUserData.isError) {
      toast.error(followUserData.error.data.msg, {
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
  }, [followUserData.isSuccess, followUserData.isError]);

  useEffect(() => {
    checkIsFollowing();
    checkIsMyAccount();
  }, [data]);

  return (
    <>
      {/* <Helmet>
        <title>
          {data
            ? data.user
              ? data.user.userName + " | Threads Clone"
              : "Threads Clone | App by Aditya Jawanjal"
            : "Threads Clone | App by Aditya Jawanjal"}
        </title>
      </Helmet> */}
      <Stack
        flexDirection="column"
        gap={2}
        p={2}
        m={2}
        width={_700 ? "800px" : "90%"}
        mx="auto"
      >
        <Stack
          flexDirection="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Stack flexDirection="column" gap={1}>
            <Typography
              variant="h2"
              fontWeight="bold"
              fontSize={_300 ? "2rem" : "1rem"}
            >
              {data ? (data.user ? data.user.userName : "") : ""}
            </Typography>
            <Stack
              flexDirection={"row"}
              gap={2}
              justifyContent={"center"}
              alignItems={"center"}
            >
              <Typography variant="h6" fontSize={_300 ? "1rem" : "0.8rem"}>
                {data ? (data.user ? data.user.email : "") : ""}
              </Typography>
              {/* <Chip
                label="threads.net"
                size="small"
                sx={{ fontSize: _300 ? "0.8rem" : "0.6rem" }}
              /> */}
            </Stack>
          </Stack>
          <Avatar
            src={data ? (data.user ? data.user.profilePic : "") : ""}
            alt={data ? (data.user ? data.user.userName : "") : ""}
            sx={{ width: _300 ? 60 : 40, height: _300 ? 60 : 40 }}
          />
        </Stack>

        <Typography variant="subtitle2">
          {data ? (data.user ? data.user.bio : "") : ""}
        </Typography>

        <Stack
          flexDirection="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Link
            to={`/follower/${data?.user?._id}`}
            style={{ textDecoration: "none", color: "inherit" }}
            aria-label={`View followers of ${data?.user?.name || "this user"}`}
          >
            <Stack
              direction="row"
              gap={1}
              alignItems="center"
              justifyContent="center"
              sx={{
                cursor: "pointer",
                transition: "color 0.3s ease, transform 0.2s ease",
                "&:hover": {
                  color: "black",
                  transform: "scale(1.05)", // Slight zoom effect
                },
                "&:active": {
                  transform: "scale(0.95)", // Button press effect
                },
              }}
            >
              <UserPlus />
              <Typography variant="subtitle2" color={darkMode?"white":"black"} fontSize={20}>
                {data?.user?.followers?.length ?? 0} followers
              </Typography>
            </Stack>
          </Link>

          {/* please here add my here magic ai logic please create a magic ai icon when user click on the icon then open a 
        text area input field then user enter the prompt for search from the magic ai by help of this api:-
         */}

          {/* {openBot ? <MagicAI></MagicAI> : <></>} */}
          {openBot ? (
            <MagicAI></MagicAI>
          ) : (
            <IconButton
              onClick={handleBot}
              sx={{
                // Background color based on mode
                bgcolor: darkMode ? "#2E2E2E" : "orange",
                // Icon color based on mode
                color: darkMode ? "orange" : "#2D2D2D",
                ":hover": {
                  // Hover background color based on mode
                  bgcolor: darkMode ? "#37474F" : "#E0F7FA",
                  // Hover icon color based on mode
                  color: darkMode ? "#81D4FA" : "#006064",
                },
                position: "relative",
                top: -26,
                right: 1,
                width: 60,
                height: 60,
                borderRadius: "50%", // Makes the button circular
                boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.3)", // Subtle shadow for depth
              }}
            >
              <AiOutlineRobot size={30} />
            </IconButton>
          )}
        </Stack>
      </Stack>

      <Button
        size="large"
        sx={{
          color: darkMode ? "whitesmoke" : "black",
          width: _700 ? "800px" : "90%",
          mx: "auto",
          textAlign: "center",
          border: "1px solid gray",
          borderRadius: "10px",
          ":hover": {
            cursor: "pointer",
          },
        }}
        onClick={myAccount ? handleOpenEditProfile : handleFollow}
      >
        {myAccount ? " Edit Profile" : isFollowing ? "unfollow" : "Follow user"}
      </Button>

      <Stack
        direction="row"
        justifyContent="space-evenly"
        alignItems="center"
        spacing={2}
        py={2}
        // borderBottom="2px solid #e5e7eb"
        fontSize={["0.9rem", "1.1rem", "1.2rem"]}
        width={["90%", "800px"]}
        mx="auto"
        className="transition duration-300 ease-in-out hover:shadow-lg"
      >
        {/* Threads Link */}
        <Link
          to={`/profile/threads/${data?.user._id}`}
          className={`text-black  hover:text-white transition-colors duration-300 ease-in-out ${
            darkMode ? "dark:bg-gray-800 dark:text-white" : ""
          } py-2 px-4 rounded-lg hover:bg-blue-100 dark:hover:bg-zinc-700`}
        >
          All Posts
        </Link>

        {/* Replies Link */}
        <Link
          to={`/profile/replies/${data?.user._id}`}
          className={`text-black  hover:text-white transition-colors duration-300 ease-in-out ${
            darkMode ? "dark:bg-gray-800 dark:text-white" : ""
          } py-2 px-4 rounded-lg hover:bg-blue-100 dark:hover:bg-zinc-700`}
        >
          Replies
        </Link>

        {/* Reposts Link */}
        <Link
          to={`/profile/reposts/${data?.user._id}`}
          className={`text-black  hover:text-white transition-colors duration-300 ease-in-out ${
            darkMode ? "dark:bg-gray-800 dark:text-white" : ""
          } py-2 px-4 rounded-lg hover:bg-blue-100 dark:hover:bg-zinc-700`}
        >
          Reposts
        </Link>
      </Stack>

      <Outlet />
      <EditProfile></EditProfile>
    </>
  );
};

export default ProfileLayout;
