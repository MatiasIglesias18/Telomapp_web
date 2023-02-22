import React, { useState, useEffect } from "react";
import { View } from "react-native";
import { Text, Button, Icon } from "react-native-elements";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import {
  doc,
  setDoc,
  getDocs,
  query,
  where,
  collection,
  deleteDoc,
} from "firebase/firestore";
import Toast from "react-native-toast-message";
import { db } from "../../../utils";
import { size, forEach } from "lodash";
import { v4 as uuid } from "uuid";
import { styles } from "./BtnReserve.styles";

export function BtnReserve(props) {
  const { idTelo } = props;

  const [isReserved, setIsReserved] = useState(undefined);

  const [isReload, setIsReload] = useState(false);

  const auth = getAuth();

  useEffect(() => {
    (async () => {
      const response = await getReserves();
      console.log(size(response));
      if (size(response) > 0) {
        setIsReserved(true);
      } else {
        setIsReserved(false);
      }
    })();
  }, [idTelo, isReload]);

  const onReload = () => setIsReload((prevState) => !prevState);

  const getReserves = async () => {
    const q = query(
      collection(db, "reserves"),
      where("idTelo", "==", idTelo),
      where("idUser", "==", auth.currentUser.uid)
    );

    const result = await getDocs(q);
    return result.docs;
  };

  const addReserve = async () => {
    try {
      const idReserve = uuid();
      const data = {
        id: idReserve,
        idTelo,
        idUser: auth.currentUser.uid,
      };
      await setDoc(doc(db, "reserves", idReserve), data);
      Toast.show({
        type: "success",
        position: "bottom",
        text1: "Reserva hecha",
      });
      onReload();
    } catch (error) {
      console.log(error);
    }
  };

  const removeReserve = async () => {
    try {
      const response = await getReserves();
      forEach(response, async (item) => {
        await deleteDoc(doc(db, "reserves", item.id));
      });
      Toast.show({
        type: "error",
        position: "bottom",
        text1: "Reserva cancelada",
      });
      onReload();
    } catch (error) {
      console.log("ERROR");
    }
  };

  return (
    <View style={styles.content}>
      {isReserved !== undefined && (
        <Icon
          type="material-community"
          name={isReserved ? "bookmark-plus" : "bookmark-plus-outline"}
          color={isReserved ? "#F760A2" : "#000"}
          size={50}
          onPress={isReserved ? removeReserve : addReserve}
        />
      )}
    </View>
  );
}
