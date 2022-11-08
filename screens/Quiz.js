import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
} from "react-native";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import { ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import * as Progress from "react-native-progress";
import { Question } from "../components/Question";

let interval;
const START_TIME = 100;
const CORRECT_SCORE_VALUE = 100;

const Quiz = () => {
  const [data, setData] = useState([]);
  const [questionNumber, setQuestionNumber] = useState(0);
  const [options, setOptions] = useState([]);
  const [score, setScore] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [myColor, setMyColor] = useState("white");
  const [correctColor, setCorrectColor] = useState("white");
  const [timerCount, setTimer] = useState(START_TIME);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  const navigation = useNavigation();

  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      let temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
  };

  const getQuestions = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(
        "https://the-trivia-api.com/api/questions?limit=10"
      );
      if (response.status === 200) {
        setData(response.data);
        setOptions(generateOptionsAndShuffle(response.data[0]));
        setIsLoading(false);
        return;
      } else {
        throw new Error("Failed to fetch data");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getQuestions();
    startTimer();
  }, []);

  const startTimer = () => {
    console.log("Here");
    interval = setInterval(() => {
      setTimer((lastTimerCount) => {
        lastTimerCount <= 1 && clearInterval(interval);
        return lastTimerCount - 1;
      });
    }, 100);
    return () => clearInterval(interval);
  };

  const resetTimer = () => {
    console.log(interval);
    clearInterval(interval);
    setTimer(START_TIME);
    startTimer();
  };

  const resetQuiz = () => {
    setQuestionNumber(0);
    setScore(0);
    getQuestions();
    resetTimer();
  };

  const skipQuestion = () => {
    if (questionNumber !== 9) {
      setQuestionNumber(questionNumber + 1);
      setOptions(generateOptionsAndShuffle(data[questionNumber + 1]));
    } else {
      showResults();
    }
  };

  const generateOptionsAndShuffle = (question) => {
    const options = [...question.incorrectAnswers];
    options.push(question.correctAnswer);
    shuffleArray(options);
    return options;
  };

  const showResults = () => {
    navigation.navigate("Results", { score });
  };

  const handleSelectedOption = (option) => {
    if (option === data[questionNumber].correctAnswer) {
      setCorrectColor("green");
      optionStyles(myColor);
    } else {
      setMyColor("red");
      setCorrectColor("green");
      optionStyles(myColor);
    }

    setIsButtonDisabled(true);

    setTimeout(() => {
      setMyColor("white");
      setCorrectColor("white");
      optionStyles(myColor);
      setIsButtonDisabled(false);

      if (option === data[questionNumber].correctAnswer) {
        setScore(score + CORRECT_SCORE_VALUE + timerCount);
      }

      if (questionNumber !== 9) {
        setQuestionNumber(questionNumber + 1);
        setOptions(generateOptionsAndShuffle(data[questionNumber + 1]));
        resetTimer();
      } else {
        showResults();
      }
    }, 1000);
  };

  if (isLoading) {
    return (
      <ImageBackground
        source={require("../images/background5.jpeg")}
        style={{ width: "100%", height: "100%" }}
      >
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <ActivityIndicator color={"#fff"} size="large" />
        </View>
      </ImageBackground>
    );
  }

  if (data.length > 0 && !isLoading) {
    return (
      <ImageBackground
        source={require("../images/background5.jpeg")}
        style={{ width: "100%", height: "100%" }}
      >
        <SafeAreaView style={styles.container}>
          <View
            style={{
              alignSelf: "flex-start",
            }}
          >
            <View style={{ minWidth: "100%", padding: 25 }}>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  marginBottom: 10,
                }}
              >
                <Text
                  style={{
                    color: "white",
                    fontWeight: "bold",
                    fontSize: 22,
                  }}
                >
                  {questionNumber + 1}/{data.length}
                </Text>
                <Text
                  style={{
                    fontSize: 22,
                    color: "white",
                    fontWeight: "bold",
                  }}
                >
                  {timerCount}
                </Text>
              </View>

              <Text
                style={{
                  fontSize: 20,
                  fontWeight: "bold",
                  color: "white",
                }}
              >
                Q.{"  "}
                {data[questionNumber].question}
              </Text>
            </View>
          </View>
          <Progress.Bar
            progress={Number((questionNumber + 1) / 10)}
            width={360}
            height={17.5}
            style={{ marginBottom: 15 }}
          />
          <View>
            <TouchableOpacity
              disabled={isButtonDisabled}
              style={
                options[0] === data[questionNumber].correctAnswer
                  ? optionStyles(correctColor)
                  : optionStyles(myColor)
              }
              onPress={() => handleSelectedOption(options[0])}
            >
              <Text style={{ padding: 10, fontSize: 16, fontWeight: "bold" }}>
                {options[0]}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              disabled={isButtonDisabled}
              style={
                options[1] === data[questionNumber].correctAnswer
                  ? optionStyles(correctColor)
                  : optionStyles(myColor)
              }
              onPress={() => handleSelectedOption(options[1])}
            >
              <Text style={{ padding: 10, fontSize: 16, fontWeight: "bold" }}>
                {options[1]}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              disabled={isButtonDisabled}
              style={
                options[2] === data[questionNumber].correctAnswer
                  ? optionStyles(correctColor)
                  : optionStyles(myColor)
              }
              onPress={() => handleSelectedOption(options[2])}
            >
              <Text style={{ padding: 10, fontSize: 16, fontWeight: "bold" }}>
                {options[2]}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              disabled={isButtonDisabled}
              style={
                options[3] === data[questionNumber].correctAnswer
                  ? optionStyles(correctColor)
                  : optionStyles(myColor)
              }
              onPress={() => handleSelectedOption(options[3])}
            >
              <Text style={{ padding: 10, fontSize: 16, fontWeight: "bold" }}>
                {options[3]}
              </Text>
            </TouchableOpacity>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            ></View>
          </View>
          <View
            style={{
              position: "absolute",
              marginTop: 710,
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "lightblue",
              borderRadius: 20,
              opacity: 0.8,
            }}
          >
            <TouchableOpacity style={styles.button} onPress={skipQuestion}>
              <Text
                style={{ fontSize: 18, fontWeight: "bold", color: "white" }}
              >
                Skip
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={resetQuiz}>
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: "bold",
                  color: "white",
                }}
              >
                Restart
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => navigation.navigate("Dashboard")}
              style={styles.button}
            >
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: "bold",
                  opacity: 1,
                  color: "white",
                }}
              >
                Quit
              </Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </ImageBackground>
    );
  }
};

export default Quiz;

const optionStyles = (color) => {
  return {
    flex: 1,
    borderRadius: 20,
    backgroundColor: color,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 4,
    marginBottom: 10.5,
    maxHeight: 85,
    width: 370,
  };
};

let styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  button: {
    height: 85,
    flexDirection: "row",
    width: 122,
    opacity: 1,
    alignItems: "center",
    justifyContent: "center",
    fontWeight: "bold",
  },
  option: {
    flex: 1,
    borderRadius: 20,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 4,
    marginBottom: 12.5,
    maxHeight: 85,
    width: 370,
  },
});
