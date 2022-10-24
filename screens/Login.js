import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Image,
  ImageBackground,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { firebase } from "../config";

const Login = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const forgotPassword = () => {
    firebase
      .auth()
      .sendPasswordResetEmail(email)
      .then(() => {
        alert("Password reset email sent");
      })
      .catch((err) => {
        alert("Enter a valid email address");
      });
  };

  loginUser = async (email, password) => {
    try {
      await firebase.auth().signInWithEmailAndPassword(email, password);
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <ImageBackground
      source={require("../images/background1.jpeg")}
      style={{ width: "100%", height: "100%" }}
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
        <View style={{ marginTop: 40 }}>
          <TextInput
            style={styles.textInput}
            placeholder="Email"
            onChangeText={(email) => setEmail(email)}
            autoCapitalize="none"
            autoCorrect={false}
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
        <TouchableOpacity
          onPress={() => loginUser(email, password)}
          style={styles.button}
        >
          <Text style={{ fontWeight: "bold", fontSize: 22, color: "white" }}>
            Login
          </Text>
        </TouchableOpacity>
        <View style={{ padding: 10 }}></View>
        <TouchableOpacity
          onPress={() => navigation.navigate("Registration")}
          style={{ marginTop: 20 }}
        >
          <Text style={{ fontWeight: "bold", fontSize: 16, color: "white" }}>
            Don't have an account? Register
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => forgotPassword()}
          style={{ marginTop: 20 }}
        >
          <Text style={{ fontWeight: "bold", fontSize: 16, color: "white" }}>
            Forgot Password?
          </Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
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
    height: 70,
    width: 300,
    backgroundColor: "#026efd",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 50,
  },
});
