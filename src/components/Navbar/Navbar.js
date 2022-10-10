import React, { useState } from "react";
import { AppBar, Avatar, Box, Menu, MenuItem, Stack, Toolbar, Typography } from "@mui/material";
import LiveTvIcon from "@mui/icons-material/LiveTv";
import UserContext from "../../context/UserContext";
import LogoutIcon from "@mui/icons-material/Logout"
import { useContext } from "react";

const Navbar = () => {
  const { loginUser, setIsLoggedIn } = useContext(UserContext);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleUserLogout = () => {
    localStorage.removeItem("userLoggedIn");
    setIsLoggedIn(false);
    localStorage.removeItem("username")
  };

  return (
    <AppBar sx={{ background: "#000", position: "sticky" }}>
      <Toolbar>
        <Box
          marginLeft={5}
          sx={{
            color: "#fff",
            display: "flex",
            alignItems: "center",
          }}
        >
          <LiveTvIcon fontSize="large" />
          <Typography marginLeft={2}>Live Tv</Typography>
        </Box>
        <Stack
          direction="row"
          sx={{
            marginLeft: "auto",
            alignItems: "center",
            gap: "0.5rem",
            cursor: "pointer",
          }}
          aria-controls={open ? "profile--menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
          onClick={handleClick}
        >
          <Avatar
            src="https://picsum.photos/50/50"
            sx={{ height: "2rem", width: "2rem" }}
          />
          <Typography>{loginUser}</Typography>
        </Stack>
        <Menu
          anchorEl={anchorEl}
          id="profile--menu"
          open={open}
          MenuListProps={{
            "aria-labelledby": "basic-button",
          }}
          onClose={() => setAnchorEl(null)}
        >
          <MenuItem onClick={handleUserLogout}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
              }}
            >
              <LogoutIcon sx={{color: "red"}} />
              <Typography>logout</Typography>
            </Box>
          </MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
