import React from "react";
import { ScrollView } from "react-native";
import { Button } from "react-native-elements";
import { useFormik } from "formik";
import { v4 as uuid } from "uuid";
import { doc, setDoc } from "firebase/firestore";
import { useNavigation } from "@react-navigation/native";
import {
  InfoForm,
  UploadImageForm,
  ImageTelo,
} from "../../../components/Telos/AddTelo";
import { db } from "../../../utils";
import { initialValues, validationSchema } from "./AddTelosScreen.data";
import { styles } from "./AddTelosScreen.styles";

export function AddTelosScreen() {
  const navigation = useNavigation();
  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: validationSchema(),
    validateOnChange: false,
    onSubmit: async (formValue) => {
      try {
        const newData = formValue;

        newData.id = uuid();
        newData.createAt = new Date();

        await setDoc(doc(db, "telos", newData.id), newData);

        navigation.goBack();
      } catch (error) {
        console.log(error);
      }
    },
  });

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <ImageTelo formik={formik} />

      <InfoForm formik={formik} />

      <UploadImageForm formik={formik} />

      <Button
        title="Crear telo"
        buttonStyle={styles.addTelo}
        onPress={formik.handleSubmit}
        loading={formik.isSubmitting}
      />
    </ScrollView>
  );
}
