import React from "react";
import SearchInput from "../../components/search/SearchInput";
import { Stack } from "@mui/material";
import ProfileBar from "../../components/search/ProfileBar";

const Search = () => {
  return (
    <>
      <SearchInput></SearchInput>
      <Stack flexDirection={"column"} gap={1} mb={5} width={"90%"} maxWidth={"750px"}  mx={"auto"}  >
        <ProfileBar />
        <ProfileBar />
        <ProfileBar />
        <ProfileBar />
        <ProfileBar />
       
      </Stack>
    </>
  );
};

export default Search;

