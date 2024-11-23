// import {
//   Avatar,
//   Menu,
//   MenuItem,
//   Stack,
//   Typography,
//   useMediaQuery,
// } from "@mui/material";
// import { useEffect, useState } from "react";
// import { IoIosMore } from "react-icons/io";
// import { useSelector } from "react-redux";
// import {
//   useDeleteCommentMutation,
//   useSinglePostQuery,
// } from "../../redux/service";
// import { Bounce, toast } from "react-toastify";
// // import { Bounce, toast } from "react-toastify";
// // import { FaBedPulse } from "react-icons/fa6";

// const Comments = (data) => {
//   const { e, postId } = data;
//   const { darkMode, myInfo } = useSelector((state) => state.service);

//   const [anchorEl, setAnchorEl] = useState(null);
//   const [isAdmin, setIsAdmin] = useState();

//   const _700 = useMediaQuery("(min-width:700px)");

//   const [deleteComment, deleteCommentData] = useDeleteCommentMutation();
//   const { refetch } = useSinglePostQuery(postId && postId || "");

//   const handleClose = () => {
//     setAnchorEl(null);
//   };

//   const handleDeleteComment = async () => {
//     const info = {
//       postId,
//       id: e?._id,
//     };
//     await deleteComment(info);
//     handleClose();
//     refetch();
//   };

//   const checkIsAdmin = () => {
//     if (e && myInfo) {
//       if (e.admin._id === myInfo._id) {
//         setIsAdmin(true);
//         return;
//       }
//     }
//     setIsAdmin(false);
//   };

//   useEffect(() => {
//     checkIsAdmin();
//   }, []);

//   useEffect(() => {
//     if (deleteCommentData.isSuccess) {
//       // console.log("deleteCommentData.isSuccess" + deleteCommentData.isSuccess);
//       toast.success(deleteCommentData.data.msg, {
//         position: "top-center",
//         autoClose: 2500,
//         hideProgressBar: false,
//         closeOnClick: true,
//         pauseOnHover: true,
//         draggable: true,
//         theme: "colored",
//         transition: Bounce,
//       });
//     }
//     if (deleteCommentData.isError) {
//       // console.log("deleteCommentData.isError" + deleteCommentData.isError);
//       toast.error(deleteCommentData.error.data.msg, {
//         position: "top-center",
//         autoClose: 2500,
//         hideProgressBar: false,
//         closeOnClick: true,
//         pauseOnHover: true,
//         draggable: true,
//         theme: "colored",
//         transition: Bounce,
//       });
//     }
//   }, [deleteCommentData.isSuccess, deleteCommentData.isError]);

//   return (
//     <>
//       <Stack
//         flexDirection={"row"}
//         justifyContent={"space-between"}
//         px={2}
//         pb={4}
//         borderBottom={"1px solid gray"}
//         mx={"auto"}
//         width={"90%"}
//       >
//         <Stack flexDirection={"row"} gap={_700 ? 2 : 1}>
//           <Avatar
//             src={e ? e.admin.profilePic : ""}
//             alt={e ? e.admin.userName : ""}
//           />
//           <Stack flexDirection={"column"}>
//             <Typography variant="h6" fontWeight={"bold"} fontSize={"0.9rem"}>
//               {e ? e.admin.userName : ""}
//             </Typography>
//             <Typography variant="subtitle2" fontSize={"0.9rem"}>
//               {e ? e.text : ""}
//             </Typography>
//           </Stack>
//         </Stack>
//         <Stack
//           flexDirection={"row"}
//           gap={1}
//           alignItems={"center"}
//           color={darkMode ? "white" : "GrayText"}
//           fontSize={"0.9rem"}
//         >
//           <p>24min</p>
//           {isAdmin ? (
//             <IoIosMore
//               size={_700 ? 28 : 20}
//               className="image-icon"
//               onClick={(e) => setAnchorEl(e.currentTarget)}
//             />
//           ) : (
//             <IoIosMore size={_700 ? 28 : 20} className="image-icon" />
//           )}
//         </Stack>
//       </Stack>
//       <Menu
//         anchorEl={anchorEl}
//         open={anchorEl !== null ? true : false}
//         onClose={handleClose}
//         anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
//         transformOrigin={{ vertical: "top", horizontal: "right" }}
//       >
//         <MenuItem onClick={handleDeleteComment}>Delete</MenuItem>
//       </Menu>
//     </>
//   );
// };
// export default Comments;

