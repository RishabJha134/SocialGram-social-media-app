import { Stack, Typography } from "@mui/material";
import Input from "../../components/home/Input";
import Post from "../../components/home/Post";
import Loading from "../../components/common/Loading";
import { useAllPostQuery } from "../../redux/service";
import { useSelector } from "react-redux";
import { useState } from "react";

const Home = () => {
  const [page, setPage] = useState(1);
  const { data, isLoading } = useAllPostQuery(page); // No page parameter
  const { allPosts } = useSelector((state) => state.service);
  console.log("allPosts" + JSON.stringify(allPosts.length));

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
        <Typography variant="h6" textAlign={"center"} mb={5}>
          You have reached the end!
        </Typography>
      )}
    </>
  );
};

export default Home;
