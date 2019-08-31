import React, { useEffect, useState, useRef } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  PanResponder,
  View
} from "react-native";
import { Icon } from "native-base";
import { COLORS } from "Listables/constants/colors";

export function SwipeRow({
  color,
  item,
  store,
  rightButton,
  setIsScrollEnabled,
  setCurrentRow,
  currentRow
}) {
  const [margin, setMargins] = useState({ right: 0, left: 0 });
  const marginUpdater = useRef(0);

  useEffect(() => {
    panResponder.current = getPanResponder(margin);
  }, [marginUpdater.current]);

  useEffect(() => {
    const thisRow = `${store.storeName}-${item.name}`;
    if (currentRow && thisRow !== currentRow.name) {
      resetMargins();
      marginUpdater.current = 0;
    }
  }, [currentRow]);

  const getPanResponder = margin =>
    PanResponder.create({
      onStartShouldSetPanResponder: () => false,
      onMoveShouldSetPanResponder: (_, { dx, dy }) => !isSingleTap(dx, dy),
      onPanResponderGrant: handleResponderGrant,
      onPanResponderMove: (_, { dx }) =>
        handlePanResponderMove(_, { dx }, margin),
      onPanResponderTerminationRequest: (_, { dx }) =>
        isActuallySwiping(dx) ? false : true,
      onPanResponderTerminate: () => {
        setIsScrollEnabled(true);
        resetMargins();
      },
      onPanResponderRelease: handleReleaseAction
    });

  const panResponder = useRef(getPanResponder(margin));

  const isSingleTap = (dx, dy) => dx === 0 && dy === 0;

  const isActuallySwiping = dx => Math.abs(dx) > 50;

  const isSwipingFromRight = dx => dx - margin.right < 0;

  function handleResponderGrant() {
    setCurrentRow({
      name: `${store.storeName}-${item.name}`,
      reset: resetMargins
    });
  }

  function handlePanResponderMove(_, { dx }, margin) {
    if (isActuallySwiping(dx)) {
      setIsScrollEnabled(false);
    } else {
      setIsScrollEnabled(true);
    }
    if (isSwipingFromRight(dx)) {
      setMargins({
        right: -dx - margin.right,
        left: dx + margin.left
      });
    }
  }

  function handleReleaseAction(_, { dx }) {
    if (dx < -275) {
      rightButton.action();
    } else if (dx - margin.right < -25) {
      setMargins({ right: 50, left: -50 });
    } else {
      resetMargins();
    }
    setIsScrollEnabled(true);
    marginUpdater.current++;
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
          style={styles.itemNameContainer}
          onPress={() => console.log("foo")}
        >
          <Icon small name="ios-arrow-forward" style={styles.listIcon} />
          <Text style={styles.itemName}>{item.name}</Text>
        </TouchableOpacity>
        <View
          style={{
            ...styles.rightButton,
            backgroundColor: rightButton.color
          }}
        >
          {rightButton.component}
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
    // display: "flex",
    // flex: 1,
    zIndex: 1,
    right: -375,
    flexDirection: "row",
    justifyContent: "flex-start",
    width: "100%",
    height: "100%",
    position: "absolute"
  }
});