import {
  Avatar,
  Menu,
  MenuItem,
  Stack,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { useEffect, useState } from "react";
import { IoIosMore } from "react-icons/io";
import { useSelector } from "react-redux";
import {
  useDeleteCommentMutation,
  useSinglePostQuery,
} from "../../redux/service";
import { Bounce, toast } from "react-toastify";
import { Link } from "react-router-dom";

const Comments = (data) => {
  const { e, postId } = data;
  const { darkMode, myInfo } = useSelector((state) => state.service);
  const [anchorEl, setAnchorEl] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const _700 = useMediaQuery("(min-width:700px)");
  const [deleteComment, deleteCommentData] = useDeleteCommentMutation();
  const { data: SinglePostData, refetch } = useSinglePostQuery(postId);

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDeleteComment = async () => {
    const info = {
      postId,
      id: e?._id,
    };
    await deleteComment(info);
    handleClose();
    refetch();
  };

  const calculateRelativeTime = (dateString) => {
    const postDate = new Date(dateString);
    const now = new Date();
    const differenceInSeconds = Math.floor((now - postDate) / 1000);

    if (differenceInSeconds < 60) return `${differenceInSeconds} seconds ago`;
    if (differenceInSeconds < 3600)
      return `${Math.floor(differenceInSeconds / 60)} minutes ago`;
    if (differenceInSeconds < 86400)
      return `${Math.floor(differenceInSeconds / 3600)} hours ago`;
    if (differenceInSeconds < 604800)
      return `${Math.floor(differenceInSeconds / 86400)} days ago`;
    return postDate.toLocaleDateString();
  };

  const checkIsAdmin = () => {
    if (e && myInfo) {
      if (e.admin._id === myInfo._id) {
        setIsAdmin(true);
        return;
      }
    }
    setIsAdmin(false);
  };

  useEffect(() => {
    checkIsAdmin();
  }, []);

  useEffect(() => {
    if (deleteCommentData.isSuccess) {
      toast.success(deleteCommentData.data.msg, {
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
    if (deleteCommentData.isError) {
      toast.error(deleteCommentData.error.data.msg, {
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
  }, [deleteCommentData.isSuccess, deleteCommentData.isError]);

  return (
    <>
      <div
        className={`p-4 ${
          darkMode ? "bg-[#1a1a1b] text-gray-200" : "bg-white text-gray-800"
        }`}
      >
        <div className="max-w-3xl mx-auto">
          <div
            className={`rounded p-2 ${
              darkMode ? "bg-[#272729]" : "bg-[#f5f5f5]"
            }`}
          >
            {/* Header */}
            <div className="flex justify-between gap-x-2 mb-2">
              <div>
                <Link
                  to={`/profile/threads/${SinglePostData?.post?.admin?._id}`}
                >
                  <div className="flex gap-x-4">
                    <img
                      src={
                        SinglePostData?.post?.admin
                          ? SinglePostData?.post?.admin.profilePic
                          : ""
                      }
                      alt={
                        SinglePostData?.post?.admin
                          ? SinglePostData.post.admin.userName
                          : ""
                      }
                      className="w-8 h-8 rounded-full"
                    />
                    <p className="text-[#4fbcff] hover:underline">
                      {SinglePostData?.post?.admin?.userName}
                    </p>
                  </div>
                </Link>

                <div className="mb-2">
                  <span className="text-sm font-bold">
                    {e ? e.admin.userName : ""}
                  </span>
                  <span className="mx-2 text-xs text-gray-500">
                    {calculateRelativeTime(e?.createdAt)}
                  </span>
                  <p className="text-sm mb-2">{e ? e.text : ""}</p>
                </div>
              </div>

              <div>
                {isAdmin ? (
                  <IoIosMore
                    size={_700 ? 28 : 20}
                    className="image-icon cursor-pointer"
                    onClick={(e) => setAnchorEl(e.currentTarget)}
                  />
                ) : (
                  <IoIosMore size={_700 ? 28 : 20} className="image-icon" />
                )}

                <Menu
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl)}
                  onClose={handleClose}
                  anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                  transformOrigin={{ vertical: "top", horizontal: "right" }}
                >
                  <MenuItem onClick={handleDeleteComment}>Delete</MenuItem>
                </Menu>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Comments;
