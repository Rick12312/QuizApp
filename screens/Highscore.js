import React from "react";
import { Text, TouchableOpacity, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";

const Highscore = () => {
  const navigation = useNavigation();

  return (
    <SafeAreaView
      style={{ flex: 1, justifyContent: "flex-start", alignItems: "center" }}
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
      <Text>Highscore</Text>
      <TouchableOpacity onPress={() => navigation.navigate("Dashboard")}>
        <Text>Home</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default Highscore;
