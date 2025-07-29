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
import Collapsible from "react-native-collapsible";

import { useNavigation } from "expo-router";
import { StatusBar } from "expo-status-bar";
// import { isLoaded, useFonts } from "expo-font";

import UseIcons from "../../middleware/tools/useIcons";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;


// Component for Accordion
const AccordionItem = ({ title, initialCollapsed = true }) => {
  const dummyArray = Array(10).fill(null).map((_, index) => ({ id: `${index}` }));
  const [isCollapsed, setIsCollapsed] = useState(initialCollapsed);

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  const renderObatItem = ({item}) => {
    return (
    <View style={styles.obatItem}>
      <View>
        <Text style={[styles.normalText, { fontSize: 20 }]}>Paracetamol</Text>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Text style={{ fontSize: 20, marginInline: 3.5 }}>•</Text>
          <Text style={[styles.normalText, { fontSize: 16 }]}>Kapsul</Text>
          <Text style={{ fontSize: 20, marginInline: 3.5 }}>•</Text>
          <Text style={[styles.normalText, { fontSize: 16 }]}>
            Antibiotik
          </Text>
        </View>
      </View>

      <Text style={[styles.normalText, { fontSize: 20, color: "#616161" }]}>
        2
      </Text>
    </View>
    );
  };

  return (
    <View style={{ marginBlockStart: 4 }}>
      <Pressable
        onPress={toggleCollapse}
        style={{
          alignContent: "center",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <Text style={[styles.normalText, { fontSize: 18 }]}>{title}</Text>
        <UseIcons
          name={isCollapsed ? "arrow-right" : "arrow-drop-down"}
          set="MaterialIcons"
          color="#616161"
        />
      </Pressable>

      <Collapsible collapsed={isCollapsed}>
        <View style={[styles.itemContent]}>
          <FlatList
            data={dummyArray} // Data Source
            renderItem={renderObatItem}
            keyExtractor={(item) => item.id}
            // Properti untuk mengontrol performa FlatList
            initialNumToRender={3} // Jumlah item awal yang dirender
            showsVerticalScrollIndicator={true} // Sembunyikan scroll indicator jika tidak diinginkan
            contentContainerStyle={{gap: 12}}
          />
        </View>
      </Collapsible>
    </View>
  );
};

// Component for History List
const HistoryList = ({item}) => (
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
        <Text style={[styles.normalText, { fontSize: 18 }]}>
          21 Juli 2025
        </Text>
      </View>
    </View>

    <View style={{ gap: 8 }}>
      <Text style={[styles.normalText, { fontSize: 18 }]}>
        Pemeriksa :<Text style={[styles.medText]}> Dr. Keqing</Text>
      </Text>
      <Text style={[styles.normalText, { fontSize: 18 }]}>
        Keluhan :<Text style={[styles.medText]}> Demam, Pilek</Text>
      </Text>
      <Text style={[styles.normalText, { fontSize: 18 }]}>
        Diagnosa :<Text style={[styles.medText]}> TBC</Text>
      </Text>
    </View>

    <AccordionItem
      title="Daftar Resep Obat"
    />
  </View>
);

// Default export
export default function DetailPatientScreen({ route }) {
  const dummyArray = Array(10).fill(null).map((_, index) => ({ id: `${index}` }));
  const navigation = useNavigation();

  const renderDataHistory = ({item}) => {
    return (
      <HistoryList item={item}/>
    );
  };

  return (
    <SafeAreaView style={{ backgroundColor: "#F7F9FC" }}>
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
          <View style={{ marginBlockEnd: 16 }}>
            <Text style={[styles.medText, { fontSize: 24 }]}>
              Aether Hikari
            </Text>
            <View style={[{ flexDirection: "row", alignItems: "center" }]}>
              <Text style={[styles.normalText, { fontSize: 16 }]}>
                Laki-laki
              </Text>
              <Text style={{ fontSize: 20, marginInline: 3.5 }}>•</Text>
              <Text style={[styles.normalText, { fontSize: 16 }]}>20th</Text>
            </View>
          </View>

          <View style={{}}>
            <FlatList
              data={dummyArray}
              renderItem={renderDataHistory}
              keyExtractor={(item) => item.id}
              showsVerticalScrollIndicator={true}
              scrollEnabled={false}
            />

          </View>
        </View>

        <StatusBar style="auto" />
      </View>
    </SafeAreaView>
  );
};

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
    borderRadius: 18,

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
  itemContent: {
    marginBlockStart: 32,
    maxHeight: 200,
  },
  obatItem: {
    paddingInlineStart: 10,
    paddingInlineEnd: 12,
    paddingBlock: 6,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomWidth: 0.5,
    borderBottomColor: "#78797A80",
  },
});
