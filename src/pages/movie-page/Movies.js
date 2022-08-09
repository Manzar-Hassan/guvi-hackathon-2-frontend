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
  Tooltip,
  Fab,
  IconButton,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import Navbar from "../../components/Navbar/Navbar";
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
  const [movies, setmovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [addLoading, setAddLoading] = useState(false);
  const [editMovie, setEditMovie] = useState({
    state: false,
    name: "",
    id: "",
    poster: "",
    cost: 0,
  });
  const { ticketDetails, setTicketDetails, loginUser, setTicketCost } =
    useContext(UserContext);
  const navigate = useNavigate();

  const handleChange = (event) => {
    setTicketDetails({ ...ticketDetails, time: event.target.value });
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
    if (ticketDetails.time === "") {
      alert("please choose show time!!");
      return;
    } else {
      navigate("/tickets");
    }
  };

  const addTicketData = (e) => {
    setEditMovie({ ...editMovie, [e.target.name]: e.target.value });
  };

  const addTicketHandler = async () => {
    const url = "https://manzar-05.herokuapp.com/add-movie";
    setAddLoading(true);

    try {
      await axios.post(url, editMovie);
      setAddLoading(false);
      getMovies();
      setEditMovie({ ...editMovie, state: false });
    } catch (error) {
      console.log(error);
    }
  };

  const modalHandler = (e) => {
    setTicketDetails({
      ...ticketDetails,
      name: e.target.id,
    });
    setTicketCost(+e.target.name);
    setOpen(true);
  };

  const handleDelete = async (id) => {
    const url = `https://manzar-05.herokuapp.com/movies/${id}`;
    setLoading(true);

    try {
      await axios.delete(url);
      getMovies();
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
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
        <section className="py-5" style={{ background: "#212529" }}>
          <div className="container px-4 px-lg-5 mt-5">
            <div className="row gx-4 gx-lg-5 row-cols-2 row-cols-md-3 row-cols-xl-4 justify-content-center">
              {movies.map((movie) => (
                <div className="col mb-5" key={movie._id}>
                  <div className="card">
                    <img
                      className="card-img-top"
                      src={movie.poster}
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
                          {movie.name}
                          <Typography fontWeight="bold">
                            (Rs.{movie.cost})
                          </Typography>
                        </Typography>
                        <Button
                          id={movie.name}
                          name={movie.cost}
                          variant="contained"
                          onClick={modalHandler}
                        >
                          Book
                        </Button>
                        {loginUser === "manzar" ? (
                          <IconButton
                            aria-label="delete"
                            size="large"
                            color="error"
                            onClick={() => handleDelete(movie.id)}
                          >
                            <DeleteIcon fontSize="inherit" />
                          </IconButton>
                        ) : (
                          ""
                        )}
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
                value={ticketDetails.time}
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
        {/* Edit movie section */}
        <Modal
          open={editMovie.state}
          onClose={() => setEditMovie({ ...editMovie, state: false })}
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
              Add Movie
            </Typography>
            <Stack
              sx={{
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "space-evenly",
                gap: 2,
              }}
            >
              <TextField
                type="text"
                name="id"
                size="small"
                label="Movie ID"
                variant="outlined"
                value={editMovie.id}
                onChange={addTicketData}
                required
              />
              <TextField
                type="text"
                name="name"
                size="small"
                label="Movie Name"
                variant="outlined"
                value={editMovie.name}
                onChange={addTicketData}
                required
              />
              <TextField
                type="text"
                name="poster"
                size="small"
                label="Movie Poster URL"
                variant="outlined"
                value={editMovie.poster}
                onChange={addTicketData}
                required
              />
              <TextField
                type="text"
                name="cost"
                size="small"
                label="Movie Ticket Price"
                variant="outlined"
                value={editMovie.cost}
                onChange={addTicketData}
                required
              />
              {addLoading ? (
                <CircularProgress color="primary" />
              ) : (
                <Button variant="contained" onClick={addTicketHandler}>
                  Add
                </Button>
              )}
            </Stack>
          </Box>
        </Modal>
        {loginUser === "manzar" ? (
          <Tooltip
            title="Delete"
            onClick={(e) => setEditMovie({ ...editMovie, state: true })}
            sx={{
              position: "fixed",
              bottom: 20,
              left: { xs: "calc(50% - 25px)", md: 30 },
            }}
          >
            <Fab color="primary" aria-label="add">
              <AddIcon />
            </Fab>
          </Tooltip>
        ) : (
          ""
        )}
      </div>
    </>
  );
};

export default MovieCards;
