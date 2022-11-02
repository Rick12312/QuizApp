import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  ImageBackground,
  TouchableOpacity,
  StyleSheet,
  Image,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { firebase } from "../config";
import { getStorage, ref, getDownloadURL, uploadBytes } from "firebase/storage";
import { getAuth } from "@firebase/auth";

const Profile = () => {
  return;
  <View>
    <ScrollView>
      <View
        style={{
          padding: 10,
          width: "100%",
          backgroundColor: "#000",
          height: 150,
        }}
      ></View>
    </ScrollView>
  </View>;
};

export default Profile;
