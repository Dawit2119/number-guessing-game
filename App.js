import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import Header from "./components/Header";
import StartGameScreen from "./Screens/StartGameScreen";
import GameScreen from "./Screens/GameScreen";
import { useCallback, useEffect, useState } from "react";
import GameOverScreen from "./Screens/GameOverScreen";
import * as Font from "expo-font";
import * as SplashScreen from "expo-splash-screen";
SplashScreen.preventAutoHideAsync();

export default function App() {
  const [dataLoaded, setDataLoaded] = useState(false);
  useEffect(() => {
    async function prepare() {
      try {
        await Font.loadAsync({
          "open-sans": require("./assets/fonts/OpenSans-Regular.ttf"),
          "open-sans-bold": require("./assets/fonts/OpenSans-Bold.ttf"),
        });
      } catch (error) {
        console.warn(error);
      } finally {
        setDataLoaded(true);
      }
    }
    prepare();
  }, []);
  const onLayoutRootView = useCallback(async () => {
    if (dataLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [dataLoaded]);

  const [userNumber, setUserNumber] = useState();
  const [guessRounds, setGuessRounds] = useState(0);
  const onStartGameHandler = (selectedNumber) => {
    setUserNumber(selectedNumber);
    setGuessRounds(0);
  };
  console.log("userNumber: ", userNumber);
  const gameOverHandler = (noOfRounds) => {
    setGuessRounds(noOfRounds);
  };
  let content = <StartGameScreen onStartGameHandler={onStartGameHandler} />;
  const onRestartGameHandler = () => {
    setUserNumber();
    setGuessRounds(0);
  };
  if (userNumber && guessRounds <= 0) {
    content = (
      <GameScreen userNumber={userNumber} onGameOver={gameOverHandler} />
    );
  }
  if (guessRounds > 0) {
    content = (
      <GameOverScreen
        userNumber={userNumber}
        rounds={guessRounds}
        onPress={setGuessRounds}
      />
    );
  }
  if (!dataLoaded) {
    return null;
  }
  return (
    <SafeAreaView style={styles.screen} onLayout={onLayoutRootView}>
      <Header title="Guess a Number!" />
      {content}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
});
