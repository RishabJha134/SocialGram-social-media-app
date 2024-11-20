import React from "react";
import Loading from "./components/common/Loading";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/common/Header";
import Error from "./pages/Error";
import Register from "./pages/Register";
import { Box } from "@mui/material";
import ProtectedLayout from "./pages/protected/ProtectedLayout";
import Home from "./pages/protected/Home";
import Search from "./pages/protected/Search";
import ProfileLayout from "./pages/protected/profile/ProfileLayout";
import Threads from "./pages/protected/profile/Threads";
import Replies from "./pages/protected/profile/Replies";
import Repost from "./pages/protected/profile/Repost";
import SinglePost from "./pages/protected/SinglePost";
import { useSelector } from "react-redux";
import { useMyInfoQuery } from "./redux/service";
import FollowersPage from "./pages/protected/profile/Followers";

const App = () => {
  const { darkMode } = useSelector((state) => state.service);
  const { data, isError, isLoading } = useMyInfoQuery();
  // console.log(isLoading);
  // const data = false;
  // console.log("useMyInfoQuery" + JSON.stringify(data));
  // console.log("isError" + isError);

  if (isLoading) {
    return <Loading />;
  }

  if (isError || !data) {
    return (
      <BrowserRouter>
        <Routes>
          <Route path="/*" element={<Register></Register>}></Route>
        </Routes>
      </BrowserRouter>
    );
  }

  return (
    <>
      <Box minHeight={"100vh"} className={darkMode ? "mode" : ""}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<ProtectedLayout></ProtectedLayout>}>
              <Route path="/" element={<Home></Home>} />
              <Route path="post/:id" element={<SinglePost></SinglePost>} />
              <Route path="search" element={<Search></Search>} />
              <Route
                path="follower/:userId"
                element={<FollowersPage></FollowersPage>}
              />

              <Route path="/profile" element={<ProfileLayout></ProfileLayout>}>
                <Route path="threads/:id" element={<Threads></Threads>}></Route>
                <Route path="replies/:id" element={<Replies></Replies>}></Route>
                <Route path="reposts/:id" element={<Repost></Repost>}></Route>
              </Route>
            </Route>

            <Route path="*" element={<Error></Error>}></Route>
          </Routes>
        </BrowserRouter>
      </Box>
    </>
  );
};

export default App;
