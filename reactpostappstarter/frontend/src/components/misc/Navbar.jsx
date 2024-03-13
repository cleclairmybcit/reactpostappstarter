import React from "react";
import classes from "./Navbar.module.css";
import { Logo } from "../Layout/Logo";
import { Container, Group, Burger, Drawer, Stack } from "@mantine/core";
import useLinks from "./useLinks";
import { DrawerContext } from "../../Contexts/drawerContext";

const Navbar = () => {
  const { opened, toggle } = React.useContext(DrawerContext);
  const [items] = useLinks();

  return (
    <header className={classes.header}>
      <Container size="md" className={classes.inner}>
        <div className={classes.logo}>
          <Logo/>
        </div>
        <Group gap={5} visibleFrom="xs">
          {items.map((item, index) => (<div key={index}>{item}</div>))}
        </Group>
        <Burger hiddenFrom="xs" opened={opened} onClick={toggle} />
        <Drawer
          withCloseButton={true}
          opened={opened}
          size="100%"
          onClose={toggle}
        >
          <Stack>
            {items.map((item, index) => (<div key={index}>{item}</div>))}
          </Stack>
        </Drawer>
      </Container>
    </header>
  );
};

export default Navbar;
