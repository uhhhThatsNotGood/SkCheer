import React, { useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  Alert,
  Pressable,
  ScrollView,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import AsyncStorage from "@react-native-async-storage/async-storage";
import AuthIn from "../components/AuthIn";
import { router } from "expo-router";
const App: React.FC = () => {
  const [Seat, setSeat] = useState<string>("");
  const [numSt, setnumSt] = useState<string>("");
  const isNumber = (input: string): boolean => {
    return /^\d{1,2}$/.test(input);
  };
  const isAlphabet = (input: string): boolean => {
    return /^[a-zA-Z]$/.test(input);
  };
  const checkInfo = () => {
    if (isNumber(numSt) && isAlphabet(Seat)) {
      router.replace("tabs/home");
    } else {
      Alert.alert("Error", "Incorrect Data");
    }
  };
  // const saveInfo = async () => {
  //   try {
  //     await AsyncStorage.setItem("Seat", Seat);
  //     await AsyncStorage.setItem("numSt", numSt);
  //     console.log("data written successfully");
  //   } catch (e) {
  //     console.error("hahaFailed", e);
  //   }
  // };
  // const loadInfo = async () => {
  //   try {
  //     const valSeat = await AsyncStorage.getItem("Seat");
  //     const valnumSt = await AsyncStorage.getItem("numSt");
  //     console.log("loadedEZ");
  //   } catch (e) {
  //     console.error("fuck", e);
  //   }
  // };

  return (
    <LinearGradient
      colors={["#0d3d6b", "#1a1a1a", "#800852"]}
      locations={[0, 0.6, 1]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      className="h-full"
    >
      <ScrollView>
        <SafeAreaView>
          <View className="items-center mt-[25%] mb-8">
            <Text className="text-7xl color-white font-bold ">
              Authenticate
            </Text>
          </View>

          <View className="items-center color-white">
            <AuthIn
              label="Seat"
              placehold="A"
              maxLen={1}
              states={Seat}
              dataType="default"
              setStates={setSeat}
            />
            <AuthIn
              label="Seat No."
              placehold="01"
              maxLen={2}
              states={numSt}
              dataType="numeric"
              setStates={setnumSt}
            />
          </View>
          <View className="items-center pt-16">
            <Pressable
              onPress={checkInfo}
              className="bg-[#402278] w-96 h-20 justify-center items-center rounded-lg"
            >
              <Text className="color-white text-2xl">Let's Go!</Text>
            </Pressable>
          </View>
        </SafeAreaView>
      </ScrollView>
    </LinearGradient>
  );
};

export default App;
