import React from "react";
import {
  Header,
  Title,
  Body,
  Footer,
  FooterTab,
  Text,
  Icon,
  Button
} from "native-base";
import { TABS } from "GroceryLists/constants/tabs";

export const AppHeader = ({ toggleAllListsExpanded, styles }) => (
  <Header iosBarStyle="light-content" style={styles.headerContainer}>
    <Icon
      style={styles.headerIcon}
      name="local-grocery-store"
      type="MaterialIcons"
    />
    <Body>
      <Title style={styles.headerText}>Ahmed Family Grocery Lists</Title>
    </Body>
    <Icon
      style={styles.toggleListIcon}
      type="MaterialCommunityIcons"
      name="arrow-collapse"
      onPress={() => toggleAllListsExpanded("isActiveListExpanded")}
    />
  </Header>
);

export const AppFooter = ({ selectTab, currentTab, styles }) => (
  <Footer style={styles.footer}>
    <FooterTab vertical>
      <Button
        active={currentTab === TABS.CURRENT_LISTS}
        onPress={() => selectTab(TABS.CURRENT_LISTS)}
      >
        <Icon type="FontAwesome5" name="clipboard-list" />
        <Text>Current list</Text>
      </Button>
      <Button
        active={currentTab === TABS.ADD_NEW_STORE}
        onPress={() => selectTab(TABS.ADD_NEW_STORE)}
      >
        <Icon type="FontAwesome5" name="store-alt" />
        <Text>Add new store</Text>
      </Button>
      <Button>
        <Icon type="FontAwesome5" name="book" />
        <Text>Prev. Items</Text>
      </Button>
    </FooterTab>
  </Footer>
);
