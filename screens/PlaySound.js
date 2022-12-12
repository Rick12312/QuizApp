import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { Audio } from "expo-av";
import { FontAwesome } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";

const PlaySound = () => {
  const [sound, setSound] = useState();

  const playSounds = async () => {
    console.log("Loading Sound");
    const { sound } = await Audio.Sound.createAsync(
      require("../assets/audio/ambient-background.wav")
    );
    setSound(sound);
    console.log("Playing Sound");
    await sound.playAsync();
  };

  const stopSound = async () => {
    console.log("Stop Sound");
    setSound("");
  };

  useEffect(() => {
    return sound
      ? () => {
          console.log("Unloading Sound");
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);

  if (!sound) {
    return (
      <SafeAreaView>
        <TouchableOpacity title="Play Sound" onPress={playSounds}>
          <FontAwesome name="volume-down" size={25} color="white" />
        </TouchableOpacity>
      </SafeAreaView>
    );
  } else if (sound) {
    return (
      <SafeAreaView styles={styles.container}>
        <TouchableOpacity title="Play Sound" onPress={stopSound}>
          <FontAwesome name="volume-up" size={25} color="white" />
        </TouchableOpacity>
      </SafeAreaView>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
  },
});

export default PlaySound;
