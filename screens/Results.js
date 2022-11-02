import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  Image,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { firebase } from "../config";
import AnimateNumber from "react-native-animate-number";
import LottieView from "lottie-react-native";

const Results = ({ route }) => {
  const navigation = useNavigation();
  const [highscore, setHighscore] = useState(0);
  const [gamesPlayed, setGamesPlayed] = useState(0);
  const { score } = route.params;

  const updateGamesPlayed = () => {
    firebase
      .firestore()
      .collection("users")
      .doc(firebase.auth().currentUser.uid)
      .get()
      .then((snapshot) => {
        if (snapshot.exists) {
          setGamesPlayed(snapshot.data().gamesPlayed + 1);
          console.log(snapshot.data().gamesPlayed, "<<");
          return snapshot.data().gamesPlayed + 1;
        } else {
          console.log("User does not exist");
        }
      })
      .then((gamesPlayed) => {
        console.log(gamesPlayed);
        firebase
          .firestore()
          .collection("users")
          .doc(firebase.auth().currentUser.uid)
          .update({
            gamesPlayed: gamesPlayed,
          });
      });
  };

  const updateHighscore = () => {
    firebase
      .firestore()
      .collection("users")
      .doc(firebase.auth().currentUser.uid)
      .get()
      .then((snapshot) => {
        if (snapshot.exists) {
          setHighscore(snapshot.data().highscore);
          console.log(snapshot.data().gamesPlayed, "<<");
          console.log(gamesPlayed);
          return snapshot.data().highscore;
        } else {
          console.log("User does not exist");
        }
      })
      .then((highscore) => {
        console.log(highscore);
        if (highscore < score) {
          console.log(highscore, score, "Inside if statement <<<<");
          firebase
            .firestore()
            .collection("users")
            .doc(firebase.auth().currentUser.uid)
            .update({
              highscore: score,
            });
        }
      });
  };

  useEffect(() => {
    updateHighscore();
    updateGamesPlayed();
  }, []);

  return (
    <ImageBackground
      style={{
        height: "100%",
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
      }}
      source={require("../images/background1.jpeg")}
    >
      <View>
        <LottieView
          source={require("../assets/Animated/trophy-animation.json")}
          autoPlay
          loop
          style={{
            width: 300,
          }}
        />
      </View>
      <View>
        <Text style={styles.scoreText}>You scored</Text>
        <AnimateNumber
          style={styles.scoreText}
          value={score}
          timing="easeOut"
          formatter={(val) => {
            return parseFloat(val).toFixed(0);
          }}
        />
      </View>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("Dashboard")}
      >
        <Text
          style={{
            fontWeight: "bold",
            fontSize: 22,
            color: "white",
          }}
        >
          Try Again
        </Text>
      </TouchableOpacity>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  innerContainer: {
    height: 500,
    borderRadius: 20,
    width: 350,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    borderColor: "black",
    borderWidth: 0.25,
    opacity: 0.9,
  },
  button: {
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
    backgroundColor: "#2196F3",
  },
  scoreText: {
    fontSize: 34,
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  highscoreText: {
    fontSize: 22,
    color: "#026efd",
    fontWeight: "bold",
    textAlign: "center",
  },
  text: {
    fontSize: 25,
    fontWeight: "bold",
    color: "black",
  },
  button: {
    marginTop: 10,
    height: 70,
    width: 250,
    margin: 5,
    backgroundColor: "#026efd",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 50,
  },
});

export default Results;
