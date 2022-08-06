import React from "react";
import {
  Container,
  Button,
  Grid,
  Paper,
  TextField,
  Avatar,
  Box,
} from "@mui/material";

const ContactUs = () => {
  const submitHandler = (e) => {
    e.preventDefault();
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
            <form onSubmit={submitHandler}>
              <Grid container direction="column" spacing={2}>
                <Grid item>
                  <TextField
                    type="text"
                    fullWidth
                    size="small"
                    label="firstname"
                    variant="outlined"
                    required
                  />
                </Grid>

                <Grid item>
                  <TextField
                    type="text"
                    fullWidth
                    size="small"
                    label="lastname"
                    variant="outlined"
                    required
                  />
                </Grid>

                <Grid item>
                  <TextField
                    type="text"
                    fullWidth
                    size="small"
                    label="email"
                    variant="outlined"
                    required
                  />
                </Grid>

                <Grid item>
                  <TextField
                    type="text"
                    fullWidth
                    size="small"
                    label="phone"
                    variant="outlined"
                    required
                  />
                </Grid>

                <Grid item>
                  <TextField
                    id="standard-multiline-static"
                    type="text"
                    fullWidth
                    multiline
                    label="messege"
                    required
                    rows={4}
                    variant="standard"
                  />
                </Grid>

                <Grid item>
                  <Button type="submit" fullWidth variant="contained">
                    Contact us
                  </Button>
                </Grid>
              </Grid>
            </form>
          </Paper>
        </Grid>
      </Container>
    </div>
  );
};

export default ContactUs;
