import * as React from "react";
import { infectionRate } from "../core/selectors";
import { Config, Game, Stack, State } from "../core/types";
import { configure, epidemic, infect, undo, update } from "../core/updaters";
import { DialogService, StorageService } from "../util/services";
import { size } from "../util/stacks";
import { Dashboard } from "./dashboard";
import { Debug } from "./debug";
import { Infect } from "./infect";
import { Routes } from "./routes";
import { Settings } from "./settings";

export interface Services {
    dialog: DialogService;
    storage: StorageService;
}

export interface Props {
    location: string;
    namespace: string;
    services: Services;
}

export class Application extends React.PureComponent<Props, State> {
    public static displayName = "Application";

    private static _currentGame(state: State): Game {
        return state.games[state.games.length - 1];
    }

    public state = this._initialState();

    public render() {
        const { location } = this.props;
        if (this.state.games.length === 0 || location === Routes.Settings) {
            return (
                <Settings
                    config={this.state.config}
                    onConfigure={this._onConfigure}
                    services={this.props.services}
                />
            );
        }
        const game = Application._currentGame(this.state);
        switch (location) {
            case Routes.Infect:
                return <Infect infection={game.infection} onInfect={this._onInfect} />;
            case Routes.Debug:
                return <Debug state={this.state} />;
        }
        return <Dashboard game={game} onEpidemic={this._onEpidemic} onUndo={this._onUndo} />;
    }

    private _initialState(): State {
        const data = this.props.services.storage.getItem(this.props.namespace);
        return data !== null
            ? JSON.parse(data)
            : {
                  config: {
                      cards: 0,
                      epidemics: 0,
                      cities: {},
                  },
                  games: [],
              };
    }

    private _onConfigure = (config: Config): boolean => {
        if (config.cards <= 0) {
            return this._alert(`Cannot create a game with ${config.cards} in the player deck.`);
        }
        if (config.epidemics <= 0) {
            return this._alert(`Cannot create a game with ${config.epidemics} epidemics.`);
        }
        if (config.cards < config.epidemics) {
            return this._alert(
                `Cannot create a game with fewer cards in the player deck than epidemics.`,
            );
        }
        if (size(config.cities) === 0) {
            return this._alert(`Cannot create a game with no infection cards.`);
        }
        const response = this.props.services.dialog.confirm("Reset game state?");
        if (!response) {
            return response;
        }
        this.setState({ config, games: [configure(config)] });
        return true;
    };

    private _onEpidemic = (city: string) => {
        this.setState(update(this.state, epidemic(Application._currentGame(this.state), city)));
    };

    private _onInfect = (cities: Stack): boolean => {
        const game = Application._currentGame(this.state);
        const rate = infectionRate(game);
        const cards = size(cities);
        if (cards !== 0 && cards !== infectionRate(game)) {
            return this._alert(
                `Cannot infect with ${cards} ${
                    cards === 1 ? "city" : "cities"
                }. Infection rate is ${rate}.`,
            );
        }
        this.setState(update(this.state, infect(game, cities)));
        return true;
    };

    private _onUndo = () => {
        if (this.state.games.length < 2) {
            this._alert("Cannot undo any more actions.");
            return;
        }
        this.setState(undo);
    };

    private _alert(msg: string): boolean {
        this.props.services.dialog.alert(msg);
        return false;
    }
}
