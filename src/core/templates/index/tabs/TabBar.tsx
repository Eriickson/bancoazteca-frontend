import React from "react";
import {
  Tabs,
  TabList,
  TabPanels,
  Tab,
  Text,
  TabPanel,
} from "@chakra-ui/react";

import {
  CeditQuoteSection,
  ManageDeadlinesSection,
  ManageProductsSection,
} from "./section";

export const TabBar = () => {
  const sectionList = [
    {
      title: "Administración de productos",
      Panel: ManageProductsSection,
    },
    {
      title: "Administración de plazos",
      Panel: ManageDeadlinesSection,
    },
    {
      title: "Cotización de créditos",
      Panel: CeditQuoteSection,
    },
  ];
  return (
    <div>
      <Tabs>
        <TabList>
          {sectionList.map((section) => (
            <Tab
              _focus={{ shadow: "none" }}
              key={section.title.toLowerCase().replace(/ /, "-")}
            >
              <Text>{section.title}</Text>
            </Tab>
          ))}
        </TabList>

        <TabPanels>
          {sectionList.map((section) => (
            <TabPanel key={section.title.toLowerCase().replace(/ /, "-")}>
              <section.Panel />
            </TabPanel>
          ))}
        </TabPanels>
      </Tabs>
    </div>
  );
};
