import { Stack, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import Post from "../../components/home/Post";
import Comment from "../../components/home/Comment";
import { useParams } from "react-router-dom";
import { useAddCommentMutation, useSinglePostQuery } from "../../redux/service";
import { Bounce, toast } from "react-toastify";

const SinglePost = () => {
  const params = useParams();
  const [comment, setComment] = useState("");
  const { data, refetch } = useSinglePostQuery(params?.id);
  // refetch:- refetch ki zaroorat hume isiliye hoti hai ki kyoki hum mannualy is api ko wapis se fetch kar sakte hai. it is mannual data fetching:-
  console.log("single post data:" + data);

  const [addComment, addCommentData] = useAddCommentMutation();

  const handleAddComment = async (e) => {
    if (data && e.key === "Enter") {
      const info = {
        id: data.post._id,
        text: comment,
      };
      await addComment(info);
    }
  };

  useEffect(() => {
    if (addCommentData.isSuccess) {
      setComment("");
      refetch(); // refetching the post data after adding comment.
      toast.success(addCommentData.data.msg, {
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
    if (addCommentData.isError) {
      // console.log("Error in adding comment", addCommentData.error);
      // setComment(""); // resetting comment text if error occurs.
      toast.error(addCommentData.error.data.msg, {
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
  }, [addCommentData.isSuccess, addCommentData.isError]);

  return (
    <>
      <Stack flexDirection={"column"} my={5} gap={2}>
        <Post e={data?.post}></Post>
        <Stack flexDirection={"column"} gap={2} width={"80%"} mx={"auto"}>
          {data
            ? data.post?.comments.length > 0
              ? data.post.comments.map((e) => {
                  return (
                    <Comment
                      key={e._id}
                      e={e}
                      postId={data?.post._id}
                    ></Comment>
                  );
                })
              : null
            : null}
        </Stack>
        <TextField
          variant="outlined"
          autoFocus
          placeholder="Comment here..."
          id="comment"
          sx={{ width: "50%", mx: "auto", my: 5, p: 1 }}
          onChange={(e) => setComment(e.target.value)}
          onKeyUp={handleAddComment}
          value={comment ? comment : ""}
        />
      </Stack>
    </>
  );
};

export default SinglePost;
