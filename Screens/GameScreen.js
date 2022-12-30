import { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Alert,
  FlatList,
  Dimensions,
} from "react-native";
import Card from "../components/Card";
import MainButton from "../components/MainButton";
import NumberContainer from "../components/NumberContainer";
import { Ionicons } from "@expo/vector-icons";
import BodyText from "../components/BodyText";
import * as ScreenOrientation from "expo-screen-orientation";
const generateRandomBetween = (min, max, exclude) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  const rndNum = Math.floor(Math.random() * (max - min) + min);
  if (rndNum == exclude) {
    return generateRandomBetween(min, max, exclude);
  }
  return rndNum;
};
const GameScreen = ({ userNumber, onGameOver }) => {
  // ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT);
  const firstGuess = generateRandomBetween(1, 100, userNumber);
  const [currentGuess, setCurrentGuess] = useState(firstGuess);
  const [pastGuesses, setPastGuesses] = useState([firstGuess]);
  const [availableDeviceHeight, setAvailableDeviceHeight] = useState(
    Dimensions.get("window").height
  );
  const [availableDeviceWidth, setAvailableDeviceWidth] = useState(
    Dimensions.get("window").width
  );
  const currentLow = useRef(1);
  const currentHigh = useRef(100);
  useEffect(() => {
    const updateLayout = () => {
      setAvailableDeviceHeight(Dimensions.get("window").height);
      setAvailableDeviceWidth(Dimensions.get("window").width);
    };
    const dimensionHandler = Dimensions.addEventListener(
      "change",
      updateLayout
    );
    return () => {
      dimensionHandler.remove();
    };
  });
  useEffect(() => {
    if (currentGuess == userNumber) {
      onGameOver(pastGuesses.length);
    }
  }, [userNumber, currentGuess, onGameOver]);
  const nextGuessHandler = (direction) => {
    if (
      (direction == "lower" && currentGuess < userNumber) ||
      (direction == "greater" && currentGuess > userNumber)
    ) {
      Alert.alert("Don't lie!", "You know that this is wrong...", [
        { title: "sorry", style: "cancel" },
      ]);
      return;
    } else if (direction == "lower") {
      currentHigh.current = currentGuess + 1;
    } else {
      currentLow.current = currentGuess;
    }
    const nextNum = generateRandomBetween(
      currentLow.current,
      currentHigh.current,
      currentGuess
    );
    setCurrentGuess(nextNum);
    setPastGuesses((currentGuess) => [nextNum, ...currentGuess]);
  };
  const renderedItem = (listLength, itemDta) => (
    <View style={styles.listItem}>
      <BodyText>#{listLength - itemDta.index} </BodyText>
      <BodyText>{itemDta.item}</BodyText>
    </View>
  );
  if (availableDeviceHeight < 500) {
    return (
      <View style={styles.screen}>
        <Text>Opponents's Guess</Text>
        <View style={styles.controls}>
          <MainButton onPress={nextGuessHandler.bind(this, "lower")}>
            <Ionicons name="remove-outline" size={24} />
          </MainButton>
          <NumberContainer>{currentGuess}</NumberContainer>
          <MainButton onPress={nextGuessHandler.bind(this, "greater")}>
            <Ionicons name="md-add" size={24} />
          </MainButton>
        </View>
        <View style={styles.listContainer}>
          {/* <ScrollView contentContainerStyle={styles.list}>
          {pastGuesses.map((guess, index) =>
            renderedItem(guess, pastGuesses.length - index, index)
          )}
        </ScrollView> */}
          <FlatList
            contentContainerStyle={styles.list}
            keyExtractor={(item) => item}
            data={pastGuesses}
            renderItem={renderedItem.bind(this, pastGuesses.length)}
          />
        </View>
      </View>
    );
  }
  let containerStyle = styles.listContainer;
  if (availableDeviceWidth > 350) {
    containerStyle = styles.listContainerBG;
  }
  return (
    <View style={styles.screen}>
      <Text>Opponents's Guess</Text>
      <NumberContainer>{currentGuess}</NumberContainer>
      <Card style={styles.buttonContainer}>
        <MainButton onPress={nextGuessHandler.bind(this, "lower")}>
          <Ionicons name="remove-outline" size={24} />
        </MainButton>
        <MainButton onPress={nextGuessHandler.bind(this, "greater")}>
          <Ionicons name="md-add" size={24} />
        </MainButton>
      </Card>
      <View style={containerStyle}>
        {/* <ScrollView contentContainerStyle={styles.list}>
          {pastGuesses.map((guess, index) =>
            renderedItem(guess, pastGuesses.length - index, index)
          )}
        </ScrollView> */}
        <FlatList
          contentContainerStyle={styles.list}
          keyExtractor={(item) => Math.random(1, 100) * item}
          data={pastGuesses}
          renderItem={renderedItem.bind(this, pastGuesses.length)}
        />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: "center",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: Dimensions.get("window").height > 600 ? 20 : 10,
    width: 300,
    maxWidth: "80%",
  },
  listContainer: {
    flex: 1,
    width: "80%",
  },
  listContainerBG: {
    flex: 1,
    width: "60%",
  },
  controls: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    width: "80%",
  },
  list: {
    flexGrow: 1,
    justifyContent: "flex-end",
  },
  listItem: {
    borderColor: "#ccc",
    borderWidth: 2,
    backgroundColor: "white",
    flexDirection: "row",
    padding: 15,
    marginVertical: 10,
    justifyContent: "space-between",
    width: "100%",
  },
});
export default GameScreen;
