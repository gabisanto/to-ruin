import * as React from "react";
import { useState, useEffect } from "react";
import styles from "../styles/simplePages.module.css";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { sendLogoutRequest } from "../store/user";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import {
  Favorite,
  AccountCircle,
  Login,
  Logout,
  HowToReg,
  Home,
} from "@mui/icons-material";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { makeStyles } from "@mui/styles";
import { useTheme } from "@mui/material/styles";

/* styles for the drawer */

const useStyles = makeStyles(() => {
  return {
    drawerPaper: {
      width: 240,
      backgroundColor: "#5b5c5e",
      paddingTop: 90,
      color: "white",
    },
  };
});

export default function TemporaryDrawer({ openStatus, stateChanger, user }) {
  /* configuration to make the drawer work */
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const theme = useTheme();
  const classes = useStyles(theme);
  const [openDrawer, setOpenDrawer] = useState({
    left: false,
  });

  useEffect(() => {
    setOpenDrawer({ left: openStatus });
  }, [openStatus]);

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setOpenDrawer({ [anchor]: open });
    stateChanger(open);
  };

  /* handling logout since it's one of the options of the drawer */
  const handleLogout = function () {
    navigate("/");

    dispatch(sendLogoutRequest())
      .then(() => {
        window.localStorage.clear();
      })
      .catch((err) => console.log("Ocurrió un error", err));
  };

  /* drawer options */
  const list = (anchor) => (
    <Box sx={{ width: 250 }}>
      {!user.id ? (
        <List>
          <Link to="/" className={styles.links}>
            <ListItem sx={{ paddingLeft: 5, "&:hover": { cursor: "pointer" } }}>
              <ListItemIcon sx={{ color: "white" }}>
                <Home />
              </ListItemIcon>
              <ListItemText
                primary={"Home"}
                sx={{ textDecorarion: "none", color: "white" }}
              />
            </ListItem>
          </Link>
          <Link to="/login" className={styles.links}>
            <ListItem sx={{ paddingLeft: 5, "&:hover": { cursor: "pointer" } }}>
              <ListItemIcon sx={{ color: "white" }}>
                <Login />
              </ListItemIcon>
              <ListItemText
                primary={"Login"}
                sx={{ textDecorarion: "none", color: "white" }}
              />
            </ListItem>
          </Link>
          <Link to="/register" className={styles.links}>
            <ListItem sx={{ paddingLeft: 5, "&:hover": { cursor: "pointer" } }}>
              <ListItemIcon sx={{ color: "white" }}>
                <HowToReg />
              </ListItemIcon>
              <ListItemText
                sx={{ textDecorarion: "none", color: "white" }}
                primary={"Register"}
              />
            </ListItem>
          </Link>
        </List>
      ) : (
        <List>
          <Link to="/" className={styles.links}>
            <ListItem sx={{ paddingLeft: 5, "&:hover": { cursor: "pointer" } }}>
              <ListItemIcon sx={{ color: "white" }}>
                <Home />
              </ListItemIcon>
              <ListItemText
                primary={"Home"}
                sx={{ textDecorarion: "none", color: "white" }}
              />
            </ListItem>
          </Link>
          <Link to="/favorites" className={styles.links}>
            <ListItem sx={{ paddingLeft: 5, "&:hover": { cursor: "pointer" } }}>
              <ListItemIcon sx={{ color: "white" }}>
                <Favorite />
              </ListItemIcon>
              <ListItemText
                primary={"My favorites"}
                sx={{ textDecorarion: "none", color: "white" }}
              />
            </ListItem>
          </Link>
          <Link to="/profile" className={styles.links}>
            <ListItem sx={{ paddingLeft: 5, "&:hover": { cursor: "pointer" } }}>
              <ListItemIcon sx={{ color: "white" }}>
                <AccountCircle />
              </ListItemIcon>
              <ListItemText
                primary={"Profile"}
                sx={{ textDecorarion: "none", color: "white" }}
              />
            </ListItem>
          </Link>
          <ListItem
            sx={{ paddingLeft: 5, "&:hover": { cursor: "pointer" } }}
            onClick={handleLogout}
          >
            <ListItemIcon sx={{ color: "white" }}>
              <Logout />
            </ListItemIcon>
            <ListItemText primary={"Logout"} />
          </ListItem>
        </List>
      )}
    </Box>
  );

  return (
    <div>
      <Drawer
        anchor={"left"}
        open={openDrawer["left"]}
        onClose={toggleDrawer("left", false)}
        /* className={classes.drawer} */
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        {list("left")}
      </Drawer>
    </div>
  );
}
