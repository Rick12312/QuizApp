import React, { useState, useEffect } from "react";
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

const Quiz = () => {
  const [data, setData] = useState([]);
  const [questionNumber, setQuestionNumber] = useState(0);
  const [options, setOptions] = useState([]);
  const [score, setScore] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [myColor, setMyColor] = useState("white");

  const navigation = useNavigation();

  const shuffleArray = (array) => {
    for (var i = array.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var temp = array[i];
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
  }, []);

  const resetQuiz = () => {
    setQuestionNumber(0);
    setScore(0);
    getQuestions();
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
    console.log(option === data[questionNumber].correctAnswer);

    if (option === data[questionNumber].correctAnswer) {
      setMyColor("green");
      optionStyles(myColor);
    } else {
      setMyColor("red");
      optionStyles(myColor);
    }

    setTimeout(() => {
      setMyColor("white");
      optionStyles(myColor);

      if (option === data[questionNumber].correctAnswer) {
        setScore(score + 1);
      }

      if (questionNumber !== 9) {
        setQuestionNumber(questionNumber + 1);
        setOptions(generateOptionsAndShuffle(data[questionNumber + 1]));
      } else {
        showResults();
      }
    }, 900);
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
            <Text
              style={{
                color: "white",
                padding: 15,
                marginBottom: -20,
                fontWeight: "bold",
                fontSize: 16,
              }}
            >
              {questionNumber + 1}/{data.length}
            </Text>
            <Text
              style={{
                fontSize: 20,
                fontWeight: "bold",
                padding: 15,
                color: "white",
              }}
            >
              {data[questionNumber].question}
            </Text>
          </View>
          <View stlye={styles.answersContainer}>
            <TouchableOpacity
              style={optionStyles(myColor)}
              onPress={() => handleSelectedOption(options[0])}
            >
              <Text style={{ padding: 10, fontSize: 16, fontWeight: "bold" }}>
                {options[0]}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              delayPressIn={150}
              style={optionStyles(myColor)}
              onPress={() => handleSelectedOption(options[1])}
            >
              <Text style={{ padding: 10, fontSize: 16, fontWeight: "bold" }}>
                {options[1]}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={optionStyles(myColor)}
              onPress={() => handleSelectedOption(options[2])}
            >
              <Text style={{ padding: 10, fontSize: 16, fontWeight: "bold" }}>
                {options[2]}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={optionStyles(myColor)}
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

            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <TouchableOpacity style={styles.button} onPress={skipQuestion}>
                <Text
                  style={{ fontSize: 18, fontWeight: "bold", color: "white" }}
                >
                  SKIP
                </Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.button} onPress={resetQuiz}>
                <Text
                  style={{ fontSize: 18, fontWeight: "bold", color: "white" }}
                >
                  RESTART
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </SafeAreaView>
      </ImageBackground>
    );
  }
};

export default Quiz;

const optionStyles = (myColor) => {
  return {
    flex: 1,
    borderRadius: 20,
    backgroundColor: myColor,
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
    width: 175,
    backgroundColor: "lightblue",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 50,
  },
  option: {
    flex: 1,
    borderRadius: 20,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 4,
    marginBottom: 10.5,
    maxHeight: 85,
    width: 370,
  },
});
