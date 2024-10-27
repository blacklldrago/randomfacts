import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Button,
  Card,
  CardContent,
  Typography,
  CircularProgress,
  Snackbar,
} from "@mui/material";
import { ArrowBackSharp, Error as ErrorIcon } from "@mui/icons-material";

const InfoPage = () => {
  const { search } = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(search);
  const type = queryParams.get("type");
  const number = queryParams.get("number");
  const [fact, setFact] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);

  useEffect(() => {
    const fetchFact = async () => {
      setLoading(true);
      setError("");
      try {
        const num = number.trim() === "" ? "random" : number;
        const response = await axios.get(
          `http://numbersapi.com/${num}/${type}`
        );
        setFact(response.data);
      } catch (error) {
        setError("Error fetching data: Invalid input or number not found.");
      } finally {
        setLoading(false);
      }
    };

    fetchFact();
  }, [number, type]);

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-600 to-purple-600">
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        message={error}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        action={<ErrorIcon style={{ color: "red" }} />}
        ContentProps={{
          style: { backgroundColor: "red" },
        }}
      />
      <Card className="w-full max-w-lg shadow-lg rounded-lg mt-16">
        <CardContent className="p-8">
          <Typography variant="h4" className="text-center font-bold mb-4">
            {loading ? "Fetching your Fact..." : "Here's your Fact!"}
          </Typography>

          {loading ? (
            <div className="flex justify-center py-8">
              <CircularProgress color="secondary" />
            </div>
          ) : (
            <>
              <Typography className="text-lg text-center">{fact}</Typography>
              <div className="flex items-center justify-center mt-[10px]">
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={() => navigate("/")}
                  className="flex items-center justify-center px-6 py-2 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-lg"
                  startIcon={<ArrowBackSharp />}
                >
                  Back to Home
                </Button>
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default InfoPage;
