import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useForm, Controller } from "react-hook-form";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Dimensions,
  Pressable,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { FlatList } from "react-native-gesture-handler";

import { useNavigation } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { LinearGradient } from "expo-linear-gradient";
// import { isLoaded, useFonts } from "expo-font";

import UseIcons from "../../middleware/tools/useIcons";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

// Default export
export default function NewPatientScreen({ route }) {
  const dummyArray = Array(10)
    .fill(null)
    .map((_, index) => ({ id: `${index}` }));

  const navigation = useNavigation();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      citizen_id: "",
      name: "",
      age: "",
      gender: "",
      complaint: "",
      diagnose: "",
    },
  });
  const onSubmit = (data) => console.log(data);

  return (
    <SafeAreaView style={[{ flex:1, backgroundColor: "#F7F9FC"}]}>
      <View style={[styles.container]}>
        <View style={[styles.upperContent]}>
          <View style={styles.headerContainer}>
            <Pressable
              style={[
                styles.actionCircleButtonContainer,
                { transform: [{ rotateZ: "80deg" }] },
              ]}
              onPress={() => navigation.goBack()}
            >
              <LinearGradient
                colors={["gray", "#FFFFFF"]}
                start={{ x: 0, y: 2 }}
                end={{ x: 1, y: 1 }}
                style={styles.actionCircleButton}
              >
                <UseIcons
                  name="angle-left"
                  set="FontAwesome6"
                  size={20}
                  color="#4ACDD1"
                  style={[{ transform: [{ rotateZ: "-80deg" }] }]}
                />
              </LinearGradient>
            </Pressable>
            <View style={{ flex: 0.85, alignItems: "center" }}>
              <Text style={[styles.headerTitle]}>Catat Pemeriksaan Baru</Text>
            </View>
          </View>
        </View>

        <View style={[styles.lowerContent]}>
          <ScrollView 
            style={[styles.formSection, {flex: 1, marginBlockEnd: 30}]}
          >
            <View style={{ gap: 25 }}>
              <View style={[{ gap: 20 }]}>
                <View>
                  <Text style={styles.formTextTitle}>NIK</Text>
                  <View style={styles.form}>
                    <View style={[styles.formInput, { height: 49 }]}>
                      <Controller
                        control={control}
                        rules={{
                          required: true,
                        }}
                        render={({ field: { onChange, onBlur, value } }) => (
                          <TextInput
                            placeholder="Masukkan NIK pasien sesuai KTP!"
                            onBlur={onBlur}
                            onChangeText={onChange}
                            value={value}
                          />
                        )}
                        name="citizen_id"
                      />
                      {errors.citizen_id && (
                        <Text style={styles.errorTextInput}>
                          Mohon masukkan NIK pasien!
                        </Text>
                      )}
                    </View>
                  </View>
                </View>
                <View>
                  <Text style={styles.formTextTitle}>Nama Pasien</Text>
                  <View style={styles.form}>
                    <View style={[styles.formInput, { height: 49 }]}>
                      <Controller
                        control={control}
                        rules={{
                          required: true,
                        }}
                        render={({ field: { onChange, onBlur, value } }) => (
                          <TextInput
                            placeholder="Masukkan nama lengkap pasien"
                            onBlur={onBlur}
                            onChangeText={onChange}
                            value={value}
                          />
                        )}
                        name="name"
                      />
                      {errors.name && (
                        <Text style={styles.errorTextInput}>
                          Mohon masukkan nama pasien!
                        </Text>
                      )}
                    </View>
                  </View>
                </View>
                <View>
                  <Text style={styles.formTextTitle}>Umur</Text>
                  <View style={styles.form}>
                    <View style={[styles.formInput, { height: 49 }]}>
                      <Controller
                        control={control}
                        rules={{
                          required: true,
                        }}
                        render={({ field: { onChange, onBlur, value } }) => (
                          <TextInput
                            placeholder="Masukkan umur pasien"
                            onBlur={onBlur}
                            onChangeText={onChange}
                            value={value}
                          />
                        )}
                        name="age"
                      />
                      {errors.age && (
                        <Text style={styles.errorTextInput}>
                          Mohon masukkan umur pasien!
                        </Text>
                      )}
                    </View>
                  </View>
                </View>
                <View>
                  <Text style={styles.formTextTitle}>Jenis Kelamin</Text>
                  <View style={styles.form}>
                    <View style={[styles.formInput, { height: 49 }]}>
                      <Controller
                        control={control}
                        rules={{
                          required: true,
                        }}
                        render={({ field: { onChange, onBlur, value } }) => (
                          <TextInput
                            placeholder="Masukkan jenis-kelamin pasien"
                            onBlur={onBlur}
                            onChangeText={onChange}
                            value={value}
                          />
                        )}
                        name="gender"
                      />
                      {errors.gender && (
                        <Text style={styles.errorTextInput}>
                          Mohon masukkan nama pasien!
                        </Text>
                      )}
                    </View>
                  </View>
                </View>
                <View>
                  <Text style={styles.formTextTitle}>Keluhan</Text>
                  <View style={styles.form}>
                    <View
                      style={[
                        styles.formInput,
                        { height: 70, justifyContent: "none" },
                      ]}
                    >
                      <Controller
                        control={control}
                        rules={{
                          required: true,
                        }}
                        render={({ field: { onChange, onBlur, value } }) => (
                          <TextInput
                            placeholder="Masukkan keluhan pasien"
                            onBlur={onBlur}
                            onChangeText={onChange}
                            value={value}
                          />
                        )}
                        name="complaint"
                      />
                      {errors.complaint && (
                        <Text style={styles.errorTextInput}>
                          Mohon masukkan keluhan pasien!
                        </Text>
                      )}
                    </View>
                  </View>
                </View>
              </View>
              <View style={styles.diagnoseSection}>
                <Text style={[styles.formTextTitle]}>Diagnosa</Text>
                <View style={styles.form}>
                  <View
                    style={[
                      styles.formInput,
                      { height: 70, justifyContent: "none" },
                    ]}
                  >
                    <Controller
                      control={control}
                      rules={{
                        required: true,
                      }}
                      render={({ field: { onChange, onBlur, value } }) => (
                        <TextInput
                          placeholder="Masukkan NIK pasien sesuai KTP!"
                          onBlur={onBlur}
                          onChangeText={onChange}
                          value={value}
                        />
                      )}
                      name="diagnose"
                    />
                    {errors.diagnose && (
                      <Text style={styles.errorTextInput}>
                        Mohon masukkan diagnosa pasien!
                      </Text>
                    )}
                  </View>
                </View>
              </View>
            </View>
          </ScrollView>

          <View style={[styles.buttonSection]}>
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
                    navigation.navigate("medicine-picker");
                }}
              >
                <View
                  style={[
                    { flex: 2, flexDirection: "row", alignItems: "center" },
                  ]}
                >
                  <View style={[styles.iconFitting]}>
                  </View>
                  <Text
                    style={[
                      styles.medText,
                      { color: "#fff", fontSize: 18 },
                    ]}
                  >
                    Pilih Obat
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
        </View>

        <StatusBar style="auto" />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: windowHeight,
    paddingTop: 19,
    paddingInline: 16,
    backgroundColor: "#F7F9FC",
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  actionCircleButtonContainer: {
    width: 45,
    height: 45,
    borderRadius: 45 / 2,
    overflow: "hidden",

    shadowColor: "#000",
    elevation: 2,
  },
  actionCircleButton: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
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
    marginBlockEnd: 28,
  },
  lowerContent: {
    flex: 1,
  },
  buttonSection: {
    alignContent: "center",
    alignItems: "center",
    justifyContent: "center",

    paddingBlockEnd: 18,    
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
  form: {
    paddingBlockStart: 14,
  },
  formInput: {
    borderWidth: 1,
    borderColor: "#EDEDED",
    borderRadius: 12,
    justifyContent: "center",
    paddingLeft: 10,
  },
  errorTextInput: {
    color: "red",
  },
  diagnoseSection: {
    borderTopWidth: 1,
    borderTopColor: "#D9D9D9",
    paddingBlockStart: 20,
  },
  actionButton: {
    paddingInline: 24,
    paddingBlock: 17.5,
    borderRadius: 14,
  },

});
