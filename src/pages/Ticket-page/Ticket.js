import React from "react";
import {
  Container,
  Box,
  Typography,
  Card,
  Button,
  Input,
  Stack,
  IconButton,
} from "@mui/material";
import Navbar from "../../components/Navbar/Navbar";
import SquareIcon from "@mui/icons-material/Square";
import { useNavigate } from "react-router-dom";

const seatArray = new Array(100).fill(false);

const Ticket = () => {
  const navigate = useNavigate();
  return (
    <div style={{ background: "#d3d3d3" }}>
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
            sx={{
              maxWidth: 800,
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
            }}
            mb={5}
            component="div"
          >
            {seatArray.map((seat, index) => (
              <IconButton aria-label="seats" key={index}>
                <SquareIcon />
              </IconButton>
            ))}
          </Card>
          <Typography sx={{ display: "block" }}></Typography>
          <Box
            sx={{
              display: "flex",
              gap: 2,
              background: "#bbbbbb",
              justifyContent: "center",
            }}
          >
            <SquareIcon />
            <Typography fontWeight="bold">Empty</Typography>
            <SquareIcon color="success" />
            <Typography fontWeight="bold">Occupied</Typography>
            <SquareIcon color="error" />
            <Typography fontWeight="bold">blocked</Typography>
          </Box>
        </Box>
        <Stack
          direction="column"
          mx={{
            display: "flex",
            gap: 5,
            marginTop: "100px",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Input defaultValue="Seats booked" sx={{ color: "#fff" }} disabled />
          <Input defaultValue="Total Amount" sx={{ color: "#fff" }} disabled />
          <Stack direction="row" gap={2} mb={5}>
            <Button
              variant="contained"
              sx={{
                marginTop: "50px",
              }}
              onClick={() => navigate("/payment")}
            >
              Confirm Seats
            </Button>
            <Button
              variant="contained"
              sx={{
                marginTop: "50px",
              }}
              onClick={()=>navigate("/contact")}
            >
              Contact us
            </Button>
          </Stack>
        </Stack>
      </Container>
    </div>
  );
};

export default Ticket;
