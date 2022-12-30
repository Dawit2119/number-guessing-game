import { View, Text, StyleSheet } from "react-native";

const Card = ({ children, style }) => {
  return <View style={{ ...styles.card, ...style }}>{children}</View>;
};
const styles = StyleSheet.create({
  card: {
    backgroundColor: "white",
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.26,
    shadowRadius: 6,
    elevation: 6,
    padding: 20,
    borderRadius: 10,
  },
});
export default Card;
