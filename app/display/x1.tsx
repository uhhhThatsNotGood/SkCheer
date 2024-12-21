import { View, SafeAreaView, Text, Pressable } from "react-native";
import React, { useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";

const x1 = () => {
  const [nthCode, setCode] = useState("0");
  return (
    <SafeAreaView className="flex-1">
      <LinearGradient
        colors={["#0d3d6b", "#1a1a1a", "#800852"]}
        locations={[0, 0.6, 1]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        className="flex-1 items-center"
      >
        <View className="bg-[#160229] border-white border-2 mt-[20%] w-48 h-24 items-center">
          <Text className="text-7xl color-white ">{nthCode}</Text>
        </View>
        <View className="flex-1 w-full">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 0].map((digit) => (
            <Pressable className="flex-row flex-wrap border-slate-300 border-2 width-24 h-24">
              <Text className="color-black text-xl">{digit}</Text>
            </Pressable>
          ))}
        </View>
      </LinearGradient>
    </SafeAreaView>
  );
};

export default x1;
