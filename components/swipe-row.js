import React, { useEffect, useState, useRef } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  PanResponder,
  View
} from "react-native";
import { Icon } from "native-base";
import { COLORS } from "GroceryLists/constants/colors";

export function SwipeRow({
  color,
  item,
  store,
  rightButton,
  setIsScrollEnabled
}) {
  const [margin, setMargins] = useState({ right: 0, left: 0 });

  useEffect(() => {
    console.log("useEffect:", margin);
  }, [margin]);

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => false,
      onMoveShouldSetPanResponder: (_, { dx, dy }) => !isSingleTap(dx, dy),
      onPanResponderMove: handlePanResponderMove,
      onPanResponderTerminationRequest: (_, { dx }) =>
        isActuallySwiping(dx) ? false : true,
      onPanResponderTerminate: () => {
        setIsScrollEnabled(true);
        resetMargins();
      },
      onPanResponderRelease: handleReleaseAction
    })
  );

  const isSingleTap = (dx, dy) => dx === 0 && dy === 0;

  const isActuallySwiping = dx => Math.abs(dx) > 50;

  function handlePanResponderMove(_, { dx, ...props }) {
    console.log(props);
    if (isActuallySwiping(dx)) {
      setIsScrollEnabled(false);
    } else {
      setIsScrollEnabled(true);
    }
    setMargins({
      right: -dx + margin.right,
      left: dx + margin.left
    });
  }

  function handleReleaseAction(_, gestureState) {
    if (gestureState.dx < -275) {
      rightButton.action({ store, item: item.name });
    } else if (gestureState.dx < -50) {
      setMargins({ right: 50, left: 0 });
    } else {
      resetMargins();
    }
    setIsScrollEnabled(true);
  }

  function resetMargins() {
    setMargins({ right: 0, left: 0 });
  }
  return (
    <>
      <View
        style={{
          ...styles.itemContainer,
          marginRight: margin.right,
          marginLeft: margin.left,
          backgroundColor: color
        }}
        {...panResponder.current.panHandlers}
      >
        <TouchableOpacity
          style={{
            ...styles.itemNameContainer,
            flexShrink: 1,
            zIndex: 10
          }}
          onPress={() => console.log("foo")}
        >
          <Icon small name="ios-arrow-forward" style={styles.listIcon} />
          <Text style={styles.itemName}>{item.name}</Text>
        </TouchableOpacity>
        <View
          style={{
            ...styles.rightButton,
            right: margin.right === 50 ? -325 : -375,

            backgroundColor: rightButton.color
          }}
        >
          {rightButton.component({
            action: () => rightButton.action({ store, item: item.name })
          })}
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  itemContainer: {
    display: "flex",
    flexDirection: "row",
    borderTopWidth: 0.15,
    borderBottomWidth: 0.15
  },
  itemNameContainer: {
    display: "flex",
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    height: 50
  },
  itemName: {
    fontSize: 20
  },
  listIcon: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 3,
    paddingRight: 10,
    paddingLeft: 35,
    fontSize: 15,
    color: COLORS.DARK_GRAY
  },
  rightButton: {
    display: "flex",
    flex: 1,
    zIndex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    width: "100%",
    height: "100%",
    position: "absolute"
  }
});
