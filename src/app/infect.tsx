import * as React from "react";
import { Deck, Stack } from "../core/types";
import { ActionProps, Appbar } from "../theme/appbar";
import { classNames } from "../theme/css";
import { SaveIcon } from "../theme/icons";
import { Padding } from "../theme/tailwind";
import { unique } from "../util/decks";
import { CityRow } from "./city_row";
import { Routes } from "./routes";

export interface Props {
    infection: Deck;
    onInfect: (cities: Stack) => boolean;
}

export class Infect extends React.PureComponent<Props, Stack> {
    public static displayName = "Infect";

    public state = unique(this.props.infection)
        .sort()
        .reduce((stack, city) => ({ ...stack, [city]: 0 }), {} as Stack);

    private _actions: ActionProps[] = [
        {
            icon: SaveIcon,
            href: Routes.Dashboard,
            onClick: evt => {
                const stack = Object.keys(this.state).reduce(
                    (data, city) =>
                        this.state[city] > 0 ? { ...data, [city]: this.state[city] } : data,
                    {} as Stack,
                );
                if (!this.props.onInfect(stack)) {
                    evt.preventDefault();
                }
            },
        },
    ];

    public render() {
        return (
            <>
                <Appbar actions={this._actions} />
                <main className={classNames(Padding.X1)}>
                    {Object.keys(this.state).map(city => (
                        <CityRow
                            key={city}
                            city={city}
                            value={this.state[city]}
                            onChange={this._onChange}
                        />
                    ))}
                </main>
            </>
        );
    }

    private _onChange = (city: string, value: number): void => {
        if (value >= 0) {
            this.setState(state => ({ ...state, [city]: value }));
        }
    };
}
