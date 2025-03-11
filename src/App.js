import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"; // Import Routes instead of Switch
import 'bootstrap/dist/css/bootstrap.min.css';
import "./App.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Home from "./pages/Home"; // Import Home component
import Blogs from "./pages/blogs";
import CreateEditBlog from "./pages/createeditblog";
import EditBlog from "./pages/editblog";
import ViewBlog from "./pages/view-blog";

const App = () => {
  const adminAddress = '3CLc2511wqVpJVwN5g2s5ZEcGK5ZwymKJvrHABcC5Ewe';
  const [walletAddress, setWalletAddress] = useState(null);

  // Retrieve wallet address from localStorage on component mount
  useEffect(() => {
    const storedWalletAddress = localStorage.getItem("walletAddress");
    if (storedWalletAddress) {
      setWalletAddress(storedWalletAddress);  // Set state with the wallet address from localStorage
    }
  }, []);
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        {/* {adminAddress === walletAddress ? <Route path="/all-blogs" element={<Blogs />} /> : ''} */}
        <Route path="/all-blogs" element={<Blogs />} />
        {/* {adminAddress === walletAddress ? <Route path="/create-edit-blog" element={<CreateEditBlog />} /> : ''} */}
        <Route path="/create-edit-blog" element={<CreateEditBlog />} />
        {/* {adminAddress === walletAddress ? <Route path="/edit-blog/:id" element={<EditBlog />} /> : ''} */}
        <Route path="/edit-blog/:id" element={<EditBlog />} />

        <Route path="/view-blog/:id" element={<ViewBlog />} />
      </Routes>
    </Router>
  );
};

export default App;
