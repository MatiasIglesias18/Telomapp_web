import React from "react";
import { View, FlatList, TouchableOpacity } from "react-native";
import { Image, Text } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";
import { screen } from "../../../utils";
import { styles } from "./ListTelos.styles";

export function ListTelos(props) {
  const { telos } = props;
  const navigation = useNavigation();

  const goToTelo = (telo) => {
    navigation.navigate(screen.telo.telo, { id: telo.id });
  };

  return (
    <FlatList
      data={telos}
      renderItem={(doc) => {
        const telo = doc.item.data();
        return (
          <TouchableOpacity onPress={() => goToTelo(telo)}>
            <View style={styles.content}>
              <Image source={{ uri: telo.images[0] }} style={styles.images} />

              <View>
                <Text style={styles.name}>{telo.name}</Text>
                <Text style={styles.info}>{telo.address}</Text>

                <Text style={styles.info}>{telo.description}</Text>
              </View>
            </View>
          </TouchableOpacity>
        );
      }}
    />
  );
}
