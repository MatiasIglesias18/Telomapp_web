import { style } from "deprecated-react-native-prop-types/DeprecatedViewPropTypes";
import React from "react";
import { View, TouchableOpacity } from "react-native";
import { Text, Image, Icon } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";
import { doc, deleteDoc } from "firebase/firestore";
import { screen, db } from "../../../utils";
import { styles } from "./TeloFavorite.styles";

export function TeloFavorite(props) {
  const { telo } = props;

  const navigation = useNavigation();

  const goToTelo = () => {
    navigation.navigate(screen.telo.tab, {
      screen: screen.telo.telo,
      params: {
        id: telo.id,
      },
    });
  };
  const onRemoveFavorite = async () => {
    try {
      await deleteDoc(doc(db, "favorites", telo.idFavorite));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <TouchableOpacity onPress={goToTelo}>
      <View styles={style.content}>
        <Image source={{ uri: telo.images[0] }} style={styles.image} />
        <View style={styles.infoContent}>
          <Text style={styles.name}>{telo.name}</Text>
          <Icon
            type="material-community"
            name="heart"
            color="#EA0C0C"
            size={35}
            containerStyle={styles.iconContent}
            onPress={onRemoveFavorite}
          />
        </View>
      </View>
    </TouchableOpacity>
  );
}
