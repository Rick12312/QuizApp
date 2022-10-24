import React, { useState, useEffect } from "react";
import {
  Pressable,
  Image,
  View,
  Platform,
  StyleSheet,
  Text,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
// import Resizer from "react-image-file-resizer";

export default ImagePickerUtil = ({ image, setImage }) => {
  useEffect(() => {
    (async () => {
      if (Platform.OS !== "web") {
        const { status } =
          await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted") {
          alert("Sorry, we need camera roll permissions to make this work!");
        }
      }
    })();
  }, []);

  // const resizeFile = (file) =>
  //   new Promise((resolve) => {
  //     Resizer.imageFileResizer(
  //       file,
  //       300,
  //       300,
  //       "JPEG",
  //       100,
  //       0,
  //       (uri) => {
  //         resolve(uri);
  //       },
  //       "base64"
  //     );
  //   });

  // const onChange = async (event) => {
  //   try {
  //     const file = event.target.files[0];
  //     const image = await resizeFile(file);
  //     console.log(image);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setImage(result.uri);
      console.log(result.uri);
    }
  };

  return (
    <View style={styles.container}>
      {image && (
        <Image
          source={{ uri: image }}
          style={{
            width: 150,
            height: 150,
            borderRadius: 100,
            borderWidth: 0.1,
            borderColor: "black",
          }}
        />
      )}

      <Pressable
        style={styles.imagePicker}
        title="Pick an image"
        onPress={pickImage}
      >
        <Text style={styles.imageButtonText}>Choose profile picture</Text>
      </Pressable>
    </View>
  );
};
const styles = StyleSheet.create({
  imagePicker: {
    textAlign: "center",
    padding: 10,
  },
  container: {
    width: "100%",
    alignItems: "center",
  },
  imageButtonText: {
    fontWeight: "bold",
    fontSize: 20,
    color: "white",
  },
});
