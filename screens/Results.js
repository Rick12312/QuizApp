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

const Results = ({ route }) => {
  const navigation = useNavigation();
  const [highscore, setHighscore] = useState(0);

  useEffect(() => {
    firebase
      .firestore()
      .collection("users")
      .doc(firebase.auth().currentUser.uid)
      .get()
      .then((snapshot) => {
        if (snapshot.exists) {
          setHighscore(snapshot.data().highscore);
          return highscore;
        } else {
          console.log("User does not exist");
        }
      })
      .then((highscore) => {
        if (score > highscore) {
          firebase
            .firestore()
            .collection("users")
            .doc(firebase.auth().currentUser.uid)
            .update({
              highscore: score,
            });
          setHighscore(score);
        }
      });
  }, []);

  const { score } = route.params;

  return (
    <ImageBackground
      source={require("../images/background5.jpeg")}
      style={{
        height: "100%",
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <View style={styles.innerContainer}>
        <View
          style={{
            width: "100%",
            height: 75,
            marginTop: -35,
            backgroundColor: "#026efd",
            borderTopRightRadius: 20,
            borderTopLeftRadius: 20,
          }}
        ></View>
        <View>
          {score > highscore ? (
            <View>
              <Image
                source={require("../images/trophy2.jpeg")}
                style={{
                  height: "50%",
                  resizeMode: "contain",
                }}
              />
              <Text style={styles.scoreText}>Congratulations</Text>
              <Text style={styles.scoreText}>You scored {score}</Text>
              <Text style={styles.scoreText}>New highscore!</Text>
            </View>
          ) : (
            <>
              <Image
                source={require("../images/facepalm.png")}
                style={{
                  height: "50%",
                  resizeMode: "contain",
                }}
              />
              <Text style={styles.scoreText}>Better luck next time</Text>
              <Text style={styles.scoreText}>You scored {score}</Text>
              <Text style={styles.scoreText}>Highscore {highscore}</Text>
            </>
          )}
        </View>

        <View>
          <TouchableOpacity
            onPress={() => navigation.navigate("Dashboard")}
            style={styles.button}
          >
            <Text style={{ fontSize: 24, fontWeight: "bold" }}>RETRY</Text>
          </TouchableOpacity>
        </View>
      </View>
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
  },
  button: {
    borderRadius: 20,
    elevation: 2,
    backgroundColor: "#2196F3",
  },
  scoreText: {
    fontSize: 20,
    color: "black",
    fontWeight: "bold",
    textAlign: "center",
  },
  text: {
    fontSize: 25,
    fontWeight: "bold",
    color: "black",
  },
  button: {
    height: 70,
    width: 290,
    backgroundColor: "#026efd",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 50,
  },
});

export default Results;
