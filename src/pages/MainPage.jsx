import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Button,
  MenuItem,
  TextField,
  Select,
  Card,
  CardContent,
  Typography,
} from "@mui/material";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const MainPage = () => {
  const [type, setType] = useState("trivia");
  const [number, setNumber] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = () => {
    if (number && (isNaN(number) || number < 0)) {
      setError("Please enter a valid positive number.");
      setOpenSnackbar(true);
      return;
    }
    const num = number.trim().length === 0 ? "random" : number;
    navigate(`/info?type=${type}&number=${num}`);
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-purple-500 to-blue-500">
      <Card className="w-full max-w-md shadow-xl rounded-lg">
        <CardContent>
          <Typography
            variant="h4"
            className="text-center font-bold text-gray-800"
          >
            Number Facts
          </Typography>
          <Typography className="text-center text-gray-600 mb-4">
            Discover fascinating facts about numbers. Choose a type, enter a
            number, or get a random fact!
          </Typography>

          <div className="flex flex-col items-center gap-4 mt-4">
            <Select
              value={type}
              onChange={(e) => setType(e.target.value)}
              variant="outlined"
              fullWidth
              className="mb-4"
            >
              <MenuItem value="trivia">Trivia</MenuItem>
              <MenuItem value="math">Math</MenuItem>
              <MenuItem value="date">Date</MenuItem>
              <MenuItem value="year">Year</MenuItem>
            </Select>

            <TextField
              label="Enter a Number (Optional)"
              variant="outlined"
              value={number}
              onChange={(e) => setNumber(e.target.value)}
              fullWidth
            />

            <Button
              variant="contained"
              color="primary"
              onClick={handleSubmit}
              fullWidth
              className="mt-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg"
            >
              Get Fact
            </Button>
          </div>
        </CardContent>
      </Card>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity="error"
          sx={{ width: "100%" }}
        >
          {error}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default MainPage;
