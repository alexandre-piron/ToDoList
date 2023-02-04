import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const CheckBox = (props) => {
  return (
    <View style={{ flexDirection: "row", marginVertical: 3 }}>
      <TouchableOpacity
        style={{
          width: 20,
          height: 20,
          justifyContent: "center",
          alignItems: "center",
          borderWidth: 1.5,
          borderRadius:20,
          borderColor: "#fff",
        }}
        onPress={props.handleClick}
      >
        {props.checked && (
          <Ionicons name="radio-button-on-outline" size={15} color="#fff" />
        )}
      </TouchableOpacity>
      <Text style={{ marginLeft: 5, color:"#fff" }}>{props.label}</Text>
    </View>
  );
};

export  { CheckBox };
