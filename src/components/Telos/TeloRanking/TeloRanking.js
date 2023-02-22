import React from "react";
import { View, TouchableOpacity } from "react-native";
import { Text, Image, Rating, Icon } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";
import { screen } from "../../../utils";
import { styles } from "./TeloRanking.styles";

export function TeloRanking(props) {
  const { telo, index } = props;

  const navigation = useNavigation();

  const goToTelo = () => {
    navigation.navigate(screen.telo.tab, {
      screen: screen.telo.telo,
      params: {
        id: telo.id,
      },
    });
  };

  const renderMedal = () => {
    if (index > 2) return null;
    let color = "";
    if (index === 0) color = "#FFD700";
    if (index === 1) color = "#BEBEBE";
    if (index === 2) color = "#CD7F32";

    return (
      <Icon
        type="material-community"
        name="medal-outline"
        color={color}
        containerStyle={styles.medal}
      />
    );
  };

  return (
    <TouchableOpacity onPress={goToTelo}>
      <View style={styles.content}>
        <Image source={{ uri: telo.images[0] }} style={styles.image} />
        <View style={styles.infoContent}>
          <View style={styles.nameContent}>
            {renderMedal()}
            <Text style={styles.name}>{telo.name}</Text>
          </View>
          <Rating imageSize={15} readonly startingValue={telo.ratingMedia} />
        </View>
        <Text style={styles.description}>{telo.description}</Text>
      </View>
    </TouchableOpacity>
  );
}
