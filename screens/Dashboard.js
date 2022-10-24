import React, { useState, useEffect } from "react";
import {
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Image,
  View,
  ImageBackground,
} from "react-native";
import { firebase } from "../config";
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import { useNavigation } from "@react-navigation/native";
import { getAuth } from "@firebase/auth";
import { ActivityIndicator } from "react-native";

const Dashboard = () => {
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState({});
  const [image, setImage] = useState(null);

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

  const getData = async () => {
    firebase
      .firestore()
      .collection("users")
      .doc(firebase.auth().currentUser.uid)
      .get()
      .then((data) => {
        if (data) setUser(data.data());
        else console.log("no registered user");
      })
      .then(() => {
        getImage();
      });
  };

  useEffect(() => {
    getData();
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
          <Image
            source={{ uri: image }}
            style={{
              width: 150,
              height: 150,
              borderRadius: 100,
            }}
          />
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
            onPress={() => navigation.navigate("Profile")}
            style={styles.button}
          >
            <Text style={{ fontSize: 24, fontWeight: "bold", color: "white" }}>
              Profile
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
  }
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
