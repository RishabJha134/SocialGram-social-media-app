import { Stack, Typography, useMediaQuery } from "@mui/material";
import { FaRegHeart, FaRegComment, FaRetweet, FaHeart } from "react-icons/fa6";
import { IoMdSend } from "react-icons/io";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useLikePostMutation, useRepostMutation } from "../../redux/service";
import { useEffect, useState } from "react";
import { Bounce, toast } from "react-toastify";
// import { Bounce, toast } from "react-toastify";

const PostTwo = (data) => {
  console.log(data.e);
  const { darkMode, myInfo } = useSelector((state) => state.service);

  const [likePost, likePostData] = useLikePostMutation();
  console.log(JSON.stringify(likePostData));
  const [repost, repostData] = useRepostMutation();

  const [isLiked, setIsLiked] = useState(false);

  const _300 = useMediaQuery("(min-width:300px)");
  const _400 = useMediaQuery("(min-width:400px)");
  const _500 = useMediaQuery("(min-width:500px)");
  const _700 = useMediaQuery("(min-width:700px)");

  const handleLike = async () => {
    await likePost(data.e?._id);
  };

  const checkIsLiked = () => {
    if (data.e?.likes.length > 0) {
      const variable = data.e.likes.filter((ele) => ele._id === myInfo._id);
      if (variable.length > 0) {
        setIsLiked(true);
        return;
      }
    }
    setIsLiked(false);
  };

  const handleRepost = async () => {
    await repost(data.e?._id);
  };

  useEffect(() => {
    checkIsLiked();
  }, [data.e]);

  useEffect(() => {
    if (repostData.isSuccess) {
      console.log("repost success");
      toast.success(repostData.data.msg, {
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
    if (repostData.isError) {
      console.log("repost error");
      toast.success(repostData.error.data.msg, {
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
  }, [repostData.isSuccess, repostData.isError]);

  return (
    <>
      <Stack flexDirection={"column"} justifyContent={"space-between"}>
        <Stack flexDirection={"column"} gap={2}>
          <Stack flexDirection={"column"}>
            <Typography
              variant="h6"
              fontSize={_300 ? "1rem" : "0.8rem"}
              fontWeight={"bold"}
            >
              {data.e ? data.e.admin.userName : ""}
            </Typography>
            <Link to={`/post/${data.e?._id}`} className="link">
              <Typography
                variant="h5"
                fontSize={
                  _700 ? "1.2rem" : _400 ? "1rem" : _300 ? "0.9rem" : "0.8rem"
                }
                className={darkMode ? "mode" : ""}
              >
                {data.e ? data.e.text : ""}
              </Typography>
            </Link>
          </Stack>
          {data.e ? (
            data.e.media ? (
              <img
                src={data.e?.media}
                alt={data.e?.media}
                loading="lazy"
                width={
                  _700
                    ? "400px"
                    : _500
                    ? "350px"
                    : _400
                    ? "250px"
                    : _300
                    ? "180px"
                    : "150px"
                }
                height={"auto"}
              />
            ) : null
          ) : null}
        </Stack>
        <Stack flexDirection={"column"} gap={1}>
          <Stack flexDirection={"row"} gap={2} m={1}>
            {isLiked ? (
              <FaHeart size={_700 ? 32 : _300 ? 28 : 24} onClick={handleLike} />
            ) : (
              <FaRegHeart
                size={_700 ? 32 : _300 ? 28 : 24}
                onClick={handleLike}
              />
            )}

            <Link to={`/post/${data.e?._id}#comment`} className="link">
              <FaRegComment size={_700 ? 32 : _300 ? 28 : 24} />
            </Link>
            <FaRetweet
              size={_700 ? 32 : _300 ? 28 : 24}
              onClick={handleRepost}
            />
            <IoMdSend size={_700 ? 32 : _300 ? 28 : 24} />
          </Stack>
          <Stack
            flexDirection={"row"}
            gap={1}
            position={"relative"}
            top={-3}
            left={4}
          >
            {data.e ? (
              data.e.likes.length > 0 ? (
                <Typography
                  variant="caption"
                  color={darkMode ? "white" : "GrayText"}
                  fontSize={_700 ? "1.1rem" : "1rem"}
                >
                  {data.e.likes.length} likes .
                </Typography>
              ) : (
                ""
              )
            ) : (
              ""
            )}
            {data.e ? (
              data.e.comments.length > 0 ? (
                <Typography
                  variant="caption"
                  color={darkMode ? "white" : "GrayText"}
                  fontSize={_700 ? "1.1rem" : "1rem"}
                >
                  {data.e.comments.length} comment{" "}
                </Typography>
              ) : (
                ""
              )
            ) : (
              ""
            )}
          </Stack>
        </Stack>
      </Stack>
    </>
  );
};
export default PostTwo;
