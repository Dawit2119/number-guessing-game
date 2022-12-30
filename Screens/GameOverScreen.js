import {
  View,
  Text,
  StyleSheet,
  Button,
  Image,
  Dimensions,
  ScrollView,
} from "react-native";
import Colors from "../constants/colors";
import BodyText from "../components/BodyText";
import TitleText from "../components/TitleText";
import colors from "../constants/colors";
import MainButton from "../components/MainButton.android";
const GameOverScreen = ({ userNumber, rounds, onPress }) => {
  return (
    <ScrollView>
      <View style={styles.screen}>
        <TitleText>Game Over</TitleText>
        <View style={styles.imageContainer}>
          <Image
            source={require("../assets/images/success.png")}
            style={styles.image}
            resizeMode="cover"
          />
          {/* <Image
          source={{
            uri: "https://pixabay.com/images/id-5597527/",
          }} */}
          {/* /> */}
        </View>
        <BodyText style={styles.resultText}>
          Your phone needed <Text style={styles.highLight}>{rounds}</Text>{" "}
          rounds to guess the number{" "}
          <Text style={styles.highLight}>{userNumber}</Text>
        </BodyText>
        <MainButton onPress={onPress}>New Game</MainButton>
      </View>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    // paddingVertical: 10,
  },
  buttonContainer: {
    width: 80,
    marginVertical: Dimensions.get("window").height / 30,
  },
  image: {
    width: "100%",
    height: "100%",
  },
  imageContainer: {
    height: Dimensions.get("window").width * 0.5,
    width: Dimensions.get("window").width * 0.5,
    borderRadius: (Dimensions.get("window").width * 0.5) / 2,
    borderColor: "green",
    borderWidth: 3,
    overflow: "hidden",
    marginVertical: Dimensions.get("window").height / 60,
  },
  highLight: {
    color: colors.primary,
  },
  resultText: {
    textAlign: "center",
    fontSize: Dimensions.get("window").width > 400 ? 20 : 16,
    marginHorizontal: 20,
  },
});
export default GameOverScreen;
