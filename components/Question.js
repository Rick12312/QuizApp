import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";

const Question = (props) => {
  console.log(props);
  const question = props.question;
  const option = props.option;
  return (
    <View>
      <TouchableOpacity
        disabled={isButtonDisabled}
        style={
          option === question.correctAnswer
            ? optionStyles(correctColor)
            : optionStyles(myColor)
        }
        onPress={() => handleSelectedOption(option)}
      >
        <Text style={{ padding: 10, fontSize: 16, fontWeight: "bold" }}>
          {option}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default Question;
