import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  StyleSheet,
  Image,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { firebase } from "../config";
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import { getAuth } from "@firebase/auth";

const Profile = () => {
  const navigation = useNavigation();
  const [image, setImage] = useState(null);

  const storage = getStorage();
  const auth = getAuth();

  const getImage = async () => {
    const user = firebase.auth().currentUser;
    const imageRef = ref(storage, `users/${user.uid}/avatar.jpg`);
    await getDownloadURL(imageRef).then((result) => {
      setImage(result);
    });
  };

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

  useEffect(() => {
    getImage();
  }, [image]);

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
        <Image
          source={{ uri: image }}
          style={{
            width: 150,
            height: 150,
            borderRadius: 100,
          }}
        />
        <TouchableOpacity style={styles.button}>
          <Text style={{ fontSize: 22, fontWeight: "bold", color: "white" }}>
            Change Avatar
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            changePassword();
          }}
        >
          <Text style={{ fontSize: 22, fontWeight: "bold", color: "white" }}>
            Change Password
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("Dashboard")}
        >
          <Text style={{ fontSize: 22, fontWeight: "bold", color: "white" }}>
            Home
          </Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

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
});

export default Profile;
