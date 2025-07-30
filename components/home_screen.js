import React, { useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  Image,
  Dimensions,
  Pressable,
  TouchableOpacity,
} from "react-native";

import { StatusBar } from "expo-status-bar";
import { useNavigation } from "expo-router";
// import { isLoaded, useFonts } from "expo-font";
import SvgUri from "expo-svg-uri";
import { FontAwesome, FontAwesome5 } from "@expo/vector-icons";

import UseIcons from "./middleware/tools/useIcons";


const windowWidth = Dimensions.get("window").width;
// const windowHeight = Dimensions.get("window").height;

export default function HomeScreen({route}) {
  const navigation = useNavigation();
  const dummyArray = Array(3).fill(null);
  console.log(route.name)

  return (
    <ImageBackground
      source={require("../assets/img_bg.png")}
      style={styles.bgContainer}
    >
      <SafeAreaView>
        <View style={styles.container}>
          <Pressable style={styles.pfpArea}>
            <Image
              style={styles.photoProfile}
              source={require("../assets/profile.png")}
            />
            <View style={{ marginLeft: 12, marginBlockStart: 5 }}>
              <Text style={styles.pfpNameText}>Keqing</Text>
              <Text style={[styles.smallText, { color: "#fff" }]}>
                Tenaga Kesehatan
              </Text>
            </View>
          </Pressable>
          <View style={styles.contentContainer}>
            <View
              style={{
                flex: 1,
                justifyContent: "space-between",
                paddingBlockEnd: 40,
              }}
            >
              <View style={styles.statCard}>
                <View style={styles.divDetail}>
                  <Text style={styles.normalText}>Puskesmas Sukabumi</Text>
                  <Text style={[styles.boldText, { color: "#4ACDD1" }]}>
                    Unit Layanan Gigi & Mulut
                  </Text>
                  <View
                    style={{
                      borderColor: "#4ACDD1",
                      borderBottomWidth: 0.3,
                      marginBlockStart: 16,
                    }}
                  />
                </View>

                <View style={styles.statDetail}>
                  <View style={styles.patientCountWrapper}>
                    <View style={{alignContent: "center"}}>
                      <Text style={styles.smallText}>Total Pasien</Text>
                      <View style={styles.patientCount}>
                        <UseIcons
                          name="patientCount"
                          set="Custom"
                          size={20}
                          color="#4ACDD1"
                          style={{marginInlineStart: -5}}
                        />
                        <Text
                          style={[
                            styles.boldText,
                            { color: "#4ACDD1", fontSize: 22 },
                          ]}
                        >
                          23
                        </Text>
                      </View>
                    </View>

                  </View>
                  <View style={styles.datePickerWrapper}>
                    <View style={styles.datePicker}>
                      <Pressable
                        style={[
                          styles.datePickerButton,
                          styles.datePickerActive,
                        ]}
                      >
                        <Text
                          style={[
                            styles.boldText,
                            styles.textDatePickerActive,
                            { fontSize: 16 },
                          ]}
                        >
                          Hari ini
                        </Text>
                      </Pressable>
                      <Pressable
                        style={[
                          styles.datePickerButton,
                          { borderRadius: 16 },
                          styles.datePickerInActive,
                        ]}
                      >
                        <Text
                          style={[
                            styles.boldText,
                            styles.textDatePickerInActive,
                            { fontSize: 16 },
                          ]}
                        >
                          Kemarin
                        </Text>
                      </Pressable>
                      <Pressable
                        style={[
                          {
                            paddingBlock: 6.17,
                            paddingInline: 10.83,
                            borderRadius: 8,
                          },
                          styles.datePickerInActive,
                        ]}
                      >
                        <UseIcons
                          name="calendar-alt"
                          set="FontAwesome5"
                          size={12}
                          color="#4ACDD1"
                        />
                      </Pressable>
                    </View>
                    <Text
                      style={[
                        { alignSelf: "flex-end", marginBlockStart: 10 },
                        styles.smallText,
                      ]}
                    >
                      21 Juli 2025
                    </Text>
                  </View>
                </View>
              </View>
              <TouchableOpacity
                style={[
                  styles.actionButton,
                  {
                    flexDirection: "row",
                    alignItems: "center",
                    backgroundColor: "#4ACDD1",
                  },
                ]}
                onPress={() => {
                    navigation.navigate("new-patient");
                }}
              >
                <View
                  style={[
                    { flex: 2, flexDirection: "row", alignItems: "center" },
                  ]}
                >
                  <View style={[styles.iconFitting]}>
                    <UseIcons
                      name="stetoscop"
                      set="Custom"
                      size={20}
                      color="none"
                    />
                  </View>
                  <Text
                    style={[
                      styles.boldText,
                      { color: "#fff", marginStart: 16 },
                    ]}
                  >
                    Catat Pemeriksaan Baru
                  </Text>
                </View>
                <UseIcons
                  name="angle-right"
                  set="FontAwesome"
                  size={30}
                  color="#fff"
                  style={{paddingEnd:9}}
                />
 
              </TouchableOpacity>
            </View>

            <View style={{ flex: 1 }}>
              <View
                style={[
                  {
                    flex: 1,
                    flexDirection: "row",
                    justifyContent: "space-between",
                  },
                ]}
              >
                <Text style={styles.boldText}>Pasien Terbaru</Text>
                <Text
                  style={[
                    styles.boldText,
                    { fontSize: 14, color: "#4ACDD1" },
                    { textDecorationLine: "underline" },
                  ]}
                  onPress={() => console.log("Lihat Semua link")}
                >
                  Lihat Semua
                </Text>
              </View>

              <View
                style={{
                  flex: 6,
                  flexDirection: "column",
                  justifyContent: "space-around",
                }}
              >
                {dummyArray.map((_, index) => (
                  <View
                    key={index}
                    style={[
                      { backgroundColor: "#fff" },
                      styles.actionButton,
                      { paddingInline: 24 },
                    ]}
                  >
                    <View>
                      <Text style={[styles.boldText, { fontSize: 16 }]}>
                        Nama Pasien
                      </Text>
                    </View>

                    <View
                      style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                      }}
                    >
                      <View
                        style={[{ flexDirection: "row", alignItems: "center" }]}
                      >
                        <Text style={[styles.smallText]}>Laki-laki</Text>
                        <Text style={{ fontSize: 20, marginInline: 3.5 }}>
                          •
                        </Text>
                        <Text style={[styles.smallText]}>20th</Text>
                      </View>

                      <View
                        style={{ flexDirection: "row", alignItems: "center" }}
                      >
                        <View style={{ marginInlineEnd: 10 }}>
                          <FontAwesome5 name="calendar-alt" color="#BBBBBB" />
                        </View>
                        <View>
                          <Text style={styles.smallText}>21 Juli 2025</Text>
                        </View>
                      </View>
                    </View>
                  </View>
                ))}
              </View>
            </View>
          </View>
          <StatusBar style="auto" />
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  bgContainer: {
    height: 288,
    width: windowWidth,
    resizeMode: "",
    overflow: "hidden",
    flex: 1,
    backgroundColor: "#F7F9FC",
  },
  container: {
    // alignItems: "center",
    // justifyContent: "center",
    height: "100%",
    paddingLeft: 16,
    paddingTop: 46,
    paddingRight: 16,
  },
  pfpArea: {
    flexDirection: "row",
    alignContent: "center",
  },
  photoProfile: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  pfpNameText: {
    color: "#fff",
    fontFamily: "HelveticaNeue-Medium",
    fontSize: 16,
  },
  smallText: {
    fontFamily: "HelveticaNeue-Light",
    fontSize: 14,
  },
  normalText: {
    fontFamily: "HelveticaNeue-Light",
    fontSize: 16,
  },
  boldText: {
    fontFamily: "HelveticaNeue-Medium",
    fontSize: 18,
  },
  contentContainer: {
    flex: 0.98,
    marginBlockStart: 50,

    flexDirection: "column",
    justifyContent: "space-evenly",
  },
  statCard: {
    backgroundColor: "#fff",
    height: 184.3,

    borderRadius: 16,

    paddingInline: 16,
    paddingVertical: 20,

    justifyContent: "space-between",

    //dropShadow
    elevation: 9,
    shadowColor: "#0000000D",
  },
  divDetail: {},
  statDetail: {
    flexDirection: "row",
  },
  patientCountWrapper: {
    flex: 1,
  },
  datePickerWrapper: {
    flex: 3,
    paddingStart: 69,
  },
  patientCount: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  datePicker: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  datePickerButton: {
    paddingHorizontal: 12,
    paddingBlockStart: 4,
    paddingBlockEnd: 4,
  },
  datePickerActive: {
    backgroundColor: "#4ACDD1",
    borderRadius: 16,
  },
  textDatePickerActive: {
    color: "#fff",
  },
  datePickerInActive: {
    borderWidth: 1,
    // borderRadius: 16,
    borderColor: "#4ACDD1",
  },
  textDatePickerInActive: {
    color: "#4ACDD1",
  },
  actionButton: {
    height: 72,

    borderRadius: 16,

    justifyContent: "center",
    paddingInline: 16,
    // alignItems: "center",
  },
  iconFitting: {
    borderRadius: 20,
    width: 40,
    height: 40,

    backgroundColor: "#86DEE0",
    alignItems: "center",
    justifyContent: "center",
  },
});
