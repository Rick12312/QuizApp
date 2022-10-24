import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  Image,
  StyleSheet,
  ImageBackground,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { firebase } from "../config";
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import { getAuth } from "@firebase/auth";
import { ActivityIndicator } from "react-native";

const Highscore = () => {
  const navigation = useNavigation();
  const [highscore, setHighscore] = useState(0);
  const [gamesPlayed, setGamesPlayed] = useState(0);
  const [avgScore, setAvgScore] = useState(0);
  const [image, setImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const storage = getStorage();
  const auth = getAuth();

  const getImage = async () => {
    const user = firebase.auth().currentUser;
    const imageRef = ref(storage, `users/${user.uid}/avatar_200x200.jpeg`);
    await getDownloadURL(imageRef).then((result) => {
      setImage(result);
      setIsLoading(false);
    });
  };

  const getHighscore = async () => {
    firebase
      .firestore()
      .collection("users")
      .doc(firebase.auth().currentUser.uid)
      .get()
      .then((snapshot) => {
        if (snapshot.exists) {
          setHighscore(snapshot.data().highscore);
          setAvgScore(snapshot.data().averageScore);
          setGamesPlayed(snapshot.data().gamesPlayed);
        } else {
          console.log("User does not exist");
        }
      });
  };

  useEffect(() => {
    getImage();
    getHighscore();
  }, []);

  if (isLoading) {
    return (
      <ImageBackground
        source={require("../images/background7.jpeg")}
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

  if (!isLoading) {
    return (
      <ImageBackground
        style={{ height: "100%", width: "100%" }}
        source={require("../images/background7.jpeg")}
      >
        <SafeAreaView style={styles.container}>
          <View
            style={{
              maxHeight: 500,
              width: 350,
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "white",
              borderRadius: 50,
              borderColor: "black",
              borderWidth: 0.5,
              opacity: 0.9,
            }}
          >
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
              source={{ uri: image }}
              style={{
                width: 150,
                height: 150,
                borderRadius: 100,
                marginBottom: 10,
                marginTop: -15,
              }}
            />
            <Text style={styles.text}>
              Highscore <Text style={{ fontWeight: "bold" }}>{highscore}</Text>
            </Text>
            <Text style={styles.text}>
              Games Played{" "}
              <Text style={{ fontWeight: "bold" }}>{gamesPlayed}</Text>
            </Text>
            <Text style={styles.text}>
              Average Score{" "}
              <Text style={{ fontWeight: "bold" }}>{avgScore}</Text>
            </Text>
            <Text style={styles.text}></Text>

            <TouchableOpacity
              style={styles.button}
              onPress={() => navigation.navigate("Dashboard")}
            >
              <Text style={styles.buttonText}>Home</Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </ImageBackground>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    height: 70,
    width: 290,
    backgroundColor: "#026efd",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 50,
  },
  buttonText: {
    fontSize: 22,
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  text: {
    fontSize: 20,
    color: "black",
    textAlign: "center",
  },
});

export default Highscore;
