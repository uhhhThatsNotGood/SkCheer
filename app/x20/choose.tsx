import { View, Text, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import "../../global.css";

const x20 = () => {
  const router = useRouter();
  const [input, setinput] = useState<string>("");
  const adding = (value: string) => {
    if (input.length < 2) {
      setinput((prev) => prev + value);
    }
  };
  const delButton = () => {
    setinput((prev) => prev.slice(0, -1));
  };
  const checkID = () => {
    const id = parseInt(input, 10);
    router.push(`../x20/${id}`);
  };
  return (
    <LinearGradient
      colors={["#0d3d6b", "#1a1a1a", "#800852"]}
      locations={[0, 0.6, 1]}
      className="h-full flex-1"
    >
      <SafeAreaView>
        <View className="mt-[15%] items-center">
          <Text className="text-5xl text-white font-SpGtskMid mt-2">
            ( 1 : 20 )
          </Text>
          <Text className="text-8xl m-4 text-white font-SpGtskSMBold p-2 mt-2">
            {input || "_ _"}
          </Text>
        </View>
        <View className="items-center">
          <View className="flex-row flex-wrap justify-center w-80">
            {["1", "2", "3", "4", "5", "6", "7", "8", "9"].map((num, index) => (
              <TouchableOpacity
                key={num}
                className={`w-24 h-24 ${
                  (index + 1) % 3 == 2 ? "ml-4 mr-4" : ""
                } my-2 justify-center items-center bg-gray-800 rounded-lg border-2 border-gray-400`}
                onPress={() => adding(num)}
              >
                <Text className="text-5xl font-SpGtskSMBold pt-4 text-white">
                  {num}
                </Text>
              </TouchableOpacity>
            ))}
            <View className="w-24 h-24 mt-2 " />
            <TouchableOpacity
              className="w-24 h-24 mt-2 ml-4 mr-4 justify-center items-center bg-gray-800 rounded-lg border-2 border-gray-400"
              onPress={() => adding("0")}
            >
              <Text className="text-5xl font-SpGtskSMBold pt-4 text-white">
                0
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              className="w-24 h-24 mt-2 justify-center items-center bg-gray-800 rounded-lg border-2 border-gray-400"
              onPress={delButton}
            >
              <Text className="text-5xl font-SpGtskSMBold pt-4 text-white">
                {"<"}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <View className="mt-8 items-center">
          <TouchableOpacity
            className="w-80 bg-[#552ba4] justify-center items-center rounded-lg h-28 "
            onPress={checkID}
          >
            <Text className="font-SpGtskMid text-5xl color-white">Go</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
      <TouchableOpacity
        onPress={() => router.back()}
        className="absolute bottom-3 left-3 m-7 rounded-xl"
      >
        <Text className="text-3xl text-white">{"<"}Back</Text>
      </TouchableOpacity>
    </LinearGradient>
  );
};

export default x20;
