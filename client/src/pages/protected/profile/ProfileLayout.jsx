import React, { useEffect, useState } from "react";

import {
  Avatar,
  Button,
  Chip,
  Stack,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { FaInstagram } from "react-icons/fa6";
import { Link, Outlet, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { editProfileModel } from "../../../redux/slice";
// import { Helmet } from "react-helmet-async";
import {
  useFollowUserMutation,
  useUserDetailsQuery,
} from "../../../redux/service";
import EditProfile from "./../../../components/modals/EditProfile";
import { Bounce, toast } from "react-toastify";

const ProfileLayout = () => {
  const _300 = useMediaQuery("(min-width:300px)");
  const _500 = useMediaQuery("(min-width:500px)");
  const _700 = useMediaQuery("(min-width:700px)");

  const dispatch = useDispatch();
  const { darkMode, myInfo } = useSelector((state) => state.service);
  const params = useParams();
  console.log(params);
  const { data } = useUserDetailsQuery(params?.id);
  console.log(data);
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
              <Chip
                label="threads.net"
                size="small"
                sx={{ fontSize: _300 ? "0.8rem" : "0.6rem" }}
              />
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
          <Typography variant="subtitle2" color="gray">
            {data
              ? data.user
                ? data.user.followers.length > 0
                  ? `${data.user.followers.length} followers`
                  : "No Followers"
                : ""
              : ""}
          </Typography>
          <FaInstagram size={_300 ? 40 : 24} />
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
        flexDirection={"row"}
        justifyContent={"space-evenly"}
        my={5}
        pb={2}
        borderBottom={"2px solid gray"}
        fontSize={_500 ? "1.2rem" : _300 ? "1.1rem" : "0.9rem"}
        width={_700 ? "800px" : "90%"}
        mx={"auto"}
      >
        <Link
          to={`/profile/threads/${data?.user._id}`}
          className={`link ${darkMode ? "mode" : ""}`}
        >
          Threads
        </Link>
        <Link
          to={`/profile/replies/${data?.user._id}`}
          className={`link ${darkMode ? "mode" : ""}`}
        >
          Replies
        </Link>
        <Link
          to={`/profile/reposts/${data?.user._id}`}
          className={`link ${darkMode ? "mode" : ""}`}
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
