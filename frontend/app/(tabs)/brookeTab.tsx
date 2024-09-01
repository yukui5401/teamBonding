import { useState } from "react";
import { View, StyleSheet, Button } from "react-native";
import { Audio } from "expo-av";
import { rgbaColor } from "react-native-reanimated/lib/typescript/reanimated2/Colors";

type RecordingState = Audio.Recording | undefined;

export default function App() {
  const [recording, setRecording] = useState<RecordingState>(undefined);
  const [permissionResponse, requestPermission] = Audio.usePermissions();

  async function startRecording() {
    try {
      if (permissionResponse?.status !== "granted") {
        console.log("Requesting permission..");
        const { status } = await requestPermission();
        if (status !== "granted") {
          console.log("Permission not granted");
          return;
        }
      }
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });

      console.log("Starting recording..");
      const { recording } = await Audio.Recording.createAsync(
        Audio.RecordingOptionsPresets.HIGH_QUALITY
      );
      setRecording(recording);
      console.log("Recording started");
    } catch (err) {
      console.error("Failed to start recording", err);
    }
  }

  async function stopRecording() {
    if (!recording) {
      console.warn("No recording to stop");
      return;
    }

    try {
      console.log("Stopping recording..");
      await recording.stopAndUnloadAsync();
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: false,
      });
      const uri = recording.getURI();
      console.log("Recording stopped and stored at", uri);
      setRecording(undefined);
    } catch (err) {
      console.error("Failed to stop recording", err);
    }
  }

  return (
    <View style={styles.container}>
      <Button
        title={recording ? "Stop Recording" : "Start Recording"}
        onPress={recording ? stopRecording : startRecording}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "white",
    padding: 10,
  },
});
