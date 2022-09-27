import React from "react";
import { View, Text, StyleSheet } from "react-native";

const Header = (props) => {
  return (
    <View style={styles.container}>
      <Text style={{ fontWeight: "bold", fontSize: 28 }}>{props.name}</Text>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {},
});
