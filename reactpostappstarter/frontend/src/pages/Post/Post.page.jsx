import DOMAIN from "../../services/endpoint";
import axios from "axios";
import { ArticleCardImage } from "../../components/misc/ArticleCardImage";
import { SimpleGrid, Container, Loader } from "@mantine/core";
import { useAsyncValue, Await } from "react-router-dom";
import React from 'react';

export const PostPage = () => {
  return (
    <React.Suspense
      fallback={<Loader/>}
    >
      <Await
        resolve={axios.get(`${DOMAIN}/api/posts`)}
        errorElement={
          <p>Error loading package location!</p>
        }
      >
        <AsyncContainer />
      </Await>
    </React.Suspense>
  );
};

function AsyncContainer() {
  const response = useAsyncValue();
  return (
    <Container>
      <SimpleGrid cols={3}>
        {response.data?.map((post) => (
          <ArticleCardImage key={post.title} {...post} />
        ))}
      </SimpleGrid>
    </Container>
  );
}

export const postsLoader = async () => {
  axios.get(`${DOMAIN}/api/posts`);
};
