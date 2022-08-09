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
  Fab,
  Tooltip,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
} from "@mui/material";
import Navbar from "../../components/Navbar/Navbar";
import CircleIcon from "@mui/icons-material/Circle";
import SquareIcon from "@mui/icons-material/Square";
import { useNavigate } from "react-router-dom";
import UserContext from "../../context/UserContext";
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import axios from "axios";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
};

const Ticket = () => {
  const [seats, setSeats] = useState([]);
  const [allTickets, setAllTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [reservedUsers, setReservedUsers] = useState(false);
  const [prevUserWarning, setPrevUserWarning] = useState("");
  const { ticketDetails, setTicketDetails, loginUser, ticketCost } =
    useContext(UserContext);
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
          total: ticketDetails.total + ticketCost,
        });
      } else {
        const filteredId = ticketDetails.ticketId.filter(
          (filterId) => filterId !== id
        );
        setTicketDetails({
          ...ticketDetails,
          quantity: ticketDetails.quantity - 1,
          ticketId: [...filteredId],
          total: ticketDetails.total - ticketCost,
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
    const ticketURL = "https://manzar-05.herokuapp.com/add-ticket";

    setLoading(true);
    clearTimeout(prevUserWarning);

    try {
      for (let i = 0; i < selectedSeats.length; i++) {
        await axios.put(url + selectedSeats[i], status);
      }
      await axios.post(ticketURL, ticketDetails);
      getSeatsInfo();
      setLoading(false);
      navigate("/payment");
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

  const getTicketsDetails = async () => {
    const url = "https://manzar-05.herokuapp.com/tickets";

    try {
      await axios.get(url).then(({ data }) => setAllTickets(data));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getTicketsDetails();
  }, []);

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

      {/* admin button */}
      <Modal
        open={reservedUsers}
        onClose={() => setReservedUsers(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <TableContainer
          component={Paper}
          sx={{
            maxWidth: 650,
            left: "30%",
            top: "30%",
            position: "fixed",
            maxHeight: 800,
          }}
        >
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell sx={{ align: "right", fontWeight: "bold" }}>
                  Username
                </TableCell>
                <TableCell sx={{ align: "right", fontWeight: "bold" }}>
                  Total Tickets
                </TableCell>
                <TableCell sx={{ align: "right", fontWeight: "bold" }}>
                  Movie Name
                </TableCell>
                <TableCell sx={{ align: "right", fontWeight: "bold" }}>
                  Seat Number
                </TableCell>
                <TableCell sx={{ align: "right", fontWeight: "bold" }}>
                  Total(Rs.)
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {allTickets.map((ticket) => (
                <TableRow
                  key={ticket._id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell align="center">{ticket.username}</TableCell>
                  <TableCell align="center">{ticket.quantity}</TableCell>
                  <TableCell align="center">{ticket.name}</TableCell>
                  <TableCell align="center">
                    {ticket.ticketId}
                  </TableCell>
                  <TableCell align="center">{ticket.total}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Modal>
      {loginUser === "manzar" ? (
        <Tooltip
          title="Tickets info"
          onClick={() => setReservedUsers(true)}
          sx={{
            position: "fixed",
            bottom: 20,
            left: { xs: "calc(50% - 25px)", md: 30 },
          }}
        >
          <Fab color="primary" aria-label="add">
            <RemoveRedEyeIcon />
          </Fab>
        </Tooltip>
      ) : (
        ""
      )}
    </div>
  );
};

export default Ticket;
