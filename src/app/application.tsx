import * as React from "react";
import { State } from "../core/types";
import { StorageService } from "../util/services";
import { Debug } from './debug';

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

    public state = this._initialState();

    public render() {
        const { games } = this.state;
        if (games.length === 0) {
            return null;
        }
        return <Debug state={this.state}/>;
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
}
