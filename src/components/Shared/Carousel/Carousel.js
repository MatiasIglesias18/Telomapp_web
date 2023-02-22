import React, { useState } from "react";
import { View } from "react-native";
import { Image } from "react-native-elements";
import CarouselSnap, { Pagination } from "react-native-snap-carousel";
import { size } from "lodash";
import { styles } from "./Carousel.styles";

export function Carousel(props) {
  const { arrayImages, width, height, hideDots } = props;
  const [activeDotsIndex, setActiveDotsIndex] = useState(0);

  const renderItem = ({ item }) => (
    <Image source={{ uri: item }} style={{ height, width }} />
  );

  const pagination = () => {
    return (
      <Pagination
        dotsLength={size(arrayImages)}
        activeDotIndex={activeDotsIndex}
        inactiveDotOpacity={0.4}
        inactiveDotScale={0.6}
        containerStyle={styles.dotsContainer}
        dotStyle={styles.dot}
      />
    );
  };
  return (
    <View style={styles.content}>
      <CarouselSnap
        layout="default"
        data={arrayImages}
        sliderWidth={width}
        itemWidth={width}
        renderItem={renderItem}
        onSnapToItem={(index) => setActiveDotsIndex(index)}
      />
      {!hideDots && pagination()}
    </View>
  );
}
