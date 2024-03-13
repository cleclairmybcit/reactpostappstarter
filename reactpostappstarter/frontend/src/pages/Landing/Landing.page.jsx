import classes from "./Landing.page.module.css";
import { Container } from "@mantine/core";

const Landing = () => {
  return (
    <Container>
      <h2>Welcome to PhotokEHs!</h2>
      <img className={classes.hero} src="inside.png" alt="My PNG Image" />
      <p>If you’re passionate about photography and want a dedicated platform to store, organize, and showcase your precious memories, let me introduce you to PhotokEHs:</p>
      <p>PhotokEHs is a cutting-edge photo storage and sharing website designed for both amateur and professional photographers. Here’s why you’ll love it:</p>
      <ul>
        <li><strong>Secure Cloud Storage:</strong> PhotokEHs ensures the safety of your images by securely storing them in the cloud. Say goodbye to worries about losing your cherished photos.</li>
        <li><strong>Intuitive Organization:</strong> With PhotokEHs, you can easily create albums, tag photos, and arrange them in a way that makes sense to you. Whether it’s family vacations, landscapes, or pet portraits, everything stays neatly organized.</li>
        <li><strong>Rich Descriptions:</strong> PhotokEHs encourages storytelling. For each photo, you can add detailed descriptions, notes, and even anecdotes. Share the backstory behind that breathtaking sunset or the candid moment captured at a family reunion.</li>
        <li><strong>Privacy Controls:</strong> Worried about who sees your photos? PhotokEHs lets you control privacy settings for individual images. Share publicly, with friends, or keep them entirely private—it’s up to you.</li>
        <li><strong>Community Engagement:</strong> Connect with fellow photographers, exchange tips, and appreciate each other’s work. PhotokEHs fosters a vibrant community where creativity thrives.</li>
      </ul>				
      <p>So, whether you’re a shutterbug, a travel enthusiast, or simply someone who loves preserving memories, PhotokEHs is your canvas to showcase the beauty of life through your lens. 📸✨</p>
    </Container>
  );
};

export default Landing;
