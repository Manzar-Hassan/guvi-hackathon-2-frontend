import {
  Container,
  Button,
  Grid,
  Paper,
  TextField,
  Avatar,
  Typography,
  Box,
} from "@mui/material";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios"

const Signup = () => {
  const [signDetails, setSignDetails] = useState({
    username: "",
    password: "",
    confirmPass: "",
  });

  const detailHandler = (e) => {
    setSignDetails({ ...signDetails, [e.target.name]: e.target.value });
  };

  const navigate = useNavigate()

  const createUser = async (e) => {
    e.preventDefault();
    const url = "https://manzar-05.herokuapp.com/signup";

    if (signDetails.username.length < 5) {
      alert("username cannot be smaller than 5 characters!!");
      setSignDetails({ ...signDetails, username: "" });
      return;

    } else if (signDetails.password.length < 8) {
      alert("Password cannot be smaller than 8 characters!!");
      setSignDetails({ ...signDetails, password: "" });
      return;

    }else if (signDetails.password !== signDetails.confirmPass) {
      alert("password doesn't match!!");
      setSignDetails({ ...signDetails, password: "", confirmPass:"" });
      return;
    }

    try {
      await axios.post(url,signDetails).then(({data})=> alert(data.msg))
      navigate("/movies")
    } catch (error) {
      console.log(error)
    }
  };

  return (
    <div className="bg-secondary">
      <Container maxWidth="sm">
        {console.log(signDetails)}
        <Grid
          container
          spacing={2}
          direction="column"
          justifyContent="center"
          style={{ minHeight: "100vh" }}
        >
          <Paper elelvation={2} sx={{ padding: 5 }}>
            <Box sx={{ display: "flex", justifyContent: "center" }}>
              <Avatar
                sx={{
                  height: "100px",
                  width: "100px",
                  marginBottom: "10px",
                }}
              />
            </Box>
            <form onSubmit={createUser}>
              <Grid container direction="column" spacing={2}>
                <Grid item>
                  <TextField
                    type="text"
                    fullWidth
                    label="username"
                    variant="outlined"
                    name="username"
                    required
                    onChange={detailHandler}
                    value={setSignDetails.username}
                  />
                </Grid>

                <Grid item>
                  <TextField
                    type="password"
                    fullWidth
                    label="Password"
                    variant="outlined"
                    name="password"
                    onChange={detailHandler}
                    value={setSignDetails.password}
                    required
                  />
                </Grid>

                <Grid item>
                  <TextField
                    type="password"
                    fullWidth
                    label="Password"
                    variant="outlined"
                    name="confirmPass"
                    onChange={detailHandler}
                    value={setSignDetails.confirmPass}
                    required
                  />
                </Grid>

                <Grid item>
                  <Button type="submit" fullWidth variant="contained">
                    Sign Up
                  </Button>
                </Grid>
              </Grid>
            </form>
            <Grid item mt={1}>
              <Typography sx={{ fontSize: "0.7rem" }}>
                Already have an account? <Link to="/">Login</Link>
              </Typography>
            </Grid>
          </Paper>
        </Grid>
      </Container>
    </div>
  );
};

export default Signup;
