import * as React from "react";
import * as ReactDOM from "react-dom";
import { AppBar, AppBarContainer, AppBarIcon, AppBarTitle } from "./theme/appbar";
import { SettingsIcon } from "./theme/icons";
import { Tab, TabBar } from "./theme/tabbar";

ReactDOM.render(
    <React.Fragment>
        <AppBar>
            <AppBarContainer>
                <AppBarTitle>Epidemia</AppBarTitle>
                <AppBarIcon>
                    <SettingsIcon />
                </AppBarIcon>
            </AppBarContainer>
        </AppBar>
        <TabBar>
            <Tab>Dashboard</Tab>
            <Tab>Infection</Tab>
            <Tab>Player</Tab>
        </TabBar>
    </React.Fragment>,
    document.getElementById("root"),
);
