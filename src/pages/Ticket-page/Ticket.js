import React, { useContext, useEffect, useState } from "react";
import {
  Container,
  Box,
  Typography,
  Card,
  Button,
  Input,
  Stack,
  IconButton,
  Toolbar,
  CircularProgress,
  Modal,
} from "@mui/material";
import Navbar from "../../components/Navbar/Navbar";
import CircleIcon from "@mui/icons-material/Circle";
import SquareIcon from "@mui/icons-material/Square";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import UserContext from "../../context/UserContext";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
};

const Ticket = () => {
  const [seats, setSeats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [prevUserWarning, setPrevUserWarning] = useState("");
  const { ticketDetails, setTicketDetails } = useContext(UserContext);
  const navigate = useNavigate();

  const getSeatsInfo = async () => {
    const url = "https://manzar-05.herokuapp.com/theatre";

    try {
      setLoading(true);
      await axios.get(url).then(({ data }) => setSeats(data));
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const seathandler = async (id, prevSeatStatus) => {
    if (prevSeatStatus) return;

    const url = `https://manzar-05.herokuapp.com/theatre/${id}`;
    const status = prevSeatStatus === "" ? { status: false } : { status: "" };
    setLoading(true);

    try {
      await axios.put(url, status);
      getSeatsInfo();
      setLoading(false);

      if (prevSeatStatus === "") {
        userMsg();
        setTicketDetails({
          ...ticketDetails,
          quantity: ticketDetails.quantity + 1,
          ticketId: [...ticketDetails.ticketId, id],
          total: ticketDetails.total + 250,
        });
      } else {
        const filteredId = ticketDetails.ticketId.filter(
          (filterId) => filterId !== id
        );
        setTicketDetails({
          ...ticketDetails,
          quantity: ticketDetails.quantity - 1,
          ticketId: [...filteredId],
          total: ticketDetails.total - 250,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const seatConfirmhandler = async () => {
    const selectedSeats = ticketDetails.ticketId;
    const status = { status: true };
    const url = `https://manzar-05.herokuapp.com/theatre/`;

    setLoading(true);
    clearTimeout(prevUserWarning);

    try {
      for (let i = 0; i < selectedSeats.length; i++) {
        await axios.put(url + selectedSeats[i], status);
      }
      getSeatsInfo();
      setLoading(false);
      navigate("/payment")
    } catch (error) {
      console.log(error);
    }
  };

  const userMsg = () => {
    clearTimeout(prevUserWarning);

    const prevMsg = setTimeout(() => {
      alert("Please confirm seats!!");
    }, 10000);

    setPrevUserWarning(prevMsg);
  };

  useEffect(() => {
    getSeatsInfo();
  }, []);

  return (
    <div style={{ background: "#f1f3f5" }}>
      <Navbar />
      <Container>
        <Typography
          variant="h4"
          component="h2"
          mb={3}
          mt={3}
          className="text-center"
        >
          Please Select Seats
        </Typography>
        <Toolbar>
          <Typography
            sx={{
              fontSize: 18,
              fontWeight: 900,
              marginLeft: "auto",
              marginRight: "auto",
            }}
          >
            Screen-1
          </Typography>
        </Toolbar>
        {console.log(ticketDetails)}

        <Box
          sx={{
            justifyContent: "center",
            alignItems: "center",
            display: "flex",
            flexWrap: "wrap",
            "& > :not(style)": {
              m: 1,
            },
          }}
        >
          <Card
            elevation={3}
            sx={{
              maxWidth: 800,
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
              padding: 2,
              background: "#f1f3f5",
            }}
            mb={5}
          >
            {loading
              ? ""
              : seats.map((seat) => (
                  <IconButton
                    size="small"
                    aria-label="seats"
                    key={seat._id}
                    onClick={() => seathandler(seat.id, seat.status)}
                  >
                    {seat.status === "" ? (
                      <SquareIcon />
                    ) : seat.status ? (
                      <SquareIcon color="success" />
                    ) : (
                      <SquareIcon color="error" />
                    )}
                  </IconButton>
                ))}
          </Card>
          <Stack
            sx={{
              flexDirection: "column",
              gap: 3,
            }}
          >
            <Box
              sx={{
                display: "flex",
                gap: 1,
                justifyContent: "center",
              }}
            >
              <IconButton aria-label="seats">
                <CircleIcon />
              </IconButton>
              <Typography fontWeight="bold" className="m-auto">
                Empty
              </Typography>
              <IconButton aria-label="seats">
                <CircleIcon color="success" />
              </IconButton>
              <Typography fontWeight="bold" className="m-auto">
                Occupied
              </Typography>
              <IconButton aria-label="seats">
                <CircleIcon color="error" />
              </IconButton>
              <Typography fontWeight="bold" className="m-auto">
                blocked
              </Typography>
            </Box>
          </Stack>
        </Box>

        <Stack
          direction="column"
          mx={{
            display: "flex",
            gap: 5,
            marginTop: "50px",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Input
            component="div"
            value={
              ticketDetails.quantity
                ? `Quantiity: ${ticketDetails.quantity}`
                : "No. of seats"
            }
            sx={{ fontWeight: "bold" }}
            disabled
          />
          <Input
            value={
              ticketDetails.total
                ? `Rs. ${ticketDetails.total}`
                : "Total Amount"
            }
            sx={{ fontWeight: "bold" }}
            disabled
          />
          <Stack direction="row" gap={2} mb={5}>
            <Button
              variant="contained"
              sx={{
                marginTop: "50px",
              }}
              onClick={seatConfirmhandler}
            >
              Confirm Seats
            </Button>
            <Button
              variant="contained"
              sx={{
                marginTop: "50px",
              }}
              onClick={() => navigate("/contact")}
            >
              Contact us
            </Button>
          </Stack>
        </Stack>
      </Container>
      <Modal
        open={loading}
        onClose={() => !loading}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <CircularProgress color="primary" />
        </Box>
      </Modal>
    </div>
  );
};

export default Ticket;
