import React, { useState, useEffect, useCallback } from "react";
import {
  SafeAreaView,
  View,
  Text,
  Alert,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import AsyncStorage from "@react-native-async-storage/async-storage";
import AuthIn from "../components/AuthIn";
import * as SplashScreen from "expo-splash-screen";
import { useRouter } from "expo-router";
import useFonts from "../hooks/useFonts";
import "../global.css";

SplashScreen.preventAutoHideAsync();

const App: React.FC = () => {
  const fontsLoaded = useFonts();
  const router = useRouter();
  const [seat, setSeat] = useState<string>("");
  const [position, setPosition] = useState<string>("");
  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  } else {
    SplashScreen.hideAsync();
  }

  const isNumber = (input: string): boolean => {
    return /^\d{1,2}$/.test(input);
  };
  const isAlphabet = (input: string): boolean => {
    input = input.toUpperCase();
    return /^[A-Z]$/.test(input);
  };
  const storeData = async (key: string, value: string) => {
    try {
      await AsyncStorage.setItem(key, value);
    } catch (e) {
      Alert.alert("Error", "Saving data failed");
    }
  };
  const readData = async (key: string) => {
    try {
      return await AsyncStorage.getItem(key);
    } catch (e) {
      Alert.alert("Error", "Retrieving data failed");
    }
  };

  const checkInfo = () => {
    if (
      isNumber(position) &&
      isAlphabet(seat) &&
      position !== "0" &&
      position !== "00"
    ) {
      storeData("seat", seat);
      storeData("position", position);
      storeData("isLoggedIn", "true");
      router.push("home");
    } else {
      Alert.alert("Error", "Incorrect Data");
    }
  };
  const checkFormerLogin = async () => {
    try {
      const formerData = await readData("isLoggedIn");
      if (!formerData) {
        Alert.alert("Error", "No previous data existed");
        return;
      }
      const seatVale = await readData("seat");
      const posValue = await readData("position");
      if (seatVale && posValue) {
        setSeat(seatVale);
        setPosition(posValue);
        console.log("Susccessful", seatVale, posValue);
        router.push("home");
      } else {
        Alert.alert("Error", "Data not found");
      }
    } catch (e) {
      Alert.alert("Error", "Error loading previous data");
    }
  };

  return (
    <LinearGradient
      onLayout={onLayoutRootView}
      colors={["#0d3d6b", "#1a1a1a", "#800852"]}
      locations={[0, 0.6, 1]}
      className="h-full flex-1"
    >
      <ScrollView>
        <SafeAreaView>
          <View className="items-center mt-[20%] ">
            <Text className="text-6xl color-white font-SpGtskSMBold ">
              Authenticate
            </Text>
          </View>

          <View className="items-center color-white">
            <AuthIn
              label="Seat"
              placehold="A"
              maxLen={1}
              states={seat}
              dataType="default"
              setStates={setSeat}
            />
            <AuthIn
              label="Seat No."
              placehold="01"
              maxLen={2}
              states={position}
              dataType="numeric"
              setStates={setPosition}
            />
          </View>
          <View className="items-center pt-16">
            <TouchableOpacity
              onPress={checkInfo}
              className="bg-[#552ba4] w-72 h-20 justify-center items-center rounded-lg"
            >
              <Text className="color-white text-3xl font-SpGtskSMBold">
                Let's Go!
              </Text>
            </TouchableOpacity>
          </View>
          <View className="items-center pt-8">
            <TouchableOpacity
              onPress={checkFormerLogin}
              className="bg-[#552ba4] w-72 h-20 justify-center items-center rounded-lg"
            >
              <Text className="color-white text-2xl font-SpGtskMid ">
                Use previous Data.
              </Text>
            </TouchableOpacity>
          </View>
          <View className="items-center pt-8">
            <TouchableOpacity
              className="bg-[#AA0000] rounded-lg 
          items-center  w-72 h-16 justify-center"
              onPress={() => {
                AsyncStorage.clear();
                Alert.alert("Cleared Data Succesfully");
              }}
            >
              <Text className="text-2xl color-white font-SpGtskMid">
                Clear Login Data
              </Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </ScrollView>
    </LinearGradient>
  );
};

export default App;
