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
  ScrollView, Button,
} from "react-native";
import { RadioButton } from "react-native-paper";
import DateTimePicker from '@react-native-community/datetimepicker';
import {Picker} from '@react-native-picker/picker';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { FlatList } from "react-native-gesture-handler";
import axios from "axios";

import { useNavigation } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { LinearGradient } from "expo-linear-gradient";
// import { isLoaded, useFonts } from "expo-font";

import UseIcons from "../../middleware/tools/useIcons";
import { API_URL } from "../../middleware/context/authContext";
import { goBack } from "expo-router/build/global-state/routing";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;
const ENDPOINT_URL = "patient/register";

const namaBulan = [
  "Januari", "Februari", "Maret", "April", "Mei", "Juni",
  "Juli", "Agustus", "September", "Oktober", "November", "Desember"
];

const printDate = (dateString) => {
  const convertDate = (date) => {
    const year = date.getFullYear();
    const monthInArray = date.getMonth();
    const day = date.getDate();

    return `${day} ${namaBulan[monthInArray]} ${year}`;
  }
  
  if(dateString) {
    const date = new Date(dateString);
    const convertedDate = convertDate(date);
    return convertedDate;
  } else {
    const date = new Date();
    const convertedDate = convertDate(date);
    return convertedDate;
  }
};
// Default export
export default function NewPatientScreen({ route }) {
  const [formData, setFormData] = useState();
  const navigation = useNavigation();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      nomor_rm: "",
      nama_lengkap: "",
      nik: "",
      jenis_kelamin: "",
      tanggal_lahir: "",
      umur: "",
      alamat: "",
      no_hp: "",
      email: "",
      gol_darah: "",
      status_nikah: "",
      pekerjaan: "",
      nama_kk: "",
      hubungan_kk: "",
      keluhan: "",
      diagnosa: ""
    },
  });
  const onSubmit = (data) => {
    console.log("From onSubmit", data);

    const birthDate = new Date(data.tanggal_lahir);
    const today = new Date();
    const age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }


    data.umur = age;
    data.tanggal_lahir = birthDate.toLocaleDateString("sv-SE");

    setFormData(data);
  };
  useEffect(() => {
    const submitForm = async() => {
      if(formData){
        console.log("Form Detected: ", formData);
        console.log("Processing to upload....");
        const response = await axios.post(`${API_URL}/${ENDPOINT_URL}`, formData);
        console.log("Succesfully Uploaded, Response Data: ", response.data);
        alert("Upload Data Success");
        navigation.goBack();
      }
    };
    submitForm();
  }, [formData]);


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
          <KeyboardAwareScrollView 
            style={[styles.formSection, {flex: 1, marginBlockEnd: 30}]}
            enableOnAndroid={true}        
            extraScrollHeight={40}         
            keyboardOpeningTime={2}        
            keyboardShouldPersistTaps="handled"
          >
            <View>
              <View style={[{ gap: 20 }]}>
                <View>
                  <Text style={styles.formTextTitle}>Nomor RM</Text>
                  <View style={styles.form}>
                    <View style={[styles.formInput, { height: 49 }]}>
                      <Controller
                        control={control}
                        rules={{
                          required: true,
                        }}
                        render={({ field: { onChange, onBlur, value } }) => (
                          <TextInput
                            placeholder="Harap diisi !"
                            onBlur={onBlur}
                            onChangeText={onChange}
                            value={value}
                          />
                        )}
                        name="nomor_rm"
                      />
                      {errors.nomor_rm && (
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
                            placeholder="Harap diisi!"
                            onBlur={onBlur}
                            onChangeText={onChange}
                            value={value}
                          />
                        )}
                        name="nama_lengkap"
                      />
                        {errors.nama_lengkap && (
                          <Text style={styles.errorTextInput}>
                            Mohon masukkan nama pasien!
                          </Text>)}
                    </View>
                  </View>
                </View>
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
                            placeholder="Harap diisi!"
                            onBlur={onBlur}
                            onChangeText={onChange}
                            value={value}
                          />
                        )}
                        name="nik"
                      />
                      {errors.nik && (
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
                    <View style={[styles.formInput, {borderWidth: 0}]}>
                      <Controller
                        control={control}
                        rules={{
                          required: true,
                        }}
                        render={({ field: { onChange, onBlur, value } }) => (
                          <RadioButton.Group onValueChange={onChange} value={value}>
                            <View style={{flexDirection: "row"}}>
                              <View style={{ flexDirection: "row", alignItems: "center" }}>
                                <RadioButton value="L" color="#4ACDD1"/>
                                <Text>Laki-laki</Text>
                              </View>
                              <View style={{ flexDirection: "row", alignItems: "center" }}>
                                <RadioButton value="P" color="#4ACDD1" />
                                <Text>Perempuan</Text>
                              </View>
                            </View>
                          </RadioButton.Group>
                        )}
                        name="jenis_kelamin"
                      />
                      {errors.jenis_kelamin && (
                        <Text style={styles.errorTextInput}>
                          Pilih jenis kelamin pasien!
                        </Text>
                      )}
                    </View>
                  </View>
                </View>
                <View>
                  <Text style={styles.formTextTitle}>Tempat Lahir</Text>
                  <View style={styles.form}>
                    <View style={[styles.formInput, { height: 49 }]}>
                      <Controller
                        control={control}
                        rules={{
                          required: true,
                        }}
                        render={({ field: { onChange, onBlur, value } }) => (
                          <TextInput
                            placeholder="Harap diisi!"
                            onBlur={onBlur}
                            onChangeText={onChange}
                            value={value}
                          />
                        )}
                        name="tempat_lahir"
                      />
                      {errors.tempat_lahir && (
                        <Text style={styles.errorTextInput}>
                          Mohon masukkan tempat lahir pasien !
                        </Text>
                      )}
                    </View>
                  </View>
                </View>
                <View>
                  <Text style={styles.formTextTitle}>Tanggal Lahir</Text>
                  <View style={styles.form}>
                    <View style={[ { height: 49 }]}>
                      <Controller
                        control={control}
                        rules={{
                          required: true,
                        }}
                         render={({ field: { onChange, value } }) => {
                          const [show, setShow] = useState(false);

                          return (
                            <View>
                              <Button title={value ? 
                                              printDate(value.toLocaleDateString('sv-SE')) 
                                              : "Pilih Tanggal"}
                                      onPress={() => setShow(true)} color="#4ACDD1"
                              />
                              {/* <Text>{value.toDateString()}</Text> */}
                              {show && (
                                <DateTimePicker
                                  value={value || new Date()}
                                  mode="date"
                                  display="default"
                                  onChange={(event, selectedDate) => {
                                    setShow(false); // sembunyikan picker
                                    if (selectedDate) {
                                      console.log(selectedDate);
                                      onChange(selectedDate); // update form state
                                    }
                                  }}
                                />
                              )}
                            </View>
                          );
                        }}
                        name="tanggal_lahir"
                      />
                      {errors.tanggal_lahir && (
                        <Text style={styles.errorTextInput}>
                          Pilih Tanggal Lahir !
                        </Text>
                      )}
                    </View>
                  </View>
                </View>
                <View>
                  <Text style={styles.formTextTitle}>Alamat</Text>
                  <View style={styles.form}>
                    <View style={[styles.formInput, { height: 49 }]}>
                      <Controller
                        control={control}
                        rules={{
                          required: true,
                        }}
                        render={({ field: { onChange, onBlur, value } }) => (
                          <TextInput
                            placeholder="Harap diisi!"
                            onBlur={onBlur}
                            onChangeText={onChange}
                            value={value}
                          />
                        )}
                        name="alamat"
                      />
                      {errors.alamat && (
                        <Text style={styles.errorTextInput}>
                          Mohon masukkan Alamat pasien !
                        </Text>
                      )}
                    </View>
                  </View>
                </View>
                <View>
                  <Text style={styles.formTextTitle}>Nomor HP</Text>
                  <View style={styles.form}>
                    <View style={[styles.formInput, { height: 49 }]}>
                      <Controller
                        control={control}
                        rules={{
                          required: false,
                        }}
                        render={({ field: { onChange, onBlur, value } }) => (
                          <TextInput
                            placeholder="Optional"
                            onBlur={onBlur}
                            onChangeText={onChange}
                            value={value}
                          />
                        )}
                        name="no_hp"
                      />
                    </View>
                  </View>
                </View>
                <View>
                  <Text style={styles.formTextTitle}>E-mail</Text>
                  <View style={styles.form}>
                    <View style={[styles.formInput, { height: 49 }]}>
                      <Controller
                        control={control}
                        rules={{
                          required: false,
                        }}
                        render={({ field: { onChange, onBlur, value } }) => (
                          <TextInput
                            placeholder="Optional"
                            onBlur={onBlur}
                            onChangeText={onChange}
                            value={value}
                          />
                        )}
                        name="email"
                      />
                    </View>
                  </View>
                </View>
                <View>
                  <Text style={styles.formTextTitle}>Golongan Darah</Text>
                  <View style={styles.form}>
                    <View style={[styles.formInput, {borderWidth: 0}]}>
                      <Controller
                        control={control}
                        rules={{
                          required: true,
                        }}
                        render={({ field: { onChange, onBlur, value } }) => (
                          <RadioButton.Group onValueChange={onChange} value={value}>
                            <View style={{flexDirection: "row"}}>
                              <View style={{ flexDirection: "row", alignItems: "center" }}>
                                <RadioButton value="A" color="#4ACDD1"/>
                                <Text>A</Text>
                              </View>
                              <View style={{ flexDirection: "row", alignItems: "center" }}>
                                <RadioButton value="B" color="#4ACDD1" />
                                <Text>B</Text>
                              </View>
                              <View style={{ flexDirection: "row", alignItems: "center" }}>
                                <RadioButton value="AB" color="#4ACDD1"/>
                                <Text>AB</Text>
                              </View>
                              <View style={{ flexDirection: "row", alignItems: "center" }}>
                                <RadioButton value="O" color="#4ACDD1" />
                                <Text>O</Text>
                              </View>
                            </View>
                          </RadioButton.Group>
                        )}
                        name="gol_darah"
                      />
                      {errors.gol_darah && (
                        <Text style={styles.errorTextInput}>
                          Pilih Golongan Darah Pasien !
                        </Text>
                      )}
                    </View>
                  </View>
                </View>
                <View>
                  <Text style={styles.formTextTitle}>Status Nikah</Text>
                  <View style={styles.form}>
                    <View style={[styles.formInput, {borderWidth: 0}]}>
                      <Controller
                        control={control}
                        rules={{
                          required: true,
                        }}
                        render={({ field: { onChange, onBlur, value } }) => (
                          <RadioButton.Group onValueChange={onChange} value={value ? value : "Belum Menikah"}>
                            <View style={{flexDirection: "row"}}>
                              <View style={{ flexDirection: "row", alignItems: "center" }}>
                                <RadioButton value="Belum Menikah" color="#4ACDD1"/>
                                <Text>Belum Menikah</Text>
                              </View>
                              <View style={{ flexDirection: "row", alignItems: "center" }}>
                                <RadioButton value="Menikah" color="#4ACDD1" />
                                <Text>Menikah</Text>
                              </View>
                              <View style={{ flexDirection: "row", alignItems: "center" }}>
                                <RadioButton value="Cerai" color="#4ACDD1"/>
                                <Text>Cerai</Text>
                              </View>
                            </View>
                          </RadioButton.Group>
                        )}
                        name="status_nikah"
                      />
                      {errors.status_nikah && (
                        <Text style={styles.errorTextInput}>
                          Pilih status pernikahan !
                        </Text>
                      )}
                    </View>
                  </View>
                </View>
                <View>
                  <Text style={styles.formTextTitle}>Pekerjaan</Text>
                  <View style={styles.form}>
                    <View style={[styles.formInput, { height: 49 }]}>
                      <Controller
                        control={control}
                        rules={{
                          required: true,
                        }}
                        render={({ field: { onChange, onBlur, value } }) => (
                          <TextInput
                            placeholder="Harap diisi !"
                            onBlur={onBlur}
                            onChangeText={onChange}
                            value={value}
                          />
                        )}
                        name="pekerjaan"
                      />
                      {errors.pekerjaan && (
                        <Text style={styles.errorTextInput}>
                          Mohon masukkan Pekerjaan pasien!
                        </Text>
                      )}
                    </View>
                  </View>
                </View>
                <View>
                  <Text style={styles.formTextTitle}>Nama Kepala Keluarga</Text>
                  <View style={styles.form}>
                    <View style={[styles.formInput, { height: 49 }]}>
                      <Controller
                        control={control}
                        rules={{
                          required: true,
                        }}
                        render={({ field: { onChange, onBlur, value } }) => (
                          <TextInput
                            placeholder="Harap diisi !"
                            onBlur={onBlur}
                            onChangeText={onChange}
                            value={value}
                          />
                        )}
                        name="nama_kk"
                      />
                      {errors.nama_kk && (
                        <Text style={styles.errorTextInput}>
                          Mohon masukkan nama Kepala Keluarga pasien!
                        </Text>
                      )}
                    </View>
                  </View>
                </View>
                <View>
                  <Text style={styles.formTextTitle}>Hubungan Kepala Keluarga</Text>
                  <View style={styles.form}>
                    <View style={[styles.formInput, {borderWidth: 0}]}>
                      <Controller
                        control={control}
                        rules={{
                          required: true,
                        }}
                        render={({ field: { onChange, value } }) => (
                          <Picker
                            selectedValue={value}
                            onValueChange={(itemValue) => onChange(itemValue)}
                            style={styles.picker}
                            mode="dropdown"
                          >
                            <Picker.Item label="Pilih hubungan dengan Kepala Keluarga...." value="" />
                            <Picker.Item label="Kepala Keluarga" value="Kepala Keluarga" />
                            <Picker.Item label="Istri" value="Istri" />
                            <Picker.Item label="Anak" value="Anak" />
                            <Picker.Item label="Ayah" value="Ayah" />
                            <Picker.Item label="Ibu" value="Ibu" />
                            <Picker.Item label="Saudara" value="Saudara" />
                            <Picker.Item label="Keponakan" value="Keponakan" />
                            <Picker.Item label="Cucu" value="Cucu" />
                            <Picker.Item label="Mertua" value="Mertua" />
                            <Picker.Item label="Menantu" value="Menantu" />
                            <Picker.Item label="Pembantu" value="Pembantu" />
                            <Picker.Item label="Lainnya" value="Lainnya" />
                          </Picker>
                        )}
                        name="hubungan_kk"
                      />
                      {errors.hubungan_kk && (
                        <Text style={styles.errorTextInput}>
                          Pilih hubungan dengan Kepala Keluarga !
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
                        name="keluhan"
                      />
                      {errors.keluhan && (
                        <Text style={styles.errorTextInput}>
                          Mohon masukkan keluhan pasien!
                        </Text>
                      )}
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
                        name="diagnosa"
                      />
                      {errors.diagnosa && (
                        <Text style={styles.errorTextInput}>
                          Mohon masukkan diagnosa pasien!
                        </Text>
                      )}
                    </View>
                  </View>
                </View>
              </View>

            </View>
          </KeyboardAwareScrollView>

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
                onPress={handleSubmit(onSubmit)}
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
