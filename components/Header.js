import { View, Text, StyleSheet, Platform } from "react-native";
import Colors from "../constants/colors";
import TitleText from "./TitleText";
const Header = ({ title }) => {
  return (
    <View
      style={{
        ...styles.headerBase,
        ...Platform.select({
          ios: styles.headerIos,
          android: styles.headerAndroid,
        }),
      }}
    >
      <TitleText style={styles.headerTitle}>{title}</TitleText>
    </View>
  );
};
4;
const styles = StyleSheet.create({
  headerBase: {
    width: "100%",
    height: 90,
    paddingTop: 36,
    alignItems: "center",
    justifyContent: "center",
  },
  headerIos: {
    backgroundColor: "white",
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  headerAndroid: {
    backgroundColor: Colors.primary,
  },
  headerTitle: {
    color: Platform.OS == "android" ? "white" : Colors.primary,
    fontSize: 18,
  },
});
export default Header;
