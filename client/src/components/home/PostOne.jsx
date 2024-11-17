import {
  Avatar,
  AvatarGroup,
  Badge,
  Stack,
  Stepper,
  useMediaQuery,
} from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

const PostOne = (data) => {
  console.log(data.e);
  const _700 = useMediaQuery("(min-width:700px)");
  return (
    <Stack
      flexDirection="column"
      alignItems="center"
      justifyContent="space-between"
    >
      {/* Main Badge with a nested Avatar */}
      <Link to={`/profile/threads/${data.e?.admin._id}`}>
        <Badge
          overlap="circular"
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }} // badgecontent ko place karne ke liye use kar rahe hai.
          badgeContent={
            <Avatar
              alt="Plus icon"
              sx={{
                width: _700 ? 20 : 14,
                height: _700 ? 20 : 14,
                bgcolor: "green",
                position: _700 ? "relative" : "initial",
                right: _700 ? 4 : 0,
                bottom: _700 ? 4 : 0,
              }}
            >
              +
            </Avatar>
          }
        >
          <Avatar
            alt={data.e ? data.e.admin.userName : ""}
            src={data.e ? data.e.admin.profilePic : ""}
            sx={{ width: _700 ? 40 : 32, height: _700 ? 40 : 32 }}
          />
        </Badge>
      </Link>

      <Stack flexDirection="column" alignItems="center" gap={2} height="100%">
        {/* Stepper for a vertical indicator; update width if visibility is needed */}
        <Stepper
          orientation="vertical"
          activeStep={0}
          sx={{
            border: "0.1rem solid gray",
            width: "2px",
            height: "100%",
          }}
        />

        {data.e ? (
          data.e.comments.length > 0 ? (
            <AvatarGroup
              total={data.e?.comments.length}
              sx={{
                "& .MuiAvatar-root": {
                  width: _700 ? 24 : 16,
                  height: _700 ? 24 : 16,
                  fontSize: _700 ? 12 : 8,
                },
              }}
            >
              <Avatar
                src={data.e?.comments[0].admin.profilePic}
                alt={data.e?.comments[0].admin.userName}
              />
              {data.e.comments.length > 1 ? (
                <Avatar
                  src={data.e?.comments[1].admin.profilePic}
                  alt={data.e?.comments[1].admin.userName}
                />
              ) : null}
            </AvatarGroup>
          ) : (
            ""
          )
        ) : (
          ""
        )}
      </Stack>
    </Stack>
  );
};

export default PostOne;
