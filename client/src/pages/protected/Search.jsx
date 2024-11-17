import SearchInput from "../../components/search/SearchInput";
import { Stack } from "@mui/material";
import ProfileBar from "../../components/search/ProfileBar";
import { useSelector } from "react-redux";

const Search = () => {
  const { searchedUsers } = useSelector((state) => state.services);
  console.log("searchedUsers" + searchedUsers);
  return (
    <>
      <SearchInput></SearchInput>
      <Stack
        flexDirection={"column"}
        gap={1}
        mb={5}
        width={"90%"}
        maxWidth={"750px"}
        mx={"auto"}
      >
        {searchedUsers
          ? searchedUsers.length > 0
            ? searchedUsers.map((e) => {
                return <ProfileBar key={e._id} e={e}></ProfileBar>;
              })
            : ""
          : ""}
      </Stack>
    </>
  );
};

export default Search;
