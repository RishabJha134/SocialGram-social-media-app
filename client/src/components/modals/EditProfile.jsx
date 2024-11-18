import {
  Avatar,
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Stack,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { RxCross2 } from "react-icons/rx";
import { useDispatch, useSelector } from "react-redux";
import { editProfileModel } from "../../redux/slice";
import {
  useUpdateProfileMutation,
  useUserDetailsQuery,
} from "../../redux/service";
import Loading from "./../common/Loading";
import { useParams } from "react-router-dom";
import { Bounce, toast } from "react-toastify";

const EditProfile = () => {
  const _700 = useMediaQuery("(min-width:700px)");
  const { openEditProfileModel, myInfo } = useSelector(
    (state) => state.service
  );
  const dispatch = useDispatch();
  const [pic, setPic] = useState();
  const [bio, setBio] = useState();

  const params = useParams();

  const imgRef = useRef();

  const [updateProfile, updateProfileData] = useUpdateProfileMutation();
  console.log(params?.id);
  const { refetch } = useUserDetailsQuery(params?.id);

  const handlePhoto = () => {
    imgRef.current.click();
  };
  const handleClose = () => {
    dispatch(editProfileModel(false));
  };
  const handleUpdate = async () => {
    if (pic || bio) {
      const data = new FormData();

      if (bio) {
        data.append("text", bio);
      }
      if (pic) {
        data.append("media", pic);
      }
      console.log(data);
      await updateProfile(data);
    }
    dispatch(editProfileModel(false));
  };

  useEffect(() => {
    if (updateProfileData.isSuccess) {
      // console.log("Profile updated successfully");
      refetch();
      toast.success(updateProfileData.data.msg, {
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
    if (updateProfileData.isError) {
      // console.log("Profile update error");
      toast.error(updateProfileData.error.data.msg, {
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
  }, [updateProfileData.isError, updateProfileData.isSuccess]);

  return (
    <>
      <Dialog
        open={openEditProfileModel}
        onClose={handleClose}
        fullWidth
        fullScreen={_700 ? false : true}
      >
        {updateProfileData.isLoading ? (
          <Stack height={"60vh"}>
            <Loading></Loading>
          </Stack>
        ) : (
          <>
            <Box position={"absolute"} top={20} right={20}>
              <RxCross2
                onClick={handleClose}
                size={28}
                className="image-icon"
              ></RxCross2>
            </Box>
            <DialogTitle textAlign={"center"} mb={5}>
              Edit Profile
            </DialogTitle>
            <DialogContent>
              <Stack flexDirection={"column"} gap={1}>
                <Avatar
                  src={
                    pic
                      ? URL.createObjectURL(pic)
                      : myInfo
                      ? myInfo.profilePic
                      : ""
                  }
                  alt={myInfo ? myInfo.userName : ""}
                  sx={{
                    width: 96,
                    height: 96,
                    alignSelf: "center",
                  }}
                ></Avatar>
                <Button
                  size="large"
                  sx={{
                    border: "2px solid gray",
                    borderRadius: "10px",
                    width: 96,
                    height: 40,
                    alignSelf: "center",
                    my: 2,
                    ":hover": {
                      cursor: "pointer",
                    },
                  }}
                  onClick={handlePhoto}
                >
                  Change
                </Button>
                <input
                  type="file"
                  className="file-input"
                  accept="image/*"
                  ref={imgRef}
                  onChange={(e) => setPic(e.target.files[0])}
                ></input>
                <Typography
                  variant="subtitle1"
                  fontWeight={"bold"}
                  fontSize={"1.2rem"}
                  my={2}
                >
                  username
                </Typography>
                <input
                  type="text"
                  value={myInfo ? myInfo.userName : ""}
                  readOnly
                  className="text1"
                ></input>
              </Stack>
              <Stack flexDirection={"column"} gap={1}>
                <Typography
                  variant="subtitle1"
                  fontWeight={"bold"}
                  fontSize={"1.2rem"}
                  my={2}
                >
                  Email
                </Typography>
                <input
                  type="text"
                  value={myInfo ? myInfo.email : ""}
                  readOnly
                  className="text1"
                ></input>
              </Stack>
              <Stack flexDirection={"column"} gap={1}>
                <Typography
                  variant="subtitle1"
                  fontWeight={"bold"}
                  fontSize={"1.2rem"}
                  my={2}
                >
                  Bio
                </Typography>
                <input
                  type="text"
                  className="text1"
                  placeholder={myInfo ? myInfo.bio : ""}
                  value={bio ? bio : ""}
                  onChange={(e) => setBio(e.target.value)}
                ></input>
              </Stack>
              <Button
                size="large"
                sx={{
                  border: "2px solid gray",
                  borderRadius: "10px",
                  bgcolor: "GrayText",
                  color: "white",
                  width: "100%",
                  my: 2,
                  fontSize: "1.2rem",
                  ":hover": {
                    cursor: "pointer",
                    bgcolor: "gray",
                  },
                }}
                onClick={handleUpdate}
              >
                Update
              </Button>
            </DialogContent>
          </>
        )}
      </Dialog>
    </>
  );
};

export default EditProfile;
