import * as React from "react";
import {
    AppBar,
    AppBarIcon,
    AppBarNav,
    AppBarSection,
    AppBarTab,
    AppBarTitle,
} from "./theme/appbar";
import { SettingsIcon } from "./theme/icons";

export class App extends React.Component<{}, {}> {
    public render() {
        return (
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
        );
    }
}
