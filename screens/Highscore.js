import React, { useState } from "react";
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

const Highscore = () => {
  const navigation = useNavigation();
  const [highscore, setHighscore] = useState(0);
  const [gamesPlayed, setGamesPlayed] = useState(0);
  const [avgScore, setAvgScore] = useState(0);

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
            source={require("../images/avatar.jpeg")}
            style={{
              width: 150,
              height: 150,
              borderRadius: 100,
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
            Average Score <Text style={{ fontWeight: "bold" }}>{avgScore}</Text>
          </Text>
          <Text style={styles.text}></Text>

          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate("Dashboard")}
          >
            <Text style={styles.buttonText}>HOME</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
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
