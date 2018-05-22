import * as React from "react";
import { Route } from "react-router-dom";
import {
    AppBar,
    AppBarIcon,
    AppBarNav,
    AppBarSection,
    AppBarTab,
    AppBarTitle,
} from "../theme/appbar";
import { SettingsIcon } from "../theme/icons";
import { Dashboard } from "./dashboard";

export const App: React.SFC<{}> = () => {
    return (
        <React.Fragment>
            <AppBar>
                <AppBarSection>
                    <AppBarTitle>Epidemia</AppBarTitle>
                    <AppBarIcon to="/settings">
                        <SettingsIcon />
                    </AppBarIcon>
                </AppBarSection>
                <AppBarNav>
                    <AppBarTab to="/">Dashboard</AppBarTab>
                    <AppBarTab to="/infection">Infection</AppBarTab>
                    <AppBarTab to="/player">Player</AppBarTab>
                </AppBarNav>
            </AppBar>
            <Route path="/" exact component={Dashboard} />
        </React.Fragment>
    );
};
