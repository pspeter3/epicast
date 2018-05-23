import * as React from "react";
import { Route } from "react-router-dom";
import { SettingsIcon } from "../theme/icons";
import { AppBar, Row } from "../theme/layout";
import { IconLink, TabLink } from "../theme/links";
import { Title } from "../theme/typography";
import { Dashboard } from "./dashboard";
import { Infection } from "./infection";

export const App: React.SFC<{}> = () => {
    return (
        <React.Fragment>
            <AppBar>
                <Row>
                    <Title>Epidemia</Title>
                    <IconLink to="/settings">
                        <SettingsIcon />
                    </IconLink>
                </Row>
                <Row>
                    <TabLink to="/">Dashboard</TabLink>
                    <TabLink to="/infection">Infection</TabLink>
                </Row>
            </AppBar>
            <Route path="/" exact component={Dashboard} />
            <Route path="/infection" exact component={Infection} />
        </React.Fragment>
    );
};
