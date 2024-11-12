import { Avatar, AvatarGroup, Badge, Stack, Stepper, useMediaQuery } from "@mui/material";
import React from "react";

const PostOne = () => {
  const _700 = useMediaQuery("(min-width:700px)");
  return (
    <Stack
      flexDirection="column"
      alignItems="center"
      justifyContent="space-between"
    >
      {/* Main Badge with a nested Avatar */}
      <Badge
        overlap="circular"
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }} // badgecontent ko place karne ke liye use kar rahe hai.
        badgeContent={
          <Avatar
            alt="Plus icon"
            sx={{
              width: _700?20:14,
              height: _700?20:14,
              bgcolor: "green",
              position: "relative",
              right: _700?4:0,
              bottom: _700?4:0,
            }}
          >
            +
          </Avatar>
        }
      >
        <Avatar alt="AJ" sx={{ width: _700?40:32, height: _700?40:32 }} />
      </Badge>

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

        {/* Avatar Group with smaller Avatars */}
        <AvatarGroup
          total={3}
          
          sx={{
            "& .MuiAvatar-root": {
              width: _700?24:16,
              height: _700?24:16,
              fontSize: _700?12:8,
            },
          }}
        >
          <Avatar alt="User 1" />
          {/* <Avatar alt="User 2" /> */}
          {/* <Avatar alt="User 3" /> */}
        </AvatarGroup>
      </Stack>
    </Stack>
  );
};

export default PostOne;
