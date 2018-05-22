import * as React from "react";
import * as ReactDOM from "react-dom";
import {
    AppBar,
    AppBarIcon,
    AppBarNav,
    AppBarSection,
    AppBarTab,
    AppBarTitle,
} from "./theme/appbar";
import { SettingsIcon } from "./theme/icons";

ReactDOM.render(
    <AppBar>
        <AppBarSection>
            <AppBarTitle>Epidemia</AppBarTitle>
            <AppBarIcon>
                <SettingsIcon />
            </AppBarIcon>
        </AppBarSection>
        <AppBarNav>
            <AppBarTab>Dashboard</AppBarTab>
            <AppBarTab>Infection</AppBarTab>
            <AppBarTab>Player</AppBarTab>
        </AppBarNav>
    </AppBar>,
    document.getElementById("root"),
);
