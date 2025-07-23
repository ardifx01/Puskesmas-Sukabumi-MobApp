import React, { useState, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useForm, Controller } from "react-hook-form";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Image,
  Dimensions,
  TouchableOpacity,
} from "react-native";

import { StatusBar } from "expo-status-bar";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

export default function LoginScreens() {

  const { control, handleSubmit, formState: { errors },} = useForm({
    defaultValues: {
      usrnm: "",
      pwd: "",
    },
  });
  const onSubmit = (data) => console.log(data);


  return (
    <SafeAreaView style={{ backgroundColor: "#fff" }}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Image
            source={require("../assets/kemenkes_logo.png")}
            style={styles.logo}
            resizeMode="none"
          />
        </View>
        <Text></Text>
        <View style={styles.contents}>
          <Text style={styles.titleText}>Selamat Datang!</Text>
          <Text style={[styles.contentText, { marginBlockStart: 12 }]}>
            Masukkan username dan password dari admin. Hubungi administrator
            jika mengalami kendala
          </Text>
          <View style={styles.loginForm}>
            <View style={styles.loginInput}>
              <Controller
                control={control}
                rules={{
                  required: true,
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    placeholder="Masukkan Username"
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                  />
                )}
                name="usrnm"
              />
              {errors.usrnm && <Text style={styles.errorTextInput}>Mohon masukkan username anda!</Text>}
            </View>

            <View style={styles.loginInput}>
              <Controller
                control={control}
                rules={{
                  required: true,
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    placeholder="Masukkan Password"
                    secureTextEntry={true}
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                  />
                )}
                name="pwd"
              />
              {errors.pwd && <Text style={styles.errorTextInput}>Mohon masukkan password anda!</Text>}
            </View>
            <TouchableOpacity
              style={styles.submitButton}
              onPress={handleSubmit(onSubmit)}
            >
              <Text style={styles.submitText}>Masuk</Text>
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
    backgroundColor: "#fff",
    height: "100%",
    paddingLeft: 16,
    paddingTop: 46,
    paddingRight: 16,
  },
  logo: {
    width: windowWidth * 0.5,
    height: windowHeight * 0.04,
  },
  contents: {
    marginBlockStart: 80,
  },
  titleText: {
    fontFamily: "HelveticaNeue-Bold",
    fontWeight: 700,
    fontSize: 28,

    color: "#4ACDD1",
  },
  contentText: {
    fontFamily: "HelveticaNeue-Light",
    fontWeight: 300,
    fontSize: 16,
    lineHeight: 18,
  },
  loginForm: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-between",
    marginBlockStart: 60,
  },
  loginInput: {
    height: 56,
    borderWidth: 1,
    borderColor: "#EDEDED",
    borderRadius: 14,
    justifyContent: "center",
    paddingLeft: 10,
    marginBlockEnd: 16,
  },
  errorTextInput: {
    color: "red",
  },
  submitButton: {
    marginBlockStart: 12,

    height: 49,
    backgroundColor: "#4ACDD1",
    borderRadius: 14,

    alignItems: "center",
    justifyContent: "center",
  },
  submitText: {
    fontFamily: "HelveticaNeue",
    fontWeight: 500,
    fontSize: 18,
    color: "white",
  },
});
