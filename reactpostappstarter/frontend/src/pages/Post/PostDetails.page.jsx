import useBoundStore from "../../store/Store";
import { Link } from "react-router-dom";
import DOMAIN from "../../services/endpoint";
import axios from "axios";
import { Button, Container, Paper, Text, Group, Image } from "@mantine/core";
import { useLoaderData } from "react-router-dom";
import classes from "./PostDetails.page.module.css";

function PostDetailsPage() {
  const user = useBoundStore((state) => state.user);
  const post = useLoaderData();
  const edit = Number(user.id) === Number(post.data.userId);
  const uri = `/posts/edit/${post.data.id}`;
  const editButton = <Button><Link to={uri}>Edit</Link></Button>
  return (
    <>
      <Container>
        <Group className={classes.columns} shadow="md" p={10} mt={10} radius="md">
          <Paper className={classes.group} >
            <Text>
              <strong>Author:</strong> {post.data.author}
            </Text>
            <Text>
              <strong>Title:</strong> {post.data.title}
            </Text>
            <Text>
              <strong>Category:</strong> {post.data.category}
            </Text>
            <Text>
              {post.data.content}
            </Text>
              { edit ? editButton : null}    
          </Paper>
          <Image
            className={classes.image}
            radius="md"
            src={post.data.image}
            alt={post.data.title}
          />
        </Group>
      </Container>
    </>
  );
}

export const postDetailsLoader = async ({ params }) => {
  return await axios.get(`${DOMAIN}/api/posts/${params.id}`);
};

export default PostDetailsPage;
