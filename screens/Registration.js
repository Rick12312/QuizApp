import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Image,
  ImageBackground,
} from "react-native";
import { firebase } from "../config";
import { getStorage, uploadBytes, ref } from "firebase/storage";
import { useNavigation } from "@react-navigation/native";
// import * as ImagePicker from "expo-image-picker";
import ImagePickerUtil from "../utils/ImagePicker";

const Registration = () => {
  const [image, setImage] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [highscore, setHighscore] = useState(0);
  const [averageScore, setAverageScore] = useState(0);
  const [gamesPlayed, setGamesPlayed] = useState(0);
  const [avatar, setAvatar] = useState("");

  const storage = getStorage();

  const uploadImage = async () => {
    await firebase.auth().signInWithEmailAndPassword(email, password);
    const imageRef = ref(storage, `users/avatar`);
    const img = await fetch(image);
    const bytes = await img.blob();
    await uploadBytes(imageRef, bytes);
  };

  const navigation = useNavigation();

  const registerUser = async () => {
    await firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
        firebase
          .auth()
          .currentUser.sendEmailVerification({
            handleCodeInApp: true,
            url: "https://quizapp-5d90a.firebaseapp.com",
          })
          .then(() => {
            alert("Verification email sent");
          })
          .catch((error) => {
            alert(error.message);
          })
          .then(() => {
            firebase
              .firestore()
              .collection("users")
              .doc(firebase.auth().currentUser.uid)
              .set({
                firstName,
                lastName,
                email,
                highscore,
                gamesPlayed,
                averageScore,
                avatar,
              });
          })
          .catch((error) => {
            alert(error.message, "<<<<<");
          })
          .then(() => {
            uploadImage();
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  return (
    <ImageBackground
      source={require("../images/background1.jpeg")}
      style={{ height: "100%", width: "100%" }}
    >
      <View style={styles.container}>
        <Image
          source={require("../images/QuizLogo.png")}
          style={{
            width: "80%",
            resizeMode: "stretch",
            height: 70,
          }}
        />
        <View
          style={{
            marginTop: 20,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <ImagePickerUtil setImage={setImage} image={image} />

          <TextInput
            style={styles.textInput}
            placeholder="First Name"
            autoCapitalize="words"
            onChangeText={(firstName) => setFirstName(firstName)}
            autoCorrect={false}
          />
          <TextInput
            style={styles.textInput}
            placeholder="Last Name"
            autoCapitalize="words"
            onChangeText={(lastName) => setLastName(lastName)}
            autoCorrect={false}
          />
          <TextInput
            style={styles.textInput}
            placeholder="Email"
            onChangeText={(email) => setEmail(email)}
            autoCapitalize="none"
            autoCorrect={false}
            keyboardType="email-address"
          />
          <TextInput
            style={styles.textInput}
            placeholder="Password"
            onChangeText={(password) => setPassword(password)}
            autoCapitalize="none"
            autoCorrect={false}
            secureTextEntry={true}
          />
        </View>
        <View style={{ justifyContent: "space-between", flexDirection: "row" }}>
          <TouchableOpacity
            onPress={() => navigation.navigate("Login")}
            style={styles.button}
          >
            <Text style={{ fontWeight: "bold", fontSize: 22, color: "white" }}>
              Go Back
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              registerUser(email, password, firstName, lastName);
            }}
            style={styles.button}
          >
            <Text style={{ fontWeight: "bold", fontSize: 22, color: "white" }}>
              Submit
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
};

export default Registration;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  textInput: {
    paddingTop: 20,
    paddingBottom: 20,
    width: 300,
    fontSize: 20,
    borderBottomColor: "#000",
    marginBottom: 10,
    textAlign: "center",
    backgroundColor: "lightblue",
    borderRadius: 30,
  },
  button: {
    marginTop: 10,
    height: 70,
    width: 145,
    margin: 5,
    backgroundColor: "#026efd",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 50,
  },
});
