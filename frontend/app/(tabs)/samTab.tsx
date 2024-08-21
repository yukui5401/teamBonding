import { HelloWave } from "@/components/HelloWave";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import TypicalApi from "@/Services/typicalApi";
import { useState } from "react";
import { Image, StyleSheet, Platform, Button } from "react-native";

export default function SamTab() {
  const [apiResponse, setApiResponse] = useState("API response");

  const typycalApiCall = async () => {
    var fact = await TypicalApi.getCatFact();
    setApiResponse(fact);
  };

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#A1CEDC", dark: "#1D3D47" }}
      headerImage={
        <Image
          source={require("@/assets/images/monkey.jpg")}
          style={styles.monkeyImage}
        />
      }
    >
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title"> Sam's tab is crazy !</ThemedText>
        <HelloWave />
      </ThemedView>

      <ThemedView style={styles.content}>
        <Button
          title="Make an API call"
          onPress={() => {
            typycalApiCall();
          }}
        />
        <ThemedText>{apiResponse}</ThemedText>
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 60,
  },
  content: {
    flexDirection: "column",
    alignItems: "center",
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  monkeyImage: {
    height: 500,
    width: 500,
    top: 0,
    left: 0,
    position: "absolute",
  },
});
