import React, { useEffect, useState } from "react";
import { View, Text, Button, StyleSheet, ScrollView } from "react-native";
import * as FileSystem from "expo-file-system";
import { Asset } from "expo-asset";
import { Buffer } from "buffer";

const BmpToHexViewer = () => {
  const [hexData, setHexData] = useState<string | null>(null);

  const readBmpFile = async () => {
    try {
      const asset = Asset.fromModule(require("../assets/test.bmp"));
      await asset.downloadAsync();
      const path = asset.localUri || asset.uri;

      if (path) {
        const data = await FileSystem.readAsStringAsync(path, {
          encoding: FileSystem.EncodingType.Base64,
        });
        const buffer = Buffer.from(data, "base64");
        setHexData(buffer.toString("hex"));
      }
    } catch {
      setHexData(null);
    }
  };

  useEffect(() => {
    readBmpFile();
  }, []);

  return (
    <View style={styles.container}>
      <Button title="Load BMP File" onPress={readBmpFile} />
      {hexData ? (
        <ScrollView style={styles.hexContainer}>
          <Text style={styles.hexText}>{hexData}</Text>
        </ScrollView>
      ) : (
        <Text style={styles.infoText}>No hex data loaded.</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  hexContainer: {
    marginTop: 20,
    width: "100%",
    height: "70%",
    backgroundColor: "#f4f4f4",
    padding: 10,
    borderRadius: 8,
    borderColor: "#ccc",
    borderWidth: 1,
  },
  hexText: {
    fontFamily: "Courier New",
    fontSize: 12,
    color: "#333",
  },
  infoText: {
    fontSize: 16,
    color: "#888",
    marginTop: 10,
  },
});

export default BmpToHexViewer;
