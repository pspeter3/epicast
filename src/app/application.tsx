import * as React from "react";
import { Game, State } from "../core/types";
import { epidemic, undo, update } from "../core/updaters";
import { StorageService } from "../util/services";
import { Dashboard } from "./dashboard";
import { Debug } from "./debug";
import { Routes } from "./routes";

export interface Services {
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
        if (this.state.games.length === 0) {
            return null;
        }
        const game = Application._currentGame(this.state);
        switch (location) {
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

    private _onEpidemic = (city: string) => {
        this.setState(state => update(state, epidemic(Application._currentGame(state), city)));
    };

    private _onUndo = () => {
        this.setState(undo);
    };
}
