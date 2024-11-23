import React from "react";
import { Avatar, Button, Stack, Typography, useMediaQuery } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { addPostModel } from "../../redux/slice";
import { useMyInfoQuery } from "../../redux/service";
import { PenLine } from "lucide-react";

const Input = () => {
  const _700 = useMediaQuery("(min-width:700px)");
  // const { myInfo } = useMyInfoQuery();
  // console.log(JSON.stringify(myInfo));
  const {myInfo} = useSelector((state)=>state.service);
  // console.log(myInfo)
  const dispatch = useDispatch();

  const handleAddPost = () => {
    dispatch(addPostModel(true));
  };

  if (!_700) return null;

  return (
    <Stack
      className="transform transition-all duration-300 hover:scale-[1.02] hover:shadow-lg"
      flexDirection="row"
      alignItems="center"
      width="70%"
      justifyContent="space-between"
      sx={{
        background: "rgba(255, 255, 255, 0.8)",
        backdropFilter: "blur(10px)",
        borderRadius: "16px",
        // border: "1px solid rgba(209, 213, 219, 0.3)",
        border:"1px solid #E4E4E7",
        padding: "1.5rem",
        margin: "2rem auto",
        cursor: "pointer",
      }}
      onClick={handleAddPost}
    >
      <Stack 
        flexDirection="row" 
        alignItems="center" 
        gap={2}
        className="group"
      >
        <div className="relative">
          <Avatar
            src={myInfo?.profilePic}
            alt={myInfo?.userName}
            className="w-12 h-12 ring-2 ring-offset-2 ring-purple-500 transition-all duration-300 group-hover:ring-offset-4"
            sx={{
              boxShadow: "0 0 0 2px rgba(139, 92, 246, 0.3)",
            }}
          />
          <div className="absolute -bottom-1 -right-1 bg-green-500 w-3 h-3 rounded-full border-2 border-white" />
        </div>
        
        <Stack gap={0.5}>
          <Typography
            variant="body1"
            className="font-medium text-gray-700 group-hover:text-gray-900 transition-colors duration-300"
          >
            {myInfo?.userName || "User"}
          </Typography>
          <Typography
            color="GrayText"
            className="flex items-center gap-2 text-sm group-hover:text-purple-600 transition-colors duration-300"
          >
            <PenLine size={16} className="group-hover:rotate-12 transition-transform duration-300" />
            Have an Idea...
          </Typography>
        </Stack>
      </Stack>

      <Button
        variant="contained"
        size="large"
        className="transition-all duration-300 transform hover:scale-105"
        sx={{
          backgroundColor: "rgb(139, 92, 246)",
          color: "white",
          textTransform: "none",
          px: 4,
          py: 1.5,
          borderRadius: "12px",
          fontWeight: 500,
          "&:hover": {
            backgroundColor: "rgb(124, 58, 237)",
            boxShadow: "0 10px 15px -3px rgba(139, 92, 246, 0.3)",
          },
        }}
      >
        Post
      </Button>
    </Stack>
  );
};

export default Input;