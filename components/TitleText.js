import { View, Text, StyleSheet } from "react-native";
import React from "react";

const TitleText = ({ children, style }) => {
  return <Text style={{ ...styles.title, ...style }}>{children}</Text>;
};
const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    fontFamily: "open-sans-bold",
  },
});
export default TitleText;
