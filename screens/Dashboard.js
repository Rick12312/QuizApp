import React, { useState, useEffect } from "react";
import {
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Image,
  ImageBackground,
} from "react-native";
import { firebase } from "../config";
import { useNavigation } from "@react-navigation/native";

const Dashboard = () => {
  const navigation = useNavigation();
  const [name, setName] = useState("");

  useEffect(() => {
    firebase
      .firestore()
      .collection("users")
      .doc(firebase.auth().currentUser.uid)
      .get()
      .then((snapshot) => {
        if (snapshot.exists) {
          console.log(snapshot.data());
          setName(snapshot.data().firstName);
          console.log(name);
        } else {
          console.log("User does not exist <<<<<<<");
        }
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <ImageBackground
      source={require("../images/background6.jpeg")}
      style={{ height: "100%", width: "100%" }}
    >
      <SafeAreaView style={styles.container}>
        <Image
          source={require("../images/QuizLogo.png")}
          style={{
            width: "80%",
            resizeMode: "stretch",
            height: 70,
            marginBottom: 20,
          }}
        />
        <Image
          source={require("../images/avatar.webp")}
          style={{ width: 150, height: 150, borderRadius: 100 }}
        />
        <Text
          style={{
            fontSize: 20,
            fontWeight: "bold",
            color: "white",
            marginBottom: -50,
          }}
        >
          Welcome, {name}
        </Text>
        <Text style={{ fontSize: 20 }}></Text>
        <TouchableOpacity
          onPress={() => navigation.navigate("Quiz")}
          style={styles.startBtn}
        >
          <Text style={{ fontSize: 24, fontWeight: "bold", color: "white" }}>
            Start
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate("Highscore")}
          style={styles.button}
        >
          <Text style={{ fontSize: 24, fontWeight: "bold", color: "white" }}>
            Highscore
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            firebase.auth().signOut();
          }}
          style={styles.button}
        >
          <Text style={{ fontSize: 24, fontWeight: "bold", color: "white" }}>
            Sign Out
          </Text>
        </TouchableOpacity>
      </SafeAreaView>
    </ImageBackground>
  );
};

export default Dashboard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    marginTop: 30,
    height: 70,
    width: 250,
    backgroundColor: "#026efd",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 50,
  },
  startBtn: {
    marginTop: 50,
    height: 70,
    width: 250,
    backgroundColor: "green",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 50,
  },
});
