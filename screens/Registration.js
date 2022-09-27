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
import { useNavigation } from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";
import { getStorage, uploadBytes, ref as pickref } from "@firebase/storage";

const Registration = () => {
  const [image, setImage] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [highscore, setHighscore] = useState(0);

  const storage = getStorage();

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    console.log(result, result.uri, "<<<<<<<<<<<<<<<");
    if (!result.cancelled) {
      setImage(result.uri);
    }
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
              });
          })
          .catch((error) => {
            alert(error.message);
          });
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  return (
    <ImageBackground
      source={require("../images/background2.jpeg")}
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
          {image ? (
            <Image
              source={{ uri: image }}
              style={{
                width: 100,
                height: 100,
                borderRadius: 150,
                marginBottom: 5,
              }}
            />
          ) : (
            <Image
              source={require("../images/avatar.jpeg")}
              style={{
                width: 100,
                height: 100,
                borderRadius: 150,
                marginBottom: 5,
              }}
            />
          )}

          <TouchableOpacity
            styles={{ paddingBottom: 10 }}
            onPress={() => pickImage()}
          >
            <Text
              style={{
                fontSize: 16,
                marginBottom: 5,
                color: "white",
                fontWeight: "bold",
              }}
            >
              Upload an avatar image
            </Text>
          </TouchableOpacity>

          <TextInput
            style={styles.textInput}
            placeholder="First Name"
            onChangeText={(firstName) => setFirstName(firstName)}
            autoCorrect={false}
          />
          <TextInput
            style={styles.textInput}
            placeholder="Last Name"
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
            onPress={() => registerUser(email, password, firstName, lastName)}
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
