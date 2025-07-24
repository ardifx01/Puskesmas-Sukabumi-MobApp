import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  ImageBackground,
  Image,
  Dimensions,
  Pressable,
  TouchableOpacity,
  FlatList,
} from "react-native";

import { StatusBar } from "expo-status-bar";
// import { isLoaded, useFonts } from "expo-font";

import UseIcons from "./middleware/tools/useIcons";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const diseaseName = "TBC";

export default function ProfileScreen({ route }) {
  
  return (
    <ImageBackground
      source={require("../assets/img_bg_potrait.png")}
      style={styles.bgContainer}
    >
      <SafeAreaView>
        <View style={styles.container}>
          <View style={[styles.upperContent, styles.contentContainer]}>
            <View style={styles.headerContainer}>
              <Pressable style={[styles.actionCircleButton]}>
                <UseIcons
                  name="angle-left"
                  set="FontAwesome6"
                  size={20}
                  color="#1F5658"
                />
              </Pressable>
              <View style={{ flex: 0.85, alignItems: "center" }}>
                <Text style={[styles.headerTitle]}>Profile</Text>
              </View>
            </View>
            <View style={[styles.profileContainer]}>
              <Image
                style={styles.photoProfile}
                source={require("../assets/profile.png")}
              />
              <View style={[styles.profileDesc]}>
                <Text style={[styles.medText, {fontSize: 24, color: "#fff", marginBlockEnd: 4,}]}>Keqing</Text>
                <Text style={[styles.normalText, {color: "#fff", fontSize: 16}]}>Tenaga Kesehatan</Text>
              </View>

            </View>
          </View>

          <View style={[styles.contentContainer, styles.lowerContent]}>
            <View>

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
    height: windowHeight,
    width: windowWidth,
    resizeMode: "cover",
    // overflow: "hidden",
    flex: 1,
    backgroundColor: "#F7F9FC",
  },
  container: {
    // alignItems: "center",
    // justifyContent: "center",
    height: windowHeight,
    paddingTop: 19,
  },
  contentContainer: {
    paddingInline: 17,
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  actionCircleButton: {
    width: 45,
    height: 45,
    borderRadius: 45 / 2,

    alignItems: "center",
    justifyContent: "center",

    backgroundColor: "#ffffffb2",
  },
  headerTitle: {
    color: "#fff",
    fontFamily: "HelveticaNeue-Bold",
    fontSize: 22,
  },
  headerDesc: {
    color: "#fff",
    fontSize: 16,
    lineHeight: 20,

    marginBlockStart: 8,
    paddingInlineEnd: 100,
  },
  normalText: {
    fontFamily: "HelveticaNeue-Light",
  },
  italicText: {
    fontFamily: "HelveticaNeue-Italic",
  },
  medText: {
    fontFamily: "HelveticaNeue-Medium",
  },
  upperContent: {
    flex: 1,

    flexDirection: "column",
    justifyContent: "space-between",

  },
  profileContainer: {
    flex: 1,

    paddingBlockStart: 30,

    alignItems: "center",
    // justifyContent: "center",
  },
  photoProfile: {
    width: 80,
    height: 80,
    borderRadius: 80/2,
  },
  profileDesc: {
    marginBlockStart: 18,
    alignItems: "center",
  },
  lowerContent: {
    flex: 1.6,

    borderTopLeftRadius: 18,
    borderTopRightRadius: 18,

    paddingInline: 18,
    paddingBlockStart: 24,
    paddingBlockEnd: 120,

    backgroundColor: "#FFF",
  },
});
