import { Stack, Typography, useMediaQuery } from "@mui/material";
import { IoIosMore } from "react-icons/io";
import PostOne from "./PostOne";
import PostTwo from "./PostTwo";
import { useDispatch, useSelector } from "react-redux";
import { addPostId, toggleMyMenu } from "../../redux/slice";
import { useEffect, useState } from "react";

const Post = (data) => {
  const { e } = data;
  console.log(e);
  const { darkMode, myInfo } = useSelector((state) => state.service);
  console.log(myInfo);

  const [isAdmin, setIsAdmin] = useState();

  const _300 = useMediaQuery("(min-width:300px)");
  const _400 = useMediaQuery("(min-width:400px)");
  const _700 = useMediaQuery("(min-width:700px)");

  const dispatch = useDispatch();

  const handleOpenMenu = (event) => {
    dispatch(addPostId(e._id));
    dispatch(toggleMyMenu(event.currentTarget));
  };

  // Utility function to calculate relative time
const calculateRelativeTime = (dateString) => {
  const postDate = new Date(dateString);
  const now = new Date();
  const differenceInSeconds = Math.floor((now - postDate) / 1000);

  if (differenceInSeconds < 60) return `${differenceInSeconds} seconds ago`;
  if (differenceInSeconds < 3600)
    return `${Math.floor(differenceInSeconds / 60)} minutes ago`;
  if (differenceInSeconds < 86400)
    return `${Math.floor(differenceInSeconds / 3600)} hours ago`;
  if (differenceInSeconds < 604800)
    return `${Math.floor(differenceInSeconds / 86400)} days ago`;
  return postDate.toLocaleDateString(); // Show exact date for posts older than a week
};

  const checkIsAdmin = () => {
    if (e?.admin._id === myInfo._id) {
      setIsAdmin(true);
      return;
    }
    setIsAdmin(false);
  };

  useEffect(() => {
    if (e && myInfo) {
      checkIsAdmin();
    }
  }, [e, myInfo]);

  return (
    <>
      <Stack
        flexDirection={"row"}
        justifyContent={"space-between"}
        borderBottom={"3px solid gray"}
        p={_700 ? 2 : _400 ? 1 : "5px"}
        mx={"auto"}
        width={_700 ? "70%" : _300 ? "90%" : "100%"}
        sx={{
          ":hover": {
            cursor: "pointer",
            boxShadow: _700 ? "10px 10px 10px gray" : "",
          },
          transition: "all ease-in-out 0.3s",
        }}
      >
        <Stack flexDirection={"row"} gap={_700 ? 2 : 1}>
          <PostOne e={e} />
          <PostTwo e={e} />
        </Stack>
        <Stack
          flexDirection={"row"}
          justifyContent={"center"}
          gap={1}
          fontSize={"1rem"}
        >
          <Typography
            variant="caption"
            color={darkMode ? "white" : "GrayText"}
            fontSize={"1rem"}
            position={"relative"}
            top={2}
          >
            {calculateRelativeTime(e?.createdAt)}

          </Typography>
          {isAdmin ? (
            <IoIosMore size={_700 ? 28 : 20} onClick={handleOpenMenu} />
          ) : (
            <IoIosMore size={_700 ? 28 : 20} />
          )}
        </Stack>
      </Stack>
    </>
  );
};

export default Post;
