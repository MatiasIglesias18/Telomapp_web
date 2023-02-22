import React from "react";
import { View } from "react-native";
import { AirbnbRating, Input, Button } from "react-native-elements";
import { useFormik } from "formik";
import Toast from "react-native-toast-message";
import { getAuth } from "firebase/auth";
import {
  doc,
  setDoc,
  query,
  collection,
  where,
  onSnapshot,
  updateDoc,
  snapshotEqual,
} from "firebase/firestore";
import { map, mean } from "lodash";
import { useNavigation } from "@react-navigation/native";
import { db } from "../../../utils";
import { v4 as uuid } from "uuid";
import { initialValues, validationSchema } from "./AddTeloReviewScreen.data";
import { styles } from "./AddTeloReviewScreen.styles";

export function AddTeloReviewScreen(props) {
  const { route } = props;
  const navigation = useNavigation();

  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: validationSchema(),
    validateOnChange: false,
    onSubmit: async (formValue) => {
      try {
        const auth = getAuth();
        const idDoc = uuid();
        const newData = formValue;

        newData.id = idDoc;
        newData.idTelo = route.params.idTelo;
        newData.idUser = auth.currentUser.uid;
        newData.avatar = auth.currentUser.photoURL;
        newData.createAt = new Date();

        await setDoc(doc(db, "reviews", idDoc), newData);
        await updateTelo();
      } catch (error) {
        Toast.show({
          type: "error",
          position: "bottom",
          text1: "Error al enviar la calificación",
        });
      }
    },
  });

  const updateTelo = async () => {
    const q = query(
      collection(db, "reviews"),
      where("idTelo", "==", route.params.idTelo)
    );

    onSnapshot(q, async (snapshot) => {
      const reviews = snapshot.docs;

      const arrayStars = map(reviews, (review) => review.data().rating);

      const media = mean(arrayStars);

      const teloRef = doc(db, "telos", route.params.idTelo);

      await updateDoc(teloRef, {
        ratingMedia: media,
      });
      navigation.goBack();
    });
  };

  return (
    <View style={styles.content}>
      <View>
        <View style={styles.ratingContent}>
          <AirbnbRating
            count={5}
            reviews={["Pésimo", "Malo", "Normal", "Muy bueno", "Me encantó"]}
            defaultRating={formik.values.rating}
            size={35}
            onFinishRating={(rating) => formik.setFieldValue("rating", rating)}
          />
        </View>
        <View>
          <Input
            placeholder="Título"
            onChangeText={(text) => formik.setFieldValue("title", text)}
            errorMessage={formik.errors.title}
          />
          <Input
            placeholder="Comentario"
            multiline
            inputContainerStyle={styles.comment}
            onChangeText={(text) => formik.setFieldValue("comment", text)}
            errorMessage={formik.errors.comment}
          />
        </View>
      </View>
      <Button
        title="Enviar comentario"
        containerStyle={styles.btnContainer}
        buttonStyle={styles.btn}
        onPress={formik.handleSubmit}
        loading={formik.isSubmitting}
      />
    </View>
  );
}
