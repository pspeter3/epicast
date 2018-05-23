import * as React from "react";
import { Route } from "react-router-dom";
import { IconButton } from "../theme/buttons";
import { RotateCwwIcon, SettingsIcon } from "../theme/icons";
import { AppBar, Row } from "../theme/layout";
import { IconLink, TabLink } from "../theme/links";
import { Title } from "../theme/typography";
import { Dashboard } from "./dashboard";
import { Discard } from "./discard";
import { Infection } from "./infection";
import { Settings } from "./settings";

export const App: React.SFC<{}> = () => {
    return (
        <React.Fragment>
            <AppBar>
                <Row>
                    <Title>Epidemia</Title>
                    <IconButton>
                        <RotateCwwIcon />
                    </IconButton>
                    <IconLink to="/settings">
                        <SettingsIcon />
                    </IconLink>
                </Row>
                <Row>
                    <TabLink to="/">Dashboard</TabLink>
                    <TabLink to="/infection">Infection</TabLink>
                    <TabLink to="/discard">Discard</TabLink>
                </Row>
            </AppBar>
            <Route path="/" exact component={Dashboard} />
            <Route path="/infection" exact component={Infection} />
            <Route path="/discard" exact component={Discard} />
            <Route path="/settings" exact component={Settings} />
        </React.Fragment>
    );
};
