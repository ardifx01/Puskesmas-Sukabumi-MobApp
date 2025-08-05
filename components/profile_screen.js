import React, { useEffect, useState } from "react";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";
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

export default function ProfileScreen({ route }) {
  const insets = useSafeAreaInsets();
  
  return (
    <ImageBackground
      source={require("../assets/img_bg_potrait.png")}
      style={styles.bgContainer}
    >
      <SafeAreaView style={[{flex: 1}]}>
        <View style={[styles.container, {flex: 1, backgroundColor: ""}]}>
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
                <Text style={[styles.medText, {fontSize: 20, color: "#fff", marginBlockEnd: 4,}]}>Keqing</Text>
                <Text style={[styles.normalText, {color: "#fff", fontSize: 12}]}>Tenaga Kesehatan</Text>
              </View>
            </View>
          </View>

          <View style={[styles.lowerContent, {paddingBlockEnd: insets.bottom + 55}]}>
            <View style={[styles.contentContainer, {flex: 5, gap: 24}]}>
              <View>
                <Text style={styles.formTextTitle}>NIK</Text>
                <View style={styles.informationForm}>
                  <UseIcons name="userId" set="Custom" size={20} color="none" fillColor="#bbbbbb"/>
                  <Text style={[styles.normalText, {fontSize: 16, color:"#757575"}]}>123123123123123</Text>
                </View>
              </View>

              <View>
                <Text style={styles.formTextTitle}>Jenis Kelamin</Text>
                <View style={[styles.informationForm]}>
                   <UseIcons name="user" set="FontAwesome5" size={20} color="#bbbbbb"/>
                  <Text style={[styles.normalText, {fontSize: 16, color:"#757575"}]}>123123123123123</Text>
                </View>
              </View>

              <View>
                <Text style={styles.formTextTitle}>Umur</Text>
                <View style={styles.informationForm}>
                  <UseIcons name="calendarDate" set="Custom" size={20} color="#bbbbbb"/>
                  <Text style={[styles.normalText, {fontSize: 16, color:"#757575"}]}>123123123123123</Text>
                </View>
              </View>

              <View>
                <Text style={styles.formTextTitle}>Alamat</Text>
                <View style={styles.informationForm}>
                  <UseIcons name="map-marker" set="Custom" size={20} color="none" fillColor="#bbbbbb"/>
                  <Text style={[styles.normalText, {fontSize: 16, color:"#757575"}]}>123123123123123</Text>
                </View>
              </View>
              
            </View>

            <View style={[styles.contentContainer, {flex: 1, alignItems: "center", justifyContent: "center"}]}>
              <TouchableOpacity style={[styles.logoutButton]}>
                <Text style={[styles.medText, {color: "#4ACDD1", fontSize: 14}]}>Log Out</Text>
                <UseIcons name="arrow-right" set="FontAwesome6" size={14} color="#4ACDD1"/>
              </TouchableOpacity>
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
    fontFamily: "HelveticaNeue-Med",
    fontSize: 16,
  },
  headerDesc: {
    color: "#fff",
    fontSize: 16,
    lineHeight: 20,

    marginBlockStart: 8,
    paddingInlineEnd: 100,
  },
  formTextTitle: {
    fontFamily: "HelveticaNeue-Light",
    fontSize: 12,
    color: "#616161",
    
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
    flex: 1.8,

    borderTopLeftRadius: 18,
    borderTopRightRadius: 18,

    paddingBlockStart: 24,
    paddingBlockEnd: 80,

    backgroundColor: "#FFF",
  },
  informationForm: {
    borderBottomWidth: 0.4,
    borderBlockEndColor: "#333333",
  
    paddingBlockStart: 18.5,
    paddingBlockEnd: 14.5,

    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  logoutButton: {
    
    flexDirection: "row",
    alignItems: "center",
    gap: 35,

    paddingInline: 24,
    paddingBlock: 17.5,

    borderWidth: 1,
    borderColor: "#EDEDED",
    borderRadius: 14,



    backgroundColor: "#FFFFFF",
    
  },
});
