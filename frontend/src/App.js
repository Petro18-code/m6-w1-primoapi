import React, { useEffect } from "react";
import NavBar from "./components/navbar/BlogNavbar";
import Footer from "./components/footer/Footer";
import Home from "./views/home/Home";
import Blog from "./views/blog/Blog";
import NewBlogPost from "./views/new/New";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { loadPosts} from "./data/fetch";
import AuthorContextProvider from "./context/AuthorContextProvider";
import NotFound from "./pages/NotFound";

function App() {
  // useEffect(()=> {
  //   loadAuthors().then((data => console.log(data)))
  // },[])
  useEffect(()=> {
    loadPosts().then((data => console.log(data)))
  },[])

  return (
    <AuthorContextProvider>
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" exact element={<Home />} />
        <Route path="/blog/:id" element={<Blog />} />
        <Route path="/new" element={<NewBlogPost />} />
        <Route path="/404" element={<NotFound />} />
        <Route path="/*" element={<Navigate to="/404" />}/>
        {/* <Route path="/blogPosts/:id" element={<SingleBlogPost />} /> */}
        {  /* <Route path="/authors" element={<AuthorList />} /> da creare */}
        {  /* <Route path="/authors/:id" element={<SingleAuthor />} /> da creare */}
      </Routes>
      <Footer />
    </Router>
    </AuthorContextProvider>
  );
}

export default App;