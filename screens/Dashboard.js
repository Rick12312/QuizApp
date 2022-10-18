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
import { getStorage, ref, getDownloadUrl } from "firebase/storage";
import { useNavigation } from "@react-navigation/native";
import { getAuth } from "@firebase/auth";

const Dashboard = () => {
  const navigation = useNavigation();
  const [user, setUser] = useState({});
  const [image, setImage] = useState(null);

  const storage = getStorage();
  const auth = getAuth();

  // const getImage = async () => {
  //   const storageRef = firebase.storage().ref();
  // };

  // firebase;
  // .firestore()
  // .collection("users")
  // .doc(firebase.auth().currentUser.uid)
  // .get()
  // .then((snapshot) => {
  //   if (snapshot.exists) {
  //     console.log(snapshot.data());
  //     setUser(snapshot.data());
  //   } else {
  //     console.log("User does not exist <<<<<<<");
  //   }
  // });

  useEffect(() => {
    firebase
      .firestore()
      .collection("users")
      .doc(firebase.auth().currentUser.uid)
      .get()
      .then((snapshot) => {
        if (snapshot.exists) {
          setUser(snapshot.data());
        } else {
          console.log("Data not found");
        }
      });
  }, []);

  return (
    <ImageBackground
      source={require("../images/background7.jpeg")}
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
        {image ? (
          <Image
            source={{ uri: image }}
            style={{
              width: 150,
              height: 150,
              borderRadius: 100,
              borderWidth: 0.2,
              borderColor: "grey",
            }}
          />
        ) : (
          <Image
            source={require("../images/astronaut.png")}
            style={{
              width: 150,
              height: 150,
              borderRadius: 100,
              borderWidth: 0.2,
              borderColor: "grey",
            }}
          />
        )}

        <Text
          style={{
            fontSize: 22,
            fontWeight: "bold",
            color: "white",
            marginBottom: -50,
          }}
        >
          Welcome, {user.firstName}
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
