import {
  Avatar,
  Button,
  Stack,
  Typography,
  useMediaQuery,
} from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const ProfileBar = (data) => {
  const { darkMode } = useSelector((state) => state.service);
  const _700 = useMediaQuery("(min-width:700px)");
  return (
    <>
      <Stack
        flexDirection={"row"}
        justifyContent={"space-between"}
        // maxWidth={"750px"}
        // width={"90%"}
        px={1}
        py={2}
        // mx={"auto"}
        boxShadow={"5px 5px 5px gray"}
        borderRadius={"15px"}
        sx={{
          ":hover": {
            cursor: "pointer",
          },
        }}
      >
        <Stack flexDirection={"row"} gap={2}>
          <Avatar
            src={data.e ? data.e.profilePic : ""}
            alt={data.e ? data.e.userName : ""}
          />
          <Stack flexDirection={"column"}>
            <Link to={`/profile/threads/${data.e._id}`} className="link">
              <Typography
                variant="h6"
                fontWeight={"bold"}
                fontSize={_700 ? "1rem" : "0.9rem"}
              >
                {data.e ? data.e.userName : ""}
              </Typography>
            </Link>

            <Typography
              variant="caption"
              fontSize={_700 ? "1.1rem" : "0.75rem"}
              color={"gray"}
            >
              {data.e ? data.e.bio : ""}
            </Typography>
            <Typography variant="caption" fontSize={_700 ? "1rem" : "0.9rem"}>
              {data.e ? data.e.followers.length : 0} followers
            </Typography>
          </Stack>
        </Stack>
        <Link to={`/profile/threads/${data.e._id}`} className="link">
          <Button
            size="medium"
            sx={{
              border: "1px solid gray",
              color: darkMode ? "whitesmoke" : "black",
              borderRadius: "10px",
              p: 2,
              height: 40,
            }}
          >
            Follow
          </Button>
        </Link>
      </Stack>
    </>
  );
};

export default ProfileBar;
