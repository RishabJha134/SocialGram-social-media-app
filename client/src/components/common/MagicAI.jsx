import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Input,
  Stack,
  Typography,
} from "@mui/material";
import { useState, useRef } from "react";
import ReactMarkdown from "react-markdown";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import { toggleChatBot } from "../../redux/slice";

const MagicAI = () => {
  const [loading, setLoading] = useState(false); // Loading state
  const [result, setResult] = useState(""); // AI result
  const searchText = useRef(""); // User input ref
  const dispatch = useDispatch();
  const { openBot } = useSelector((state) => state.service);

  // Function to call AI API
  const handleMagicSearch = async () => {
    setLoading(true);
    const gptQuery =
      "Act as a social media content generator system and generate content ideas: " +
      searchText.current.value;

      // console.log(gptQuery);

    try {
      if (!searchText.current.value) {
        toast.info("please enter your query");
        return; // Skip generating content if it's already available
      }
      const gptResults = await axios({
        url: `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${
          import.meta.env.VITE_GEMINI_KEY
        }`,
        method: "post",
        data: { contents: [{ parts: [{ text: gptQuery }] }] },
      });

      const aiResponse =
        gptResults.data.candidates[0].content.parts[0].text ||
        "No content generated.";

      // console.log(aiResponse);

      setResult(aiResponse); // Update the result state
      toast.success("Content generated successfully!");
    } catch (error) {
      toast.error("Failed to fetch AI results. Please try again.");
      console.error("Error fetching AI results:", error);
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  // Handle modal close
  const handleClose = () => {
    searchText.current.value = ""; // Clear the input field
    setResult(""); // Clear the result
    dispatch(toggleChatBot()); // Close the modal via Redux state
    // console.log(searchText.current.value);
    // console.log(result);
  };

  return (
    <Box>
      {/* Modal for Query */}
      <Dialog open={openBot} onClose={handleClose} fullWidth>
        <DialogTitle textAlign="center">Ask Magic AI</DialogTitle>
        <DialogContent>
          <Stack spacing={2}>
            <Typography>Enter your query for AI:</Typography>
            <Input
              type="text"
              placeholder="E.g., Create content ideas for a tech blog..."
              fullWidth
              inputRef={searchText}
            />
            <Button
              variant="contained"
              color="primary"
              disabled={loading}
              onClick={handleMagicSearch}
            >
              {loading ? "Loading..." : "Get Suggestions"}
            </Button>
            {result && (
              <div
                style={{
                  marginTop: "16px",
                  padding: "16px",
                  backgroundColor: "#f0f0f0",
                  borderRadius: "8px",
                }}
              >
                <ReactMarkdown>{result}</ReactMarkdown>
              </div>
            )}
          </Stack>
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default MagicAI;
