import { TextInput, Button, Group, Box } from "@mantine/core";
import DOMAIN from "../../services/endpoint";
import axios from "axios";
import { useForm } from "@mantine/form";
import { useLoaderData } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function EditPostPage() {
  const post = useLoaderData();
  console.log(post);
  const navigate = useNavigate();
  const form = useForm({
    initialValues: {
      title: post.data.title,
      category: post.data.category,
      image: post.data.image,
      content: post.data.content,
    },
  });

  const handleSubmit = async (values) => {
    values.id = post.data.id;
    const res = await axios.put(`${DOMAIN}/api/posts`, values);
    
    if (res?.data.success) {
      navigate(`/posts/${post.data.id}`);
    }
  };

  return (
    <Box maw={300} mx="auto">
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <TextInput
          label="Title"
          placeholder="Enter a Title"
          value={post.data.title}
          {...form.getInputProps("title")}
        />
        <TextInput
          label="Content"
          placeholder="Enter some content"
          value={post.data.content}
          {...form.getInputProps("content")}
        />
        <TextInput
          label="Category"
          placeholder="Enter a Category"
          value={post.data.category}
          {...form.getInputProps("category")}
        />
        <TextInput
          label="Image"
          placeholder="Enter an Image"
          value={post.data.image}
          {...form.getInputProps("image")}
        />
        <Group position="right" mt="md">
          <Button type="submit">Update</Button>
        </Group>
      </form>
    </Box>
  );
}

export const postDetailsLoader = async ({ params }) => {
  return await axios.get(`${DOMAIN}/api/posts/${params.id}`);
};

export default EditPostPage;
