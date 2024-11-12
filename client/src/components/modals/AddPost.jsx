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
import { useRef, useState } from "react";
import { FaImages } from "react-icons/fa6";
import { RxCross2 } from "react-icons/rx";

const AddPost = () => {
  const _700 = useMediaQuery("(min-width:700px)");
  const _300 = useMediaQuery("(min-width:300px)");
  const _500 = useMediaQuery("(min-width:500px)");

  const [text, setText] = useState();
  const [media, setMedia] = useState();
  const mediaRef = useRef();
  function handleClose() {}
  function handleMediaRef() {
    console.log("hello world!");
    console.log(mediaRef.current);
    mediaRef.current.click();
  }
  function handlePost() {}
  return (
    <>
      <Dialog
        open={true}
        onClose={handleClose}
        fullWidth
        fullScreen={_700 ? false : true}
      >
        <Box position={"absolute"} top={20} right={20} onclick={handleClose}>
          <RxCross2 size={28} className="image-icon"></RxCross2>
        </Box>

        <DialogTitle textAlign={"center"} mb={5}>
          New Thread...
        </DialogTitle>

        <DialogContent>
          <Stack flexDirection={"row"} gap={2} mb={5}>
            <Avatar src="" alt=""></Avatar>
            <Stack>
              <Typography variant="h6" fontWeight={"bold"} fontSize={"1rem"}>
                HELLO WORLD
              </Typography>
              <textarea
                cols={_500 ? "40" : "25"}
                rows="2"
                className="text1"
                placeholder="Start a Thread..."
                autoFocus
                onChange={(e) => setText(e.target.value)}
              ></textarea>
              {media ? (
                <img
                  src={URL.createObjectURL(media)}
                  alt=""
                  id="url-img"
                  width={_500 ? 300 : _300 ? 200 : 100}
                  height={_500 ? 300 : _300 ? 200 : 100}
                />
              ) : null}
              <FaImages
                size={28}
                className="image-icon"
                onClick={() => handleMediaRef()}
              />

              <input
                type="file"
                accept="image/*"
                className="file-input"
                ref={mediaRef}
                onChange={(e) => setMedia(e.target.files[0])}
              />
            </Stack>
          </Stack>
          <Stack
            flexDirection={"row"}
            justifyContent={"space-between"}
            alignItems={"center"}
          >
            <Typography variant="h6" fontSize={"1rem"} color={"gray"}>
              Anyone can reply
            </Typography>
            <Button
              size="large"
              sx={{
                bgcolor: "GrayText",
                color: "white",
                borderRadius: "10px",
                ":hover": {
                  bgcolor: "gray",
                  cursor: "pointer",
                },
              }}
              onClick={handlePost}
            >
              Post
            </Button>
          </Stack>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AddPost;
