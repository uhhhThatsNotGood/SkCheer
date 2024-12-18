import { View, Text, TextInput } from "react-native";
import React from "react";

interface AuthInProps {
  label: string;
  states: string;
  setStates: React.Dispatch<React.SetStateAction<string>>;
}

const AuthIn: React.FC<AuthInProps> = ({ label, states, setStates }) => {
  return (
    <View className="items-center">
      <Text className="color-white p-5 text-2xl">{label}</Text>
      <TextInput
        className="border-2 focus:bg-slate-950/90 focus:border-0 focus:scale-110 border-white w-48 h-16 rounded-lg m-auto text-center color-white"
        placeholder="A"
        value={states}
        onChangeText={setStates}
        maxLength={1}
        placeholderTextColor={"#808080"}
      />
    </View>
  );
};

export default AuthIn;
