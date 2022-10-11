import {
  Container,
  Button,
  Grid,
  Paper,
  TextField,
  IconButton,
  InputAdornment,
  Avatar,
  Box,
  Typography,
  CircularProgress,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import React, { useContext, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import UserContext from "../../context/UserContext";
import axios from "axios";

const Login = () => {
  const [values, setValues] = useState(false);
  const [loading, setLoading] = useState(false);
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });
  const navigate = useNavigate();
  const {
    setLoginUser,
    setIsLoggedIn,
    ticketDetails,
    setTicketDetails,
    isLoggedIn,
  } = useContext(UserContext);

  const handlePassVisibilty = () => {
    setValues(!values);
  };

  const handleChange = (e) => {
    if (e.target.name === "username") {
      setTicketDetails({ ...ticketDetails, username: e.target.value });
    }

    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value,
    });
  };

  const checkFormError = async (e) => {
    e.preventDefault();
    const url = "https://manzar-05.herokuapp.com/login";

    if (credentials.username.length < 5) {
      alert("username cannot be smaller than 5 characters!!");
      setCredentials({ ...credentials, username: "" });
      return;
    } else if (credentials.password.length < 8) {
      alert("Password cannot be smaller than 8 characters!!");
      setCredentials({ ...credentials, password: "" });
      return;
    }

    setLoading(true);

    try {
      const data = await axios.post(url, credentials);
      setLoading(false);
      if (data.status === 200) {
        setLoginUser(credentials.username);
        setIsLoggedIn(true);
        localStorage.setItem("userLoggedIn", true);
        localStorage.setItem("username", credentials.username);
        navigate("/movies");
      } else {
        setLoading(false);
        alert("Incorrect Credentials!!");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/movies");
    }
  }, [isLoggedIn, navigate]);

  return (
    <Box sx={{ background: "#212529", minHeight: "100vh" }}>
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
            <form onSubmit={checkFormError}>
              <Grid container direction="column" spacing={2}>
                <Grid item>
                  <TextField
                    type="text"
                    name="username"
                    fullWidth
                    label="username"
                    variant="outlined"
                    value={credentials.username}
                    onChange={handleChange}
                    required
                  />
                </Grid>

                <Grid item>
                  <TextField
                    type={values ? "text" : "password"}
                    fullWidth
                    label="Password"
                    value={credentials.password}
                    name="password"
                    onChange={handleChange}
                    variant="outlined"
                    required
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            onClick={handlePassVisibilty}
                            aria-label="toggle password"
                            edge="end"
                          >
                            {values ? (
                              <VisibilityOffIcon />
                            ) : (
                              <VisibilityIcon />
                            )}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>

                <Grid item>
                  <Button type="submit" fullWidth variant="contained">
                    {loading ? <CircularProgress color="inherit" /> : "Sign In"}
                  </Button>
                </Grid>
              </Grid>
            </form>
            <Grid item mt={1}>
              <Typography sx={{ fontSize: "0.7rem" }}>
                No Account ? click here to <Link to="/signup">Signup</Link>
              </Typography>
            </Grid>
          </Paper>
        </Grid>
      </Container>
    </Box>
  );
};

export default Login;
