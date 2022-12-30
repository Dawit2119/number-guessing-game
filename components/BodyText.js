import { View, Text, StyleSheet } from "react-native";
import React from "react";

const BodyText = ({ children, style }) => {
  return <Text style={{ ...styles.body, ...style }}>{children}</Text>;
};
const styles = StyleSheet.create({
  body: {
    fontFamily: "open-sans",
  },
});
export default BodyText;
