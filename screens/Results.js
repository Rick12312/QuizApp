import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
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
          console.log(highscore, "<<< CL3");
          setHighscore(score);
          firebase
            .firestore()
            .collection("users")
            .doc(firebase.auth().currentUser.uid)
            .set({
              highscore: score,
            });
        }
      });
  }, []);

  const { score } = route.params;

  return (
    <View style={styles.container}>
      <Image source={require("../images/success.jpeg")} />
      <Text style={styles.scoreText}>You scored: {score} </Text>

      <Text style={{ fontSize: 16 }}>Current highscore: {highscore}</Text>

      <TouchableOpacity
        onPress={() => navigation.navigate("Dashboard")}
        style={{ marginTop: 20 }}
      >
        <Text style={styles.text}>Click here to try again</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: "lightgrey",
    borderRadius: 20,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    backgroundColor: "#2196F3",
  },
  scoreText: {
    marginTop: 15,
    fontSize: 20,
    color: "black",
    fontWeight: "bold",
    textAlign: "center",
  },
  text: {
    fontSize: 20,
    justifyContent: "center",
  },
});

export default Results;
