import React, { useContext, useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { Container, Button, Grid, Paper, Snackbar } from "@mui/material";
import UserContext from "../../context/UserContext";

let stripePromise;
const getStripe = () => {
  if (!stripePromise) {
    stripePromise = loadStripe(process.env.REACT_APP_STRIPE_KEY);
  }
  return stripePromise;
};

const Payment = () => {
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState([]);
  const { ticketDetails, ticketCost } = useContext(UserContext);

  const handleClick = () => {
    setOpen(true);
    redirectToCheckout();
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  useEffect(() => {
    if (ticketDetails.ticketId.length) {
      setItems(
        ticketDetails.ticketId.map(() => ({
          price: process.env.REACT_APP_TICKET_ID,
          quantity: Number(ticketDetails.quantity),
        }))
      );
    }
  }, [ticketDetails.ticketId, ticketDetails.quantity, ticketCost]);

  const checkoutOptions = {
    lineItems: items,
    mode: "payment",
    successUrl: `https://movie-success-05.netlify.app/`,
    cancelUrl: `https://movie-error.netlify.app/`,
  };

  const redirectToCheckout = async () => {
    const stripe = await getStripe();
    const { error } = await stripe.redirectToCheckout(checkoutOptions);
    if (error) {
      alert(error.message);
      return;
    }
  };

  const action = (
    <React.Fragment>
      <Button color="secondary" size="small" onClick={handleClose}>
        UNDO
      </Button>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );

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
              <Grid container direction="column" spacing={2}>
                <Grid item>
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    onClick={handleClick}
                  >
                    Proceed to Pay
                  </Button>
                </Grid>
              </Grid>
          </Paper>
        </Grid>
      </Container>
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        message="redirecting to Payment Checkout...."
        action={action}
      />
    </div>
  );
};

export default Payment;
