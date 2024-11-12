import { Stack, useMediaQuery } from '@mui/material'
import React from 'react'
import Post from '../../../components/home/Post'

const Repost = () => {
  const _700 = useMediaQuery("(min-width:700px)");

  return (
    <>
    <Stack
      flexDirection={"column"}
      gap={2}
      mb={10}
      width={_700?"800px":"90%"}
      mx={"auto"}
    >
      <Post></Post>
      <Post></Post>
      <Post></Post>
      <Post></Post>
    </Stack>
  </>
  )
}

export default Repost