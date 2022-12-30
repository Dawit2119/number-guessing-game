import { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
  Dimensions,
  ScrollView,
  KeyboardAvoidingView,
} from "react-native";
import Card from "../components/Card";
import Input from "../components/Input";
import MainButton from "../components/MainButton.android";
import NumberContainer from "../components/NumberContainer";
import Colors from "../constants/colors";
import { defaultStyles } from "../constants/styles";
const StartGameScreen = (props) => {
  const [inputValue, setInputValue] = useState("");
  const [confirmed, setConfirmed] = useState(false);
  const [selectedNumber, setSelectedNumber] = useState();
  const [buttonWidth, setButtonWidth] = useState(
    Dimensions.get("window").width / 4
  );

  const onChangeText = (text) => {
    setInputValue(text.replace(/[^0-9]/g, ""));
  };
  const resetInputHandler = () => {
    setInputValue("");
    setConfirmed(false);
  };
  useEffect(() => {
    const updateLayout = () => {
      setButtonWidth(Dimensions.get("window").width / 4);
    };
    const dimensionHandler = Dimensions.addEventListener(
      "change",
      updateLayout
    );
    return () => {
      dimensionHandler.remove();
    };
  });
  const confirmInputHandler = () => {
    const selectedNumber = parseInt(inputValue);
    if (isNaN(selectedNumber) || selectedNumber <= 0 || selectedNumber > 99) {
      Alert.alert("Invalid Number!", "The number should be between 1 and 99", [
        { text: "okay", style: "destructive", onPress: resetInputHandler },
      ]);
      return;
    }
    setConfirmed(true);
    setInputValue("");
    setSelectedNumber(selectedNumber);
    Keyboard.dismiss();
  };
  let confirmedOutput;
  if (confirmed) {
    confirmedOutput = (
      <Card style={styles.summaryContainer}>
        <Text>You Selected</Text>
        <NumberContainer>{selectedNumber}</NumberContainer>
        <MainButton
          onPress={() => {
            props.onStartGameHandler(selectedNumber);
          }}
        >
          START GAME
        </MainButton>
        {/* <Button
          title="START GAME"
          onPress
        /> */}
      </Card>
    );
  }
  return (
    <ScrollView>
      <KeyboardAvoidingView behavior="position" keyboardVerticalOffset={30}>
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
          <View style={styles.screen}>
            <Text style={defaultStyles.title}>Start a Game</Text>
            <Card
              style={{
                width: "80%",
                minWidth: 300,
                alignItems: "center",
              }}
            >
              <Text style={defaultStyles.body}>Select a Number</Text>
              <Input
                value={inputValue}
                onChangeText={onChangeText}
                blurOnSubmit
                autoCapitalize="none"
                autoCorrect={false}
                keyboardType="number-pad"
                maxLength={2}
                style={styles.input}
              />
              <View style={styles.buttonContainer}>
                <View
                  style={{
                    width: buttonWidth,
                  }}
                >
                  <Button
                    title="Reset"
                    onPress={resetInputHandler}
                    color={Colors.accent}
                  />
                </View>
                <View
                  style={{
                    width: buttonWidth,
                  }}
                >
                  <Button
                    title="Confirm"
                    onPress={confirmInputHandler}
                    color={Colors.primary}
                  />
                </View>
              </View>
            </Card>
            {confirmedOutput}
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  screen: {
    flex: 1,
    margin: 10,
    alignItems: "center",
  },
  buttonContainer: {
    flexDirection: "row",
    width: "80%",
    justifyContent: "space-between",
    paddingHorizontal: 15,
  },
  // button: {
  //   width: buttonWidth,
  // },
  input: {
    width: 50,
    textAlign: "center",
  },
  summaryContainer: {
    marginTop: 10,
    padding: 10,
    alignItems: "center",
  },
});
export default StartGameScreen;
