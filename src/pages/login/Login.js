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
import React, { useContext, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import UserContext from "../../context/UserContext";

const Login = () => {
  const [values, setValues] = useState(false);
  const [loading, setLoading] = useState(false);
  const [userError, setUserError] = useState({
    msg: "",
    error: false,
    passmsg: "",
    passErr: false,
  });
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });

  const navigate = useNavigate();
  const { setLoginUser, setIsLoggedIn } = useContext(UserContext)

  const errorHandler = () => {
    let error = "";
    if (credentials.username.length < 5) {
      error = "username must be greater than 4 characters";
      setUserError({ ...userError, msg: error, error: true });
    } else if (credentials.username.length > 5) {
      error = "";
      setUserError({ ...userError, msg: error, error: false });
    } else if (credentials.password.length < 8) {
      error = "password must be more than 8 characters long!!";
      setUserError({ ...userError, passmsg: error, passErr: true });
    } else if (credentials.password.length > 8) {
      error = "";
      setUserError({ ...userError, passmsg: error, passErr: false });
    }
  };

  const handlePassVisibilty = () => {
    setValues(!values);
  };

  const handleChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value,
    });
  };

  const authenticateUser = async (e) => {
    e.preventDefault();
    const url = "https://manzar-05.herokuapp.com/login";
    setLoading(true);

    try {
      const notification = await axios.post(url, credentials);
      setLoading(false);
      if (notification) {
        setLoginUser(credentials.username)
        setIsLoggedIn(true)
        navigate("/movies");
      }
    } catch (error) {
      console.log(error);
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
            <form onSubmit={authenticateUser}>
              <Grid container direction="column" spacing={2}>
                <Grid item>
                  <TextField
                    type="text"
                    name="username"
                    error={userError.error}
                    fullWidth
                    label="username"
                    variant="outlined"
                    value={credentials.username}
                    helperText={userError.msg}
                    onChange={handleChange}
                    onBlur={errorHandler}
                    required
                  />
                </Grid>

                <Grid item>
                  <TextField
                    type={values ? "text" : "password"}
                    fullWidth
                    onBlur={errorHandler}
                    error={userError.passErr}
                    label="Password"
                    value={credentials.password}
                    name="password"
                    onChange={handleChange}
                    variant="outlined"
                    helperText={userError.passmsg}
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
    </div>
  );
};

export default Login;
