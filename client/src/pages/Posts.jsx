import axios from "axios";
import React, { useState, useEffect } from "react";
import PostCard from "../components/PostCard";
import Loader from "../components/Loader";
import InfiniteScroll from "react-infinite-scroll-component";

const Posts = () => {
  const [postData, setPostData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const fetchMoreData = async () => {
    if (postData.length >= 500) {
      setHasMore(false);
      return;
    }

    try {
      const response = await axios.get("http://localhost:3001/posts");
      setPostData((prevData) => prevData.concat(response.data));
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        const response = await axios.get("http://localhost:3001/posts");
        setPostData(response.data);
        console.log(response);
      } catch (error) {
        console.log(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  return (
    <div className="bg-gradient-to-br from-purple-300 to-blue-300">
      <header className="bg-gradient-to-br from-purple-700 font-serif to-blue-700 py-4 px-10">
        <h1 className="text-white text-3xl font-bold text-center">POSTS</h1>
      </header>
      {loading ? (
        <Loader />
      ) : (
        <InfiniteScroll
          dataLength={postData.length}
          next={fetchMoreData}
          hasMore={hasMore}
          loader={<Loader />}
          height={610}
          endMessage={
            <p style={{ textAlign: "center" }}>
              <b>Yay! You have seen it all</b>
            </p>
          }
        >
          {postData.map((post, index) => (
            <div key={index} className="my-28 flex justify-center">
              <PostCard
                id={post.id}
                tags={post.tags}
                title={post.title}
                body={post.body}
                reactions={post.reactions}
              />
            </div>
          ))}
        </InfiniteScroll>
      )}
    </div>
  );
};

export default Posts;
