import React, { useEffect, useState, useContext } from "react";
import {
  Box,
  Button,
  Modal,
  TextField,
  Typography,
  MenuItem,
  CircularProgress,
  Stack,
  Toolbar,
} from "@mui/material";
import Navbar from "../Navbar/Navbar";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import UserContext from "../../context/UserContext";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #fff",
  boxShadow: 24,
  borderRadius: 1,
  p: 2,
};

const MovieCards = () => {
  const [open, setOpen] = useState(false);
  const [time, setTime] = useState("");
  const [movies, setmovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const { ticketDetails, setTicketDetails } = useContext(UserContext);
  const navigate = useNavigate();

  const handleChange = (event) => {
    setTime(event.target.value);
  };

  const getMovies = async () => {
    const url = "https://manzar-05.herokuapp.com/";

    try {
      await axios.get(url).then(({ data }) => setmovies(data));
      setLoading(false);
    } catch (error) {
      alert(error);
    }
  };

  const ticketHandler = () => {
    setTicketDetails({ ...ticketDetails, time });
    if (ticketDetails.time === "") {
      alert("please choose show time!!");
      return;
    } else {
      navigate("/tickets");
    }
  };

  const modalHandler = (e) => {
    setTicketDetails({ ...ticketDetails, name: e.target.id });
    setOpen(true);
  };

  useEffect(() => {
    getMovies();
  }, []);

  return (
    <>
      <Navbar />
      {loading ? (
        <Toolbar>
          <CircularProgress color="secondary" className="mx-auto" />
        </Toolbar>
      ) : (
        <section className="py-5 bg-secondary">
          <div className="container px-4 px-lg-5 mt-5">
            <div className="row gx-4 gx-lg-5 row-cols-2 row-cols-md-3 row-cols-xl-4 justify-content-center">
              {movies.map((movie) => (
                <div className="col mb-5" key={movie._id}>
                  <div className="card">
                    <img
                      className="card-img-top"
                      src={movie.posterUrl}
                      alt="product"
                    />
                    <div className="card-body p-4">
                      <div className="text-center">
                        <Typography
                          variant="h6"
                          component="h2"
                          fontWeight="bold"
                          mb={1}
                        >
                          {movie.title}
                          <Typography fontWeight="bold">(Rs.250)</Typography>
                        </Typography>
                        <Button
                          id={movie.title}
                          variant="contained"
                          onClick={modalHandler}
                        >
                          Book
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
      <div>
        <Modal
          open={open}
          onClose={() => setOpen(false)}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography
              id="modal-modal-title"
              variant="h6"
              component="h2"
              className="text-center mb-3"
            >
              Select Time
            </Typography>
            <Stack
              sx={{
                flexDirection: "row",
                alignItems: "start",
                justifyContent: "space-evenly",
              }}
            >
              <TextField
                size="small"
                select
                label="Select Time"
                helperText="Please Select Time"
                value={time}
                onChange={handleChange}
              >
                <MenuItem value="9:00 AM">9:00 AM</MenuItem>
                <MenuItem value="12:30 PM">12:30 PM</MenuItem>
                <MenuItem value="4:45 PM">4:45 PM</MenuItem>
                <MenuItem value="7:30 PM">7:30 PM</MenuItem>
                <MenuItem value="10:15 PM">10:15 PM</MenuItem>
              </TextField>
              <Button variant="contained" onClick={ticketHandler}>
                confirm
              </Button>
            </Stack>
          </Box>
        </Modal>
      </div>
    </>
  );
};

export default MovieCards;
