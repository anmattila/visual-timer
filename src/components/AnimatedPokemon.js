import { useEffect } from "react";
import MaskedView from "@react-native-masked-view/masked-view";
import Animated, {
  useSharedValue,
  withTiming,
  useAnimatedStyle,
  Easing,
} from "react-native-reanimated";
import PokemonImage from "./PokemonImage";

export default function AnimatedPokemon({ imageUrl, selectedTime, style }) {
  const sv = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => ({
    height: sv.value * style.height,
  }));

  useEffect(() => {
    sv.value = withTiming(1, {
      duration: selectedTime * 1000,
      easing: Easing.linear,
    });
  }, []);

  // https://medium.com/@burcuozdmr/animating-splash-screen-with-react-native-reanimated-edf0b6c97139

  return (
    <MaskedView
      style={{ width: style.width, height: style.height }}
      maskElement={
        <Animated.View
          style={[
            {
              width: "100%",
              backgroundColor: "white",
            },
            animatedStyle,
          ]}
        />
      }
    >
      <PokemonImage imageUrl={imageUrl} style={style} />
    </MaskedView>
  );
}
