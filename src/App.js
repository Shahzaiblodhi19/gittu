import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"; // Import Routes instead of Switch
import 'bootstrap/dist/css/bootstrap.min.css';
import "./App.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Home from "./pages/Home"; // Import Home component
import Blogs from "./pages/blogs";
import CreateEditBlog from "./pages/createeditblog";
import EditBlog from "./pages/editblog";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/all-blogs" element={<Blogs />} />
        <Route path="/create-edit-blog" element={<CreateEditBlog />} />
        <Route path="/edit-blog/:id" element={<EditBlog />} />
      </Routes>
    </Router>
  );
};

export default App;
