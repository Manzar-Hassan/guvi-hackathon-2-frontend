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

  const [userError, setUserError] = useState({
    msg: "",
    error: false,
    passmsg: "",
    passErr: false,
    conmsg: "",
    conErr: false,
  });

  const detailHandler = (e) => {
    setSignDetails({ ...signDetails, [e.target.name]: e.target.value });
  };

  const navigate = useNavigate()

  const errorHandler = () => {
    let error = "";
    if (signDetails.username.length < 5) {
      error = "username must be greater than 4 characters";
      setUserError({ ...userError, msg: error, error: true });
    } else if (signDetails.username.length > 5) {
      error = "";
      setUserError({ ...userError, msg: error, error: false });
    } else if (signDetails.password.length < 8) {
      error = "password must be more than 8 characters long!!";
      setUserError({ ...userError, passmsg: error, passErr: true });
    } else if (signDetails.password.length > 8) {
      error = "";
      setUserError({ ...userError, passmsg: error, passErr: false });
      }else if (signDetails.confirmPass.length < 8) {
        error = "password must be more than 8 characters long!!";
        setUserError({ ...userError, conmsg: error, confirmPass: true });
      } else if (signDetails.confirmPass.length > 8) {
        error = "";
        setUserError({ ...userError, conmsg: error, confirmPass: false });
      } else if (signDetails.confirmPass !==signDetails.password ) {
        alert("Password doesn't match!!")
    }
  };

  const createUser = async (e) => {
    e.preventDefault();
    const url = "https://manzar-05.herokuapp.com/signup";

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
                    onBlur={errorHandler}
                    error={userError.error}
                    helperText={userError.msg}
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
                    onBlur={errorHandler}
                    error={userError.passErr}
                    helperText={userError.passmsg}
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
                    onBlur={errorHandler}
                    error={userError.conErr}
                    helperText={userError.conmsg}
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
