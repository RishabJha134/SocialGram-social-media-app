import { InputAdornment, TextField, IconButton } from "@mui/material";
import { useEffect, useState } from "react";
import { FaSearch, FaTimes } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useLazySearchUsersQuery } from "../../redux/service";
import { addToSearchedUsers } from "../../redux/slice";
import { Bounce, toast } from "react-toastify";

const SearchInput = () => {
  const { darkMode } = useSelector((state) => state.service);
  const [query, setQuery] = useState("");
  const [searchUser, searchUserData] = useLazySearchUsersQuery();  // Lazy query hook
  const dispatch = useDispatch();

  // Function to handle search on input change
  const handleSearch = async () => {
    if (query) {
      await searchUser(query); // Make API call with the query
    }
  };

  // Function to clear search input
  const clearSearch = () => {
    setQuery("");  // Clear the input field
    dispatch(addToSearchedUsers([]));  // Optionally clear the search results in redux
  };

  // Watch the success or error from the API and handle responses
  useEffect(() => {
    if (searchUserData.isSuccess) {
      dispatch(addToSearchedUsers(searchUserData.data.users)); // Store search result in redux
      toast.success(searchUserData.data.msg, {
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

    if (searchUserData.isError) {
      toast.error(searchUserData.error.data.msg, {
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
  }, [searchUserData.isSuccess, searchUserData.isError, dispatch]);

  return (
    <TextField
      sx={{
        width: "90%",
        maxWidth: "750px",
        boxShadow: "5px 5px 5px gray",
        borderRadius: "15px",
        px: 2,
        py: 1,
        my: 5,
        mx: "auto",
        "& .MuiOutlinedInput-root": {
          color: darkMode ? "whitesmoke" : "black",
          "& fieldset": {
            border: "none",
          },
        },
      }}
      placeholder="Search user..."
      InputProps={{
        startAdornment: (
          <InputAdornment
            position="start"
            sx={{
              color: darkMode ? "whitesmoke" : "black",
            }}
          >
            <FaSearch />
          </InputAdornment>
        ),
        endAdornment: (
          <InputAdornment position="end">
            <IconButton onClick={clearSearch} sx={{ padding: 0 }}>
              <FaTimes color={darkMode ? "whitesmoke" : "black"} />
            </IconButton>
          </InputAdornment>
        ),
      }}
      value={query}  // Binding the input value to the query state
      onChange={(e) => {
        setQuery(e.target.value);  // Update the query on every keystroke
        handleSearch();            // Trigger search immediately on input change
      }}
    />
  );
};

export default SearchInput;
