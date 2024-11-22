import { IconButton, Stack, Typography, useMediaQuery } from "@mui/material";
import Input from "../../components/home/Input";
import Post from "../../components/home/Post";
import Loading from "../../components/common/Loading";
import { useAllPostQuery } from "../../redux/service";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { AiOutlineRobot } from "react-icons/ai";
import { toggleChatBot } from "../../redux/slice";
import MagicAI from "./../../components/common/MagicAI";

const Home = () => {
  const [page, setPage] = useState(1);
  const _700 = useMediaQuery("(min-width:700px)");
  const { data, isLoading } = useAllPostQuery(page); // No page parameter
  const { darkMode, allPosts, openBot } = useSelector((state) => state.service);
  console.log(openBot);
  const dispatch = useDispatch();
  console.log("allPosts" + JSON.stringify(allPosts.length));

  function handleBot() {
    console.log("Bot from home page");
    dispatch(toggleChatBot());
  }

  return (
    <>
      <Input />
      <Stack flexDirection={"column"} gap={2} mb={10}>
        {allPosts ? (
          allPosts.length > 0 ? (
            allPosts.map((e) => {
              return <Post key={e._id} e={e} />;
            })
          ) : (
            <Typography variant="caption" textAlign={"center"}>
              No post yet!
            </Typography>
          )
        ) : isLoading ? (
          <Loading />
        ) : null}
      </Stack>
      {allPosts?.length > 0 && (
        <Typography
          color="primary"
          fontWeight={"bold"}
          variant="h6"
          textAlign={"center"}
          mb={5}
        >
          You've caught up! ✨
        </Typography>
      )}
      {_700 ? (
        <>
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
                position: "fixed",
                bottom: 46,
                right: 31,
                width: 60,
                height: 60,
                borderRadius: "50%", // Makes the button circular
                boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.3)", // Subtle shadow for depth
              }}
            >
              <AiOutlineRobot size={30} />
            </IconButton>
          )}
        </>
      ) : (
        <>
          {openBot ? (
            <MagicAI></MagicAI>
          ) : (
            <IconButton
              // onClick={() => setOpen(true)}
              onClick={handleBot}
              sx={{
                bgcolor: "primary.main",
                color: "black",
                ":hover": { bgcolor: "primary.dark" },
                position: "fixed",
                bottom: 70,
                right: 16,
                width: 55,
                height: 56,
                boxShadow: "0px 4px 10px rgba(0,0,0,0.3)",
              }}
            >
              <AiOutlineRobot size={30} />
            </IconButton>
          )}
        </>
      )}
    </>
  );
};

export default Home;
