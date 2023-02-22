import React from "react";
import { View } from "react-native";
import { Text, Rating } from "react-native-elements";
import { styles } from "./Header.styles";

export function Header(props) {
  const { telo } = props;
  return (
    <View style={styles.content}>
      <View style={styles.titleView}>
        <Text style={styles.name}>{telo.name}</Text>
        <Rating imageSize={20} readonly startingValue={telo.ratingMedia | 0} />
      </View>
      <Text style={styles.description}>{telo.description}</Text>
    </View>
  );
}
