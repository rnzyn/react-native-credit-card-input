import React, {Component, PropTypes} from "react";
import {
  View,
  Image,
  Text,
  StyleSheet,
  Platform,
} from "react-native";
import defaultIcons from "./Icons";
import {s} from "./StyleSheet";
import FlipCard from "react-native-flip-card";
const BASE_SIZE = {width: 300, height: 190};
/* eslint react/prop-types: 0 */ // https://github.com/yannickcr/eslint-plugin-react/issues/106
export default class CardView extends Component {
  static propTypes = {
    focused: PropTypes.string,

    brand: PropTypes.string,
    name: PropTypes.string,
    number: PropTypes.string,
    expiry: PropTypes.string,
    cvc: PropTypes.string,
    placeholder: PropTypes.object,

    scale: PropTypes.number,
    fontFamily: PropTypes.string,
    imageFront: PropTypes.number,
    imageBack: PropTypes.number,
    customIcons: PropTypes.object,
  };

  static defaultProps = {
    name: "",
    placeholder: {
      number: "•••• •••• •••• ••••",
      name: "FULL NAME",
      expiry: "••/••",
      cvc: "•••",
    },

    scale: 1,
    fontFamily: Platform.select({ios: "Courier", android: "monospace"}),
    imageFront: require("../images/card-front.png"),
    imageBack: require("../images/card-back.png"),
  };

  render() {
    const {
      focused,
      brand, name, number, expiry, cvc, customIcons,
      placeholder, imageFront, imageBack, scale, fontFamily
    } = this.props;

    const Icons = {...defaultIcons, ...customIcons};
    const isAmex = brand === "american-express";
    const shouldFlip = !isAmex && focused === "cvc";

    const containerSize = {...BASE_SIZE, height: BASE_SIZE.height * scale};
    const transform = {
      transform: [
        {scale},
        {translateY: ((BASE_SIZE.height * (scale - 1) / 2))},
      ]
    };

    return (
      <View style={[s.cardContainer, containerSize]}>
        <FlipCard style={{borderWidth: 0}}
                  flipHorizontal
                  flipVertical={false}
                  friction={10}
                  perspective={2000}
                  clickable={false}
                  flip={shouldFlip}>
          <Image style={[BASE_SIZE, s.cardFace, transform]}
                 source={imageFront}>
            <Image style={[s.icon]}
                   source={Icons[brand]}/>
            <Text
              style={[s.baseText, {fontFamily}, s.number, !number && s.placeholder, focused === "number" && s.focused]}>
              { !number ? placeholder.number : number }
            </Text>
            <Text style={[s.baseText, {fontFamily}, s.name, !name && s.placeholder, focused === "name" && s.focused]}
                  numberOfLines={1}>
              { !name ? placeholder.name : name.toUpperCase() }
            </Text>
            <Text style={[s.baseText, {fontFamily}, s.expiryLabel, s.placeholder, focused === "expiry" && s.focused]}>
              MONTH/YEAR
            </Text>
            <Text
              style={[s.baseText, {fontFamily}, s.expiry, !expiry && s.placeholder, focused === "expiry" && s.focused]}>
              { !expiry ? placeholder.expiry : expiry }
            </Text>
            { isAmex &&
            <Text style={[s.baseText, {fontFamily}, s.amexCVC, !cvc && s.placeholder, focused === "cvc" && s.focused]}>
              { !cvc ? placeholder.cvc : cvc }
            </Text> }
          </Image>
          <Image style={[BASE_SIZE, s.cardFace, transform]}
                 source={imageBack}>
            <Text style={[s.baseText, s.cvc, !cvc && s.placeholder, focused === "cvc" && s.focused]}>
              { !cvc ? placeholder.cvc : cvc }
            </Text>
          </Image>
        </FlipCard>
      </View>
    );
  }
}
