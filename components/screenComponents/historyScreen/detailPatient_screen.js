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
import Collapsible from 'react-native-collapsible';

import { useNavigation } from "expo-router";
import { StatusBar } from "expo-status-bar";
// import { isLoaded, useFonts } from "expo-font";

import UseIcons from "../../middleware/tools/useIcons";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const AccordionItem = ({ title, content, initialCollapsed = true }) => {
  const [isCollapsed, setIsCollapsed] = useState(initialCollapsed);

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (

          <View style={{marginBlockStart: 4}}>
            <Pressable onPress={toggleCollapse} style={{alignContent: "center", flexDirection:"row", justifyContent: "space-between"}}>
              <Text style={[styles.normalText, {fontSize: 18}]}>{title}</Text>
              <UseIcons
                name={isCollapsed ? "arrow-right" : "arrow-drop-down"}
                set="MaterialIcons"
                color="#616161"
              />
            </Pressable>

            <Collapsible collapsed={isCollapsed}>
              <View style={styles.itemContent}>
                {content}
              </View>
            </Collapsible>
          </View>
  );
};

export default function DetailPatientScreen({ route }) {
  const navigation = useNavigation();
  return (
      <SafeAreaView style={{backgroundColor: "#F7F9FC"}}>
        <View style={styles.container}>
          <View style={[styles.upperContent]}>
            <View style={styles.headerContainer}>
              <Pressable 
                style={[styles.actionCircleButton]}
                onPress={() => navigation.goBack()}
              >
                <UseIcons
                  name="angle-left"
                  set="FontAwesome6"
                  size={20}
                  color="#4ACDD1"
                />
              </Pressable>
              <View style={{ flex: 0.85, alignItems: "center" }}>
                <Text style={[styles.headerTitle]}>Detail Pasien</Text>
              </View>
            </View>

          </View>

          <View style={[styles.lowerContent]}>
            <View style={{marginBlockEnd: 16}}>
              <Text style={[styles.medText, {fontSize: 24,}]}>Aether Hikari</Text>
              <View style={[{ flexDirection: "row", alignItems: "center" }]}>
                <Text style={[styles.normalText,{fontSize: 16}]}>Laki-laki</Text>
                <Text style={{ fontSize: 20, marginInline: 3.5 }}>
                  •
                </Text>
                <Text style={[styles.normalText, {fontSize: 16}]}>20th</Text>
              </View>
            </View>

            <View>
              <View style={[styles.detailData]}>
                <View
                  style={{ flexDirection: "row", alignItems: "center", gap: 10 }}
                >
                    <UseIcons
                      name="calendar-alt"
                      set="FontAwesome5"
                      size={15}
                      color="#4ACDD1" 
                    />

                  <View>
                    <Text style={[styles.normalText, {fontSize: 18}]}>21 Juli 2025</Text>
                  </View>
                </View>

                <View style={{gap: 8}}>
                  <Text  style={[styles.normalText, {fontSize: 18}]}>
                    Pemeriksa :
                    <Text style={[styles.medText]}> Dr. Keqing</Text>
                  </Text>
                  <Text  style={[styles.normalText, {fontSize: 18}]}>
                    Keluhan :
                    <Text style={[styles.medText]}> Demam, Pilek</Text>
                  </Text>
                  <Text  style={[styles.normalText, {fontSize: 18}]}>
                    Diagnosa :
                    <Text style={[styles.medText]}> TBC</Text>
                  </Text>
                </View>

                <AccordionItem 
                  title="Daftar Resep Obat"
                  content={
                    <View>
                      <Text style={styles.contentText}>Obat 1</Text>
                      <Text style={styles.contentText}>Obat 2</Text>
                      <Text style={styles.contentText}>Obat 3</Text>
                    </View>
                  }
                />
              </View>

              <View style={[styles.detailData]}>
                <View
                  style={{ flexDirection: "row", alignItems: "center", gap: 10 }}
                >
                    <UseIcons
                      name="calendar-alt"
                      set="FontAwesome5"
                      size={15}
                      color="#4ACDD1" 
                    />

                  <View>
                    <Text style={[styles.normalText, {fontSize: 18}]}>21 Juli 2025</Text>
                  </View>
                </View>

                <View style={{gap: 8}}>
                  <Text  style={[styles.normalText, {fontSize: 18}]}>
                    Pemeriksa :
                    <Text style={[styles.medText]}> Dr. Keqing</Text>
                  </Text>
                  <Text  style={[styles.normalText, {fontSize: 18}]}>
                    Keluhan :
                    <Text style={[styles.medText]}> Demam, Pilek</Text>
                  </Text>
                  <Text  style={[styles.normalText, {fontSize: 18}]}>
                    Diagnosa :
                    <Text style={[styles.medText]}> TBC</Text>
                  </Text>
                </View>

                <AccordionItem 
                  title="Daftar Resep Obat"
                  content={
                    <View>
                      <Text style={styles.contentText}>Obat 1</Text>
                      <Text style={styles.contentText}>Obat 2</Text>
                      <Text style={styles.contentText}>Obat 3</Text>
                    </View>
                  }
                />
              </View>
            </View>



          </View>

          <StatusBar style="auto" />
        </View>
      </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    // alignItems: "center",
    // justifyContent: "center",
    height: windowHeight,
    paddingTop: 19,
    paddingInline: 16,
    backgroundColor: "#F7F9FC",
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

    backgroundColor: "rgba(255, 255, 255, 0.7)",
  },
  headerTitle: {
    color: "#4ACDD1",
    fontFamily: "HelveticaNeue-Medium",
    fontSize: 20,
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
    fontSize: 14,
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
    flexDirection: "column",
    justifyContent: "space-between",
    marginBlockEnd: 38,
  },
  lowerContent: {
    borderTopLeftRadius: 18,
    borderTopRightRadius: 18,

    paddingBlock: 32,
    paddingInline: 18,

    backgroundColor: "#FFF",
  },
  detailData: {
    flexDirection: "column",
    gap: 20,

    paddingBlock: 32,

    borderTopWidth: 1,
    borderColor: "#EDEDED",
  },

});
