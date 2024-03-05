import React from "react";

const PostCard = (props) => {
  return (
    <div
      key={props.id}
      className="rounded-xl border p-5 shadow-lg w-9/12 bg-gradient-to-br from-purple-400 to-blue-400"
    >
      <div className="flex w-full items-center justify-between border-b pb-3">
        <div className="flex items-center space-x-3">
          <img
            src="./assets/userImg.png"
            className="w-12 h-12 rounded-full border-2 border-white"
            alt="User Avatar"
          />
          <div className="text-lg font-bold text-indigo-800">User</div>
        </div>
        <div className="flex items-center space-x-8">
          <div className="text-xs text-gray-500">
            {Math.floor(Math.random() * 11)} hours ago
          </div>
        </div>
      </div>

      <div className="mt-4 mb-6">
        <div className="mb-3 text-2xl font-bold text-white">{props.title}</div>
        <div className="text-sm text-gray-800">{props.body}</div>
      </div>

      <div>
        <div className="flex items-center justify-between text-blue-600">
          <div className="flex space-x-4 md:space-x-8">
            <div className="flex cursor-pointer items-center transition hover:text-blue-700">
              <img
                src="./assets/comment.svg"
                className="w-8 mr-3"
                alt="Comment Icon"
              />
              <span className="text-lg">{Math.floor(Math.random() * 100)}</span>
            </div>
            <div className="flex cursor-pointer items-center transition hover:text-blue-700">
              <img
                src="./assets/like.svg"
                className="w-8 mr-2"
                alt="Like Icon"
              />
              <span className="text-lg">{props.reactions}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
