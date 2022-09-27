import axios from "axios";

export const getQuestions = async () => {
  try {
    console.log("getQuestions");
    const response = await axios.get(
      "https://the-trivia-api.com/api/questions?limit=10"
    );
    console.log(response.data[0]);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
