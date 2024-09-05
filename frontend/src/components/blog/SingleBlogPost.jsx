import React, { useEffect, useState } from "react";
import { Container, Image } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import BlogAuthor from "./blog-author/BlogAuthor";
// import BlogLike from "../likes/BlogLike";
// import posts from "../../data/posts.json";


const SingleBlogPost = (props) => {
    const { post, title, cover, author, _id } = props;
    const params = useParams();
    const navigate = useNavigate();

    return(
        <Container>
          <Image className="blog-details-cover" src={cover} fluid />
          <h1 className="blog-details-title">{title}</h1>

          <div className="blog-details-container">
            <div className="blog-details-author">
              <BlogAuthor {...author} />
            </div>
            <div className="blog-details-info">
              {/* <div>{createdAt}</div> */}
              {/* <div>{`lettura da ${readTime.value} ${readTime.unit}`}</div> */}
              <div
                style={{
                  marginTop: 20,
                }}
              >
                   </div>
            </div>
          </div>
        </Container>
    )
}

export default SingleBlogPost;