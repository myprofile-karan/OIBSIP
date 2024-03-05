import React from "react";
import Signup from "./pages/Signup";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Posts from "./pages/Posts";
import { Toaster } from "react-hot-toast";

const App = () => {
  return (
    <div className="">
      <BrowserRouter>
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/posts" element={<Posts />} />
        </Routes>
      </BrowserRouter>

      <Toaster />
    </div>
  );
};

export default App;
