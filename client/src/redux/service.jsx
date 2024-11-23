import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  addMyInfo,
  addSingle,
  addToAllPost,
  addUser,
  deleteThePost,
} from "./slice";

export const serviceApi = createApi({
  reducerPath: "serviceApi",
  baseQuery: fetchBaseQuery({
    // mode:"no-cors",
    baseUrl:
      // "https://socialgram-social-media-app-production.up.railway.app/api/v1",
      // "http://localhost:5000/api/v1",
      "https://socialgram-social-media-app-production.up.railway.app/api/v1",
    credentials: "include", // for using the cookies
  }),
  keepUnusedDataFor: 60 * 60 * 24 * 7, // Cache data for 1 week
  tagTypes: ["Post", "User", "Me"], // Define tag types to track cache
  endpoints: (builder) => ({
    signin: builder.mutation({
      query: (data) => ({
        url: "signin",
        method: "POST",
        body: data,
      }),
      // Invalidate "Me" tag to clear the cached data related to the user after signin
      invalidateTags: ["Me"],
    }),
    login: builder.mutation({
      query: (data) => ({
        url: "login",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Me"],
    }),
    myInfo: builder.query({
      query: () => ({
        url: "me",
        method: "GET",
      }),
      providesTags: ["Me"],
      async onQueryStarted(params, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          // console.log("after pressing logout" + data);
          dispatch(addMyInfo(data));
        } catch (err) {
          dispatch(addMyInfo(null));
          // console.log(err);
        }
      },
    }),
    logoutMe: builder.mutation({
      query: () => ({
        url: "logout",
        method: "POST",
      }),
      invalidatesTags: ["Me"],
    }),

    userDetails: builder.query({
      query: (id) => ({
        url: `user/${id}`,
        method: "GET",
      }),
      providesTags: ["User"],
      // providesTags: (result, error, { id }) => [{ type: "User", id }],
      async onQueryStarted(params, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          // console.log(data);
          dispatch(addUser(data));
          // console.log(data);
        } catch (err) {
          // console.log(err);
        }
      },
    }),

    searchUsers: builder.query({
      query: (query) => ({
        url: `users/search/${query}`,
        method: "GET",
      }),
    }),
    followUser: builder.mutation({
      query: (id) => ({
        url: `user/follow/${id}`,
        method: "PUT",
      }),
      invalidatesTags: (result, error, { id }) => [{ type: "User", id }],
    }),

    updateProfile: builder.mutation({
      query: (data) => ({
        url: "update",
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Me"],
    }),

    addPost: builder.mutation({
      query: (data) => ({
        url: "post",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Post"],
      async onQueryStarted(params, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          // console.log("after adding post" + data);
          dispatch(addSingle(data));
        } catch (err) {
          // console.log(err);
        }
      },
    }),

    allPost: builder.query({
      query: (page) => ({
        url: `post?page=${page}`,
        method: "GET",
      }),
      providesTags: (result, error, args) => {
        return result
          ? [
              ...result.posts.map(({ _id }) => ({
                type: "Post",
                id: _id,
              })),
              { type: "Post", id: "LIST" },
            ]
          : [{ type: "Post", id: "LIST" }];
      },
      async onQueryStarted(params, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          // console.log("all post data " + data);
          dispatch(addToAllPost(data));
          // console.log(data);
        } catch (err) {
          // console.log(err);
        }
      },
    }),

    deletePost: builder.mutation({
      query: (id) => ({
        url: `post/${id}`,
        method: "DELETE",
      }),
      // jab bhi dispatch karna hoga toh yeh line likhna zaroori hai:-
      async onQueryStarted(params, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(deleteThePost(data));
        } catch (err) {
          // console.log(err);
        }
      },
    }),
    likePost: builder.mutation({
      query: (id) => ({
        url: `post/like/${id}`,
        method: "PUT",
      }),
      invalidatesTags: (result, error, { id }) => [
        {
          type: "Post",
          id,
        },
      ],
    }),
    singlePost: builder.query({
      query: (id) => ({
        url: `post/${id}`,
        method: "GET",
      }),
      providesTags: (result, error, { id }) => [
        {
          type: "Post",
          id,
        },
      ],
    }),
    repost: builder.mutation({
      query: (id) => ({
        url: `repost/${id}`,
        method: "PUT",
      }),
      invalidatesTags: ["User"],
    }),
    addComment: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `comment/${id}`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["User"],
    }),
    deleteComment: builder.mutation({
      query: ({ postId, id }) => ({
        url: `comment/${postId}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, { postId }) => [
        {
          type: "Post",
          id: postId,
        },
      ],
    }),
  }),
});

export const {
  useSigninMutation,
  useLoginMutation,
  useMyInfoQuery,
  useLogoutMeMutation,
  useUserDetailsQuery,
  useAllPostQuery,
  // useSearchUsersQuery,
  useLazySearchUsersQuery, // jab hume kisi event par is query ko run karna ho.
  useFollowUserMutation,
  useAddCommentMutation,
  useDeleteCommentMutation,
  useDeletePostMutation,
  useLikePostMutation,
  useSinglePostQuery,
  useRepostMutation,
  useUpdateProfileMutation,
  useAddPostMutation,
} = serviceApi;

// Pessimistic update: When you make an update after the query is fulfilled, that's considered a pessimistic update.

// builder.query-> get request,provideTags.
// builder.mutation-> put,patch,post request,invalidateTags.
