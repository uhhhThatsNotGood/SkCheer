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
  colorToNameX20,
} from "../../hooks/BMPutils";

const imageMapX20: { [key: string]: any } = {
  "1": require("../../assets/x20/image1.bmp"),
  "2": require("../../assets/x20/image2.bmp"),
  "3": require("../../assets/x20/image3.bmp"),
};

const X20display = () => {
  const { id } = useLocalSearchParams();
  const [seat, setSeat] = useState<string>("");
  const [position, setPosition] = useState<string>("");
  const [gridColor, setGridColor] = useState<string[] | null>(null);

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
  const LoadPixelGridAndCache = async (id: string, s: string, p: string) => {
    if (!id || !s || !p) return;
    const cachedKeys = `x20-${id}-${s}-${p}`;
    try {
      const cachedColors = await AsyncStorage.getItem(cachedKeys);
      if (cachedColors) {
        setGridColor(JSON.parse(cachedColors));
        return;
      }

      const asset = Asset.fromModule(imageMapX20[id]);
      await asset.downloadAsync();
      const fileUri = asset.localUri!;
      const b64Data = await FileSystem.readAsStringAsync(fileUri, {
        encoding: FileSystem.EncodingType.Base64,
      });
      const bmpData = decodeB64ToUint8(b64Data);
      printHexSnippet(bmpData, 75);
      const width = 250;
      const height = 100;
      const dataOffset = 54;
      const rowSize = getRowSize(width);
      const seatIndex = seatToIndex(s);
      const posIndex = posToIndex(p);
      const startRow = seatIndex * 4;
      const startCol = posIndex * 5;
      if (startRow + 4 > height || startCol + 5 > width) {
        Alert.alert("Error", "Out of file boundaries");
        return;
      }

      const regionColors: string[] = [];
      for (let r = 0; r < 4; r++) {
        for (let c = 0; c < 5; c++) {
          const row = startRow + r;
          const col = startCol + c;
          const colorHex = getPixel(bmpData, dataOffset, rowSize, col, row);
          regionColors.push(colorHex);
        }
      }
      setGridColor(regionColors);
      await AsyncStorage.setItem(cachedKeys, JSON.stringify(regionColors));
    } catch (e) {
      console.log(e, "ErrorFetchingGrid");
      Alert.alert("Error", "Error loading/decoding BMP.");
    }

    useEffect(() => {
      LoadSeatPosition();
    }, []);

    useEffect(() => {
      if (id && seat && position) {
        LoadPixelGridAndCache(String(id), seat, position);
      }
    }, [id, seat, position]);

    return (
      <LinearGradient
        colors={["#0d3d6b", "#1a1a1a", "#800852"]}
        locations={[0, 0.6, 1]}
        className="flex-1 h-full items-center"
      >
        <ScrollView>
          <SafeAreaView>
            <View className="items-center mt-10">
              <Text className="text-xl text-white">
                X20: ID = {id} (Seat = {seat}, Pos = {position})
              </Text>
            </View>
            <View className="items-center mt-5">
              {gridColor ? (
                <View>
                  {Array.from({ length: 4 }).map((_, rowIndex) => (
                    <View key={`row-${rowIndex}`} className="flex flex-row">
                      {Array.from({ length: 5 }).map((_, colIndex) => {
                        const index = rowIndex * 5 + colIndex;
                        return (
                          <View
                            key={`col-${colIndex}`}
                            className="w-10 h-10 m-1"
                            style={{ backgroundColor: gridColor[index] }}
                          />
                        );
                      })}
                    </View>
                  ))}
                </View>
              ) : (
                <Text style={{ color: "#fff" }}>Loading pixel grid...</Text>
              )}
            </View>
          </SafeAreaView>
        </ScrollView>
      </LinearGradient>
    );
  };
};

export default X20display;
