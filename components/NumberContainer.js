import { View, Text, StyleSheet } from "react-native";
import Colors from "../constants/colors";
const NumberContainer = ({ children }) => {
  return (
    <View style={styles.container}>
      <Text>{children}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderWidth: 2,
    borderColor: Colors.accent,
    padding: 10,
    marginVertical: 10,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
  },
  number: {
    color: Colors.accent,
    fontSize: 22,
    fontWeight: "bold",
  },
});

export default NumberContainer;
