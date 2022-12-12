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
import { useNavigation } from "@react-navigation/native";
import { getAuth } from "@firebase/auth";
import PlaySound from "./PlaySound";

const auth = getAuth();

const Dashboard = () => {
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState("");
  const [sound, setSound] = useState();

  // const [image, setImage] = useState(null);

  // const storage = getStorage();

  // const getImage = async () => {
  //   const user = firebase.auth().currentUser;
  //   const imageRef = ref(storage, `users/${user.uid}/avatar_150x150.jpeg`);
  //   await getDownloadURL(imageRef).then((result) => {
  //     setImage(result);
  //     setIsLoading(false);
  //   });
  // };

  const changePassword = async () => {
    firebase
      .auth()
      .sendPasswordResetEmail(firebase.auth().currentUser.email)
      .then(() => {
        alert("Password reset email sent");
      })
      .catch((err) => {
        alert(err);
      });
  };

  // const getData = async () => {
  //   firebase
  //     .firestore()
  //     .collection("users")
  //     .doc(firebase.auth().currentUser.uid)
  //     .get()
  //     .then((data) => {
  //       if (data) {
  //         console.log(data.data());
  //         setUser(data.data());
  //       } else console.log("no registered user");
  //     })
  //     .then(() => {
  //       setIsLoading(false);
  //     });
  // };

  const getData = async () => {
    firebase
      .firestore()
      .collection("users")
      .doc(firebase.auth().currentUser.uid)
      .get()
      .then((snapshot) => {
        if (snapshot.exists) {
          setUser(snapshot.data().firstName);
          setIsLoading(false);
        } else {
          console.log("User does not exist");
        }
      });
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <ImageBackground
      source={require("../images/background2.jpeg")}
      style={{ height: "100%", width: "100%" }}
    >
      <View
        style={{
          paddingBottom: -10,
          paddingLeft: 25,
        }}
      >
        <PlaySound sound={sound} setSound={setSound} />
      </View>
      <SafeAreaView style={styles.container}>
        <Image
          source={require("../images/QuizLogo.png")}
          style={{
            width: "80%",
            resizeMode: "stretch",
            height: 65,
            marginBottom: 20,
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
          Welcome, {user}
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
          style={[styles.button, styles.shadowProp]}
        >
          <Text style={{ fontSize: 24, fontWeight: "bold", color: "white" }}>
            Sign Out
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            changePassword();
          }}
        >
          <Text
            style={{
              marginTop: 20,
              fontSize: 16,
              fontWeight: "bold",
              color: "white",
            }}
          >
            Change Password
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
  shadowProp: {
    shadowColor: "#171717",
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
});
