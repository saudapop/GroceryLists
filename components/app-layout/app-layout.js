import React from "react";
import { debounce } from "lodash";
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
import { TABS } from "Listables/constants/tabs";

export const AppHeader = ({ toggleAllListsExpanded, currentList, styles }) => (
  <Header iosBarStyle="light-content" style={styles.headerContainer}>
    <Icon style={styles.headerIcon} name="list" type="MaterialIcons" />
    <Body>
      <Title style={styles.headerText}> My Listables</Title>
    </Body>
    <Icon
      style={styles.toggleListIcon}
      type="MaterialCommunityIcons"
      name="arrow-collapse"
      onPress={debounce(() => toggleAllListsExpanded(currentList), 500)}
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
        <Text>Current lists</Text>
      </Button>
      <Button
        active={currentTab === TABS.ADD_NEW_STORE}
        onPress={() => selectTab(TABS.ADD_NEW_STORE)}
      >
        <Icon type="FontAwesome5" name="plus" />
        <Text>Add new list</Text>
      </Button>
      <Button
        active={currentTab === TABS.PREVIOUS_LISTS}
        onPress={() => selectTab(TABS.PREVIOUS_LISTS)}
      >
        <Icon type="FontAwesome5" name="book" />
        <Text>Prev. Items</Text>
      </Button>
    </FooterTab>
  </Footer>
);
