import { View, SafeAreaView, ScrollView, Alert, Text } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useLocalSearchParams } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState, useEffect } from "react";
import * as FileSystem from "expo-file-system";
import { Asset } from "expo-asset";

import "../../global.css";

import {
  decodeB64ToUint8,
  getRowSize,
  getPixel,
  seatToIndex,
  posToIndex,
  printHexSnippet,
  colorToNameX1,
} from "../../hooks/BMPutils";

const imageMapX1: { [key: string]: any } = {
  "1": require("../../assets/x1/image1.bmp"),
  "2": require("../../assets/x1/image2.bmp"),
  "3": require("../../assets/x1/image3.bmp"),
};

const X1display = () => {
  const { id } = useLocalSearchParams();
  const [pixelColor, setPixelColor] = useState<string | null>(null);
  const [seat, setSeat] = useState<string>("");
  const [position, setPosition] = useState<string>("");

  const LoadSeatPosition = async () => {
    try {
      const s = await AsyncStorage.getItem("Seat");
      const p = await AsyncStorage.getItem("Position");
      if (s) setSeat(s);
      if (p) setPosition(p);
    } catch (e) {
      console.log(e, "ErrorLoadingSeatPosition");
    }
  };

  const LoadPixelAndCache = async (id: string, s: string, p: string) => {
    if (!id || !s || !p) return;
    const cachedKeys = `x1-${id}-${s}-${p}`;
    try {
      const cachedColors = await AsyncStorage.getItem(cachedKeys);
      if (cachedColors) {
        setPixelColor(cachedColors);
        return;
      }
      const asset = Asset.fromModule(imageMapX1[id]);
      await asset.downloadAsync();
      const fileUri = asset.localUri!;
      const b64Data = await FileSystem.readAsStringAsync(fileUri, {
        encoding: FileSystem.EncodingType.Base64,
      });
      const bmpData = decodeB64ToUint8(b64Data);
      printHexSnippet(bmpData, 75);
      const width = 50;
      const height = 25;
      const dataOffset = 54;
      const rowSize = getRowSize(width);
      const row = seatToIndex(s);
      const col = posToIndex(p);
      if (row < 0 || row > 24 || col < 0 || col > 49) {
        console.log("Error row/col exceed the file");
        Alert.alert("Error", "row/col out of range");
        return;
      }
      const colorHex = getPixel(bmpData, dataOffset, rowSize, col, row);
      setPixelColor(colorHex);
      await AsyncStorage.setItem(cachedKeys, colorHex);
    } catch (e) {
      console.log(e, "ErrorFetchingData");
      Alert.alert("Error", "Failed to decode BMP.");
    }
  };
  const colorName = colorToNameX1(pixelColor);

  useEffect(() => {
    LoadSeatPosition();
  }, []);
  useEffect(() => {
    if (id && seat && position) {
      LoadPixelAndCache(String(id), seat, position);
    }
  }, [id, seat, position]);

  return (
    <LinearGradient
      colors={["#0d3d6b", "#1a1a1a", "#800852"]}
      locations={[0, 0.6, 1]}
      className="h-full items-center"
    >
      <ScrollView>
        <SafeAreaView>
          <View className="items-center mt-10">
            <Text className="text-2xl text-white">
              X1:ID = {id} (Seat = {seat}, Pos = {position} )
            </Text>
          </View>
          <View className="items-center mt-10">
            {pixelColor ? (
              <View style={{ backgroundColor: pixelColor }}>
                <Text>{colorName}</Text>
              </View>
            ) : (
              <View>
                <Text>Loading........</Text>
              </View>
            )}
          </View>
        </SafeAreaView>
      </ScrollView>
    </LinearGradient>
  );
};

export default X1display;
