import React from "react";
import { SafeAreaView, Text, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

const Highscore = () => {
  const navigation = useNavigation();

  return (
    <SafeAreaView>
      <Text>Highscore</Text>
      <TouchableOpacity onPress={() => navigation.navigate("Dashboard")}>
        <Text>Home</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default Highscore;
