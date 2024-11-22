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
  const { refetch } = useUserDetailsQuery(params?.id || "");

  const handlePhoto = () => {
    imgRef.current.click();
  };
  const handleClose = () => {
    dispatch(editProfileModel(false));
  };
  const handleUpdate = async () => {
    if (pic || bio) {
      const data = new FormData();
      if (bio) data.append("text", bio);
      if (pic) data.append("media", pic);
      await updateProfile(data);
    }
    dispatch(editProfileModel(false));
  };

  useEffect(() => {
    if (updateProfileData.isSuccess) {
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
      toast.error(updateProfileData?.error?.data?.msg, {
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
        fullScreen={!_700}
        sx={{
          "& .MuiDialogTitle-root": {
            fontFamily: "'Poppins', sans-serif",
            fontWeight: "600",
            fontSize: "1.5rem",
            color: "#333",
          },
        }}
      >
        {updateProfileData.isLoading ? (
          <Stack height={"60vh"} justifyContent="center" alignItems="center">
            <Loading />
          </Stack>
        ) : (
          <>
            <Box position="absolute" top={5} right={5}>
              <RxCross2
                onClick={handleClose}
                size={28}
                className="cursor-pointer text-gray-600 hover:text-gray-800 transition duration-300"
              />
            </Box>
            <DialogTitle textAlign="center" mb={3}>
              <Typography variant="h5">Edit Profile</Typography>
            </DialogTitle>
            <DialogContent>
              <Stack flexDirection="column" gap={3} p={3}>
                {/* Avatar Section */}
                <Box className="flex flex-col justify-center items-center gap-2">
                  <Avatar
                    src={
                      pic ? URL.createObjectURL(pic) : myInfo?.profilePic || ""
                    }
                    alt={myInfo?.userName || "User"}
                    sx={{
                      width: 96,
                      height: 96,
                      borderRadius: "50%",
                      boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
                      transition: "transform 0.3s ease-in-out",
                      "&:hover": {
                        transform: "scale(1.1)",
                      },
                    }}
                  />
                  <Button
                    size="large"
                    sx={{
                      border: "2px solid #4B5563",
                      borderRadius: "12px",
                      width: 96,
                      height: 40,
                      my: 2,
                      color: "#6D28D9",
                      ":hover": {
                        borderColor: "#6D28D9",
                        backgroundColor: "#6D28D9",
                        color: "#fff",
                      },
                    }}
                    onClick={handlePhoto}
                  >
                    Change
                  </Button>
                  <input
                    type="file"
                    className="hidden"
                    accept="image/*"
                    ref={imgRef}
                    onChange={(e) => setPic(e.target.files[0])}
                  />
                </Box>

                {/* Username Field */}
                <Box>
                  <Typography
                    variant="subtitle1"
                    fontWeight="bold"
                    color="textSecondary"
                  >
                    Username
                  </Typography>
                  <input
                    type="text"
                    value={myInfo?.userName || ""}
                    readOnly
                    className="w-full p-3 bg-gray-100 border border-gray-300 rounded-md text-gray-700"
                  />
                </Box>

                {/* Email Field */}
                <Box>
                  <Typography
                    variant="subtitle1"
                    fontWeight="bold"
                    color="textSecondary"
                  >
                    Email
                  </Typography>
                  <input
                    type="text"
                    value={myInfo?.email || ""}
                    readOnly
                    className="w-full p-3 bg-gray-100 border border-gray-300 rounded-md text-gray-700"
                  />
                </Box>

                {/* Bio Field */}
                <Box>
                  <Typography
                    variant="subtitle1"
                    fontWeight="bold"
                    color="textSecondary"
                  >
                    Bio
                  </Typography>
                  <input
                    type="text"
                    placeholder={"Add a bio..."}
                    value={bio || ""}
                    onChange={(e) => setBio(e.target.value)}
                    className="w-full p-3 bg-gray-100 border border-gray-300 rounded-md text-gray-700"
                  />
                </Box>

                {/* Update Button */}
                <Button
                  size="large"
                  sx={{
                    border: "2px solid #4B5563",
                    borderRadius: "12px",
                    width: "100%",
                    my: 3,
                    bgcolor: "white",
                    color: "#6D28D9",
                    fontSize: "1.1rem",
                    ":hover": {
                      bgcolor: "#6D28D9",
                      color: "white",
                    },
                  }}
                  onClick={handleUpdate}
                >
                  Update
                </Button>
              </Stack>
            </DialogContent>
          </>
        )}
      </Dialog>
    </>
  );
};

export default EditProfile;
