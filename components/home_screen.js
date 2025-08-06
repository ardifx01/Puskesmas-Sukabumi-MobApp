import React, { useEffect } from "react";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  Image,
  Dimensions,
  Pressable,
  TouchableOpacity,
  FlatList,
} from "react-native";

import { StatusBar } from "expo-status-bar";
import { useNavigation } from "expo-router";
// import { isLoaded, useFonts } from "expo-font";

import UseIcons from "./middleware/tools/useIcons";
import fontNormalize from "./middleware/tools/fontNormalize";


const windowWidth = Dimensions.get("window").width;
// const windowHeight = Dimensions.get("window").height;

export default function HomeScreen({route}) {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();
   const dummyArray = Array(3).fill(null).map((_, index) => ({ id: `${index + 1}` }));

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
              <Text style={[styles.normalText, { fontSize: fontNormalize(12), color: "#fff" }]}>
                Tenaga Kesehatan
              </Text>
            </View>
          </Pressable>
          <View style={[styles.contentContainer]}>
            <View
              style={{
                gap: 24
              }}
            >
              <View style={styles.statCard}>
                <View style={styles.divDetail}>
                  <Text style={[styles.normalText, {fontSize: 14}]}>Puskesmas Sukabumi</Text>
                  <Text style={[styles.medText, { fontSize: 16, color: "#4ACDD1" }]}>
                    Unit Layanan Gigi & Mulut
                  </Text>
                  <View
                    style={{
                      borderBottomColor: "#4ACDD1",
                      borderBottomWidth: 0.5,
                      marginBlockStart: 16,
                      
                    }}
                  />
                </View>

                <View style={styles.statDetail}>
                  <View style={[styles.patientCountWrapper]}>
                    <View style={{flex: 1, alignItems: "center"}}>
                      <Text style={[styles.normalText, {flex: 1,fontSize: 12}]}>Total Pasien</Text>
                      <View style={[styles.patientCount, {gap: fontNormalize(4)}]}>
                        <UseIcons
                          name="patientCount"
                          set="Custom"
                          size={20}
                          color="#4ACDD1"
                          style={{marginInlineStart: 0}}
                        />
                        <Text
                          style={[
                            styles.medText,
                            { color: "#4ACDD1", fontSize: 20 },
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
                            styles.medText,
                            styles.textDatePickerActive,
                            { fontSize: fontNormalize(12) },
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
                            styles.medText,
                            styles.textDatePickerInActive,
                            { fontSize: fontNormalize(12) },
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
                          size={fontNormalize(12)}
                          color="#4ACDD1"
                        />
                      </Pressable>
                    </View>
                    <Text
                      style={[
                        { alignSelf: "flex-end", marginBlockStart: 10, fontSize: fontNormalize(12), color: "#616161" },
                        styles.normalText,
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
                      styles.medText,
                      { fontSize: 16, color: "#fff", marginStart: fontNormalize(16) },
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
                  style={{paddingEnd:fontNormalize(9)}}
                />
              </TouchableOpacity>
            </View>

            <View style={[{gap: 20, paddingBlockEnd: insets.bottom + 275.5}]}>
              <View
                style={[
                  {
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                  },
                ]}
              >
                <Text style={[styles.medText, {fontSize: 16}]}>Pasien Terbaru</Text>
                <Text
                  style={[
                    styles.medText,
                    { fontSize: 12, color: "#4ACDD1" },
                    { textDecorationLine: "underline" },
                  ]}
                  onPress={() => {navigation.navigate("Riwayat")}}
                >
                  Lihat Semua
                </Text>
              </View>
              <FlatList
                data={dummyArray}
                renderItem={({}) => (
                  <View
                    style={[
                      { backgroundColor: "#fff" },
                      styles.actionButton,
                      { paddingInline: 24, paddingBlock: 16 },
                    ]}
                  >
                    <View>
                      <Text style={[styles.normalText, { fontSize: 16 }]}>
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
                        <Text style={[styles.normalText, {fontSize: 12, color:"#616161"}]}>Laki-laki</Text>
                        <Text style={{ fontSize: 16, marginInline: 7 }}>
                          •
                        </Text>
                        <Text style={[styles.normalText, {fontSize: 12, color:"#616161"}]}>20th</Text>
                      </View>

                      <View
                        style={{ flexDirection: "row", alignItems: "center" }}
                      >
                        <View style={{ marginInlineEnd: 10 }}>
                          <UseIcons
                            name="calendar-alt"
                            set="FontAwesome5"
                            color="#BBB"
                            size={12}
                          />
                        </View>
                        <View>
                          <Text style={[styles.normalText, {fontSize: 12}]}>21 Juli 2025</Text>
                        </View>
                      </View>
                    </View>
                  </View>
                  )
                }
                keyExtractor={(item) => item.id}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{
                  gap: 12,
                  paddingBlockEnd: fontNormalize(insets.bottom + 60),
                }}
              />
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
    height: fontNormalize(288),
    overflow: "hidden",
    flex: 1,
    backgroundColor: "#F7F9FC",
  },
  container: {
    // alignItems: "center",
    // justifyContent: "center",
    height: "100%",
    paddingBlock: fontNormalize(28),
    paddingInline: fontNormalize(16),
  },
  pfpArea: {
    flexDirection: "row",
    alignContent: "center",
  },
  photoProfile: {
    width: fontNormalize(50),
    height: fontNormalize(50),
    borderRadius: fontNormalize(25),
  },
  pfpNameText: {
    color: "#fff",
    fontFamily: "HelveticaNeue-Medium",
    fontSize: fontNormalize(14),
  },
  normalText: {
    fontFamily: "HelveticaNeue-Light",
  },
  medText: {
    fontFamily: "HelveticaNeue-Medium",
  },
  contentContainer: {
    flex: 0.98,
    marginBlockStart: 50,

    flexDirection: "column",
    gap: 20,
  },
  statCard: {
    borderRadius: fontNormalize(16),

    paddingInline: 16,
    paddingBlock: 20,
    gap: 40,
    backgroundColor: "#fff",

    //dropShadow
    elevation: 9,
    shadowColor: "#0000000D",
  },
  statDetail: {
    flexDirection: "row",
  },
  patientCountWrapper: {
    flex: 1,
  },
  datePickerWrapper: {
    flex: 3,
    paddingStart: fontNormalize(69),
  },
  patientCount: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  datePicker: {
    flexDirection: "row",
    justifyContent: "flex-end",
    gap: fontNormalize(8)
  },
  datePickerButton: {
    paddingInline: fontNormalize(12),
    justifyContent: "center"
  },
  datePickerActive: {
    backgroundColor: "#4ACDD1",
    borderRadius: fontNormalize(16),
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


    borderRadius: fontNormalize(16),

    justifyContent: "center",
    paddingInline: fontNormalize(16),
    paddingBlock: fontNormalize(16),
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
