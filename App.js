import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";

let timer = null;
let ss = 0;
let mm = 0;
let hh = 0;

export default function App() {
  const [numberTimer, setNumberTimer] = useState(0);
  const [pauseButton, setPauseButton] = useState("START");
  const [justTime, setJustTime] = useState(null);

  function start() {
    if (timer !== null) {
      clearInterval(timer);
      timer = null;
      setPauseButton("START");
    } else {
      timer = setInterval(() => {
        ss++;
        if (ss == 60) {
          ss = 0;
          mm++;
        }
        if (mm == 60) {
          mm = 0;
          hh++;
        }
        let formatTimer =
          (hh < 10 ? "0" + hh : hh) +
          ":" +
          (mm < 10 ? "0" + mm : mm) +
          ":" +
          (ss < 10 ? "0" + ss : ss);

        setNumberTimer(formatTimer);
      }, 1000);
      setPauseButton("PAUSAR");
    }
  }
  function finish() {
    if (timer !== null) {
      clearInterval(timer);
      timer = null;
    }
    setJustTime(numberTimer);
    setNumberTimer(0);
    ss = 0;
    mm = 0;
    hh = 0;
    setPauseButton("START");
  }

  return (
    <View style={styles.container}>
      <Image source={require("./src/images/crono.png")} />
      <Text style={styles.timer}>{numberTimer}</Text>
      <View style={styles.btnArea}>
        <TouchableOpacity style={styles.btn} onPress={start}>
          <Text style={styles.btnText}>{pauseButton}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btn} onPress={finish}>
          <Text style={styles.btnText}>FINALIZAR</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.contentTimers}>
        <Text style={styles.justTime}>
          {justTime ? "Ultimo tempo:" + justTime : ""}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#18181b",
  },
  timer: {
    marginTop: -160,
    fontSize: 45,
    fontWeight: "bold",
    color: "#fff",
  },
  btnArea: {
    flexDirection: "row",
    marginTop: 160,
    height: 48,
  },
  btn: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 8,
    height: 48,
    margin: 16,
  },
  btnText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#18181b",
  },
  contentTimers: {
    marginTop: 48,
  },
  justTime: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "bold",
    fontStyle: "italic",
  },
});
