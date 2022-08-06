import React, { useState } from "react";
import {
  Container,
  Button,
  Grid,
  Paper,
  TextField,
  Avatar,
  Box,
  Snackbar,
} from "@mui/material";

const Payment = () => {
  const [success, setSuccess] = useState(false);
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
                    label="Enter upi id"
                    variant="outlined"
                    required
                  />
                </Grid>

                <Grid item>
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    onClick={() => setSuccess(true)}
                  >
                    Proceed to Pay
                  </Button>
                </Grid>
              </Grid>
            </form>
          </Paper>
        </Grid>
      </Container>
      <Snackbar
        open={success}
        onClose={()=>setSuccess(false)}
        TransitionComponent="TransitionLeft"
        message="Payment Successful !!"
        key="Grow"
      />
    </div>
  );
};

export default Payment;
