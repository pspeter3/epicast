import * as React from "react";
import { Redirect, Route } from "react-router-dom";
import { Config, Deck, Game } from "../core/types";
import { configure, epidemic, infect, remove } from "../core/updaters";
import { IconButton } from "../theme/buttons";
import { CornerUpLeftIcon, EditIcon } from "../theme/icons";
import { AppBar, Row } from "../theme/layout";
import { IconLink, TabLink } from "../theme/links";
import { Title } from "../theme/typography";
import { DialogService } from "../util/services";
import { Dashboard } from "./dashboard/dashboard";
import { Discard } from "./discard/discard";
import { Infection } from "./infection/infection";
import { Routes } from "./routes";
import { Settings } from "./settings/settings";

export interface Services {
    dialog: DialogService;
    storage: Storage;
}

export interface Props {
    namespace: string;
    services: Services;
}

export interface State {
    config: Config;
    games: ReadonlyArray<Game>;
}

export class App extends React.Component<Props, State> {
    private _renderDashboard = this._protect(() => <Dashboard game={this._currentGame()} />);

    private _renderInfection = this._protect(() => (
        <Infection
            deck={this._currentGame().infection}
            onInfect={this._onInfect}
            onEpidemic={this._onEpidemic}
        />
    ));

    private _renderDiscard = this._protect(() => (
        <Discard discard={this._currentGame().discard} onRemove={this._onRemove} />
    ));

    constructor(props: Props) {
        super(props);
        const item = this.props.services.storage.getItem(this.props.namespace);
        this.state =
            item !== null
                ? JSON.parse(item)
                : {
                      config: {
                          cards: 0,
                          epidemics: 0,
                          cities: {},
                      },
                      games: [],
                  };
    }

    public render() {
        return (
            <React.Fragment>
                <AppBar>
                    <Row>
                        <Title>Epidemia</Title>
                        <IconButton>
                            <CornerUpLeftIcon />
                        </IconButton>
                        <IconLink to={Routes.Settings}>
                            <EditIcon />
                        </IconLink>
                    </Row>
                    <Row>
                        <TabLink to={Routes.Dashboard}>Dashboard</TabLink>
                        <TabLink to={Routes.Infection}>Infection</TabLink>
                        <TabLink to={Routes.Discard}>Discard</TabLink>
                    </Row>
                </AppBar>
                <Route path={Routes.Dashboard} exact render={this._renderDashboard} />
                <Route path={Routes.Infection} exact render={this._renderInfection} />
                <Route path={Routes.Discard} exact render={this._renderDiscard} />
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

    private _onInfect = (deck: Deck) => {
        this._addGame(infect(this._currentGame(), deck));
    };

    private _onEpidemic = (city: string) => {
        this._addGame(epidemic(this._currentGame(), city));
    };

    private _onRemove = (city: string) => {
        this._addGame(remove(this._currentGame(), city));
    };

    private _onConfigure = (config: Config) => {
        this.setState(
            {
                config,
                games: [configure(config)],
            },
            this._onUpdate,
        );
    };

    private _onUpdate = () => {
        this.props.services.storage.setItem(this.props.namespace, JSON.stringify(this.state));
    };

    private _onUndo = () => {
        if (this.state.games.length > 1) {
            this.setState({
                games: this.state.games.slice(-1),
            });
        }
    };

    private _currentGame(): Game {
        const { games } = this.state;
        return games[games.length - 1];
    }

    private _addGame(game: Game): void {
        const next = this.state.games.concat(game);
        this.setState(
            {
                games: next.length > 3 ? next.slice(next.length - 3) : next,
            },
            this._onUpdate,
        );
    }

    private _protect(SFC: React.SFC<{}>): () => React.ReactElement<{}> {
        return () => {
            return this.state.games.length === 0 ? <Redirect to={Routes.Settings} /> : <SFC />;
        };
    }
}
