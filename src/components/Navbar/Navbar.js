import React, { useEffect } from "react";
import { AppBar, Avatar, Box, Stack, Toolbar, Typography } from "@mui/material";
import LiveTvIcon from "@mui/icons-material/LiveTv";
import UserContext from "../../context/UserContext";
import { useContext } from "react";

const Navbar = () => {
  const { loginUser } = useContext(UserContext);

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
          sx={{ marginLeft: "auto", alignItems: "center", gap: "0.5rem" }}
        >
          <Avatar
            src="https://picsum.photos/50/50"
            sx={{ height: "2rem", width: "2rem" }}
          />
          <Typography>{loginUser}</Typography>
        </Stack>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
