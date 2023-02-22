import React, { useState, useEffect } from "react";
import { View, Text } from "react-native";
import { Icon } from "react-native-elements";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { LoadingModal } from "../../../components/Shared";
import { ListTelos } from "../../../components/Telos";
import { screen, db } from "../../../utils";
import { styles } from "./TelosScreen.styles";

export function TelosScreen(props) {
  const { navigation } = props;

  const [currentUser, setCurrentUser] = useState(null);

  const [telos, setTelos] = useState(null);

  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    });
  }, []);

  useEffect(() => {
    const q = query(collection(db, "telos"), orderBy("createAt", "desc"));

    onSnapshot(q, (snapshot) => {
      setTelos(snapshot.docs);
    });
  }, []);

  const goToAddTelo = () => {
    navigation.navigate(screen.telo.addTelo);
  };

  return (
    <View style={styles.content}>
      {!telos ? (
        <LoadingModal show text="Cargando" />
      ) : (
        <ListTelos telos={telos} />
      )}

      {currentUser && (
        <Icon
          reverse
          type="material-community"
          name="plus"
          color="#F760A2"
          containerStyle={styles.btnContainer}
          onPress={goToAddTelo}
        />
      )}
    </View>
  );
}
