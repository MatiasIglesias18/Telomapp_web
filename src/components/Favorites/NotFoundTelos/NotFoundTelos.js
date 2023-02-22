import React from "react";
import { View } from "react-native";
import { Text, Icon } from "react-native-elements";
import { styles } from "./NotFoundTelos.styles";

export function NotFoundTelos() {
  return (
    <View style={styles.content}>
      <Icon
        type="material-community"
        name="heart-broken"
        size={80}
        color="#EA0C0C"
      />
      <Text style={styles.text}>No tenés ningún Favorito</Text>
    </View>
  );
}
