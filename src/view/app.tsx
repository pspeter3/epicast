import * as React from "react";
import { Route } from "react-router-dom";
import { AppBar } from "../theme/appbar";
import { SettingsIcon } from "../theme/icons";
import { Row } from "../theme/layout";
import { IconLink, TabLink } from "../theme/links";
import { Title } from "../theme/typography";
import { Dashboard } from "./dashboard";

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
        </React.Fragment>
    );
};
