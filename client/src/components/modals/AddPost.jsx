import {
  Avatar,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { Box, Stack } from "@mui/system";
import { useEffect, useRef, useState } from "react";
import { FaImages } from "react-icons/fa6";
import { RxCross2 } from "react-icons/rx";
import { useDispatch, useSelector } from "react-redux";
import { addPostModel } from "../../redux/slice";
import { useAddPostMutation } from "../../redux/service";
import { Bounce, toast } from "react-toastify";
import Loading from "../common/Loading";

const AddPost = () => {
  const _700 = useMediaQuery("(min-width:700px)");
  const _500 = useMediaQuery("(min-width:500px)");
  const { openAddPostModel, myInfo } = useSelector((state) => state.service);
  const dispatch = useDispatch();
  const [addNewPost, addNewPostData] = useAddPostMutation();

  const [text, setText] = useState("");
  const [media, setMedia] = useState();
  const mediaRef = useRef();

  function handleClose() {
    setText("");
    setMedia(null);
    dispatch(addPostModel(false));
  }

  function handleMediaRef() {
    mediaRef.current.click();
  }

  async function handlePost() {
    if (!text) {
      toast.error("Text field can't be empty!", {
        position: "top-center",
        autoClose: 2500,
        theme: "colored",
        transition: Bounce,
      });
      return;
    }
    const data = new FormData();
    if (text) data.append("text", text);
    if (media) data.append("media", media);
    await addNewPost(data);
  }

  useEffect(() => {
    if (addNewPostData.isSuccess) {
      setText("");
      setMedia(null);
      dispatch(addPostModel(false));
      toast.success("Post added successfully!", {
        position: "top-center",
        autoClose: 2500,
        theme: "colored",
        transition: Bounce,
      });
      // window.location.reload();
    }
    if (addNewPostData.isError) {
      toast.error("Failed to add post.", {
        position: "top-center",
        autoClose: 2500,
        theme: "colored",
        transition: Bounce,
      });
    }
  }, [addNewPostData.isSuccess, addNewPostData.isError]);

  return (
    <Dialog
      open={openAddPostModel}
      onClose={handleClose}
      fullWidth
      fullScreen={!_700}
      // className="bg-gradient-to-br from-gray-100 to-blue-50"
    >
      {addNewPostData.isLoading ? (
        <Stack height={"60vh"}>
          <Loading></Loading>
        </Stack>
      ) : (
        <Box className="relative p-5 rounded-lg shadow-xl">
          <RxCross2
            size={28}
            className="absolute top-5 right-5 cursor-pointer hover:scale-110 transition-transform"
            onClick={handleClose}
          />
          <DialogTitle className="text-center text-2xl font-bold mb-5">
            Create a New Post
          </DialogTitle>
          <DialogContent>
            <Stack direction="row" gap={3} className="mb-5">
              <Avatar
                src={myInfo?.profilePic}
                alt={myInfo?.userName}
                className="border border-gray-300"
              />
              <Stack className="flex-1">
                <textarea
                  rows="3"
                  // required
                  placeholder="What's on your mind?"
                  className="w-full p-3 rounded-lg border border-gray-300  focus:outline-none mt-2 focus:ring-2 focus:ring-blue-500"
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                />
                {media && (
                  <img
                    src={URL.createObjectURL(media)}
                    alt="Selected media"
                    className="mt-3 w-full h-auto rounded-lg"
                  />
                )}
                <FaImages
                  size={28}
                  className="mt-3 cursor-pointer text-blue-600 hover:text-blue-800 transition"
                  onClick={handleMediaRef}
                  title="Add an image"
                />
                <input
                  type="file"
                  accept="image/*"
                  ref={mediaRef}
                  className="hidden"
                  onChange={(e) => setMedia(e.target.files[0])}
                />
              </Stack>
            </Stack>
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <Typography className="text-gray-500">
                Anyone can reply
              </Typography>
              <Button
                variant="contained"
                size="large"
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition"
                onClick={handlePost}
              >
                Post
              </Button>
            </Stack>
          </DialogContent>
        </Box>
      )}
    </Dialog>
  );
};

export default AddPost;
