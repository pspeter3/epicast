import * as React from "react";
import { Route } from "react-router-dom";
import { AppBar, AppBarIcon, AppBarTab } from "../theme/appbar";
import { SettingsIcon } from "../theme/icons";
import { Row } from "../theme/layout";
import { Title } from "../theme/typography";
import { Dashboard } from "./dashboard";

export const App: React.SFC<{}> = () => {
    return (
        <React.Fragment>
            <AppBar>
                <Row>
                    <Title>Epidemia</Title>
                    <AppBarIcon to="/settings">
                        <SettingsIcon />
                    </AppBarIcon>
                </Row>
                <Row>
                    <AppBarTab to="/">Dashboard</AppBarTab>
                    <AppBarTab to="/infection">Infection</AppBarTab>
                </Row>
            </AppBar>
            <Route path="/" exact component={Dashboard} />
        </React.Fragment>
    );
};
