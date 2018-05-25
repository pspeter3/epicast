import * as React from "react";
import { Route } from "react-router-dom";
import { Config, Game } from "../core/types";
import { configure } from "../core/updaters";
import { IconButton } from "../theme/buttons";
import { RotateCwwIcon, SettingsIcon } from "../theme/icons";
import { AppBar, Row } from "../theme/layout";
import { IconLink, TabLink } from "../theme/links";
import { Title } from "../theme/typography";
import { DialogService } from "../util/services";
import { Dashboard } from "./dashboard";
import { Discard } from "./discard";
import { Infection } from "./infection";
import { Routes } from "./routes";
import { Settings } from "./settings/settings";

export interface Services {
    dialog: DialogService;
}

export interface Props {
    services: Services;
}

export interface State {
    config: Config;
    games: ReadonlyArray<Game>;
}

export class App extends React.Component<Props, State> {
    public state = {
        config: {
            cards: 0,
            epidemics: 0,
            cities: {},
        },
        games: [],
    } as State;

    public render() {
        return (
            <React.Fragment>
                <AppBar>
                    <Row>
                        <Title>Epidemia</Title>
                        <IconButton>
                            <RotateCwwIcon />
                        </IconButton>
                        <IconLink to={Routes.Settings}>
                            <SettingsIcon />
                        </IconLink>
                    </Row>
                    <Row>
                        <TabLink to={Routes.Dashboard}>Dashboard</TabLink>
                        <TabLink to={Routes.Infection}>Infection</TabLink>
                        <TabLink to={Routes.Discard}>Discard</TabLink>
                    </Row>
                </AppBar>
                <Route path={Routes.Dashboard} exact component={Dashboard} />
                <Route path={Routes.Infection} exact component={Infection} />
                <Route path={Routes.Discard} exact component={Discard} />
                <Route path={Routes.Settings} exact render={this._renderSettings} />
            </React.Fragment>
        );
    }

    private _renderSettings = () => (
        <Settings
            config={this.state.config}
            onConfigure={this._onConfigure}
            services={this.props.services}
        />
    );

    private _onConfigure = (config: Config) => {
        this.setState({
            config,
            games: [configure(config)],
        });
    };
}
