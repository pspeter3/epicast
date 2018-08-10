import * as React from "react";
import { gameForecast } from "../core/selectors";
import { CityForecast, Game, Stack } from "../core/types";
import { ActionProps, Appbar } from "../theme/appbar";
import { classNames } from "../theme/css";
import { BackIcon, SaveIcon } from "../theme/icons";
import { Padding } from "../theme/tailwind";
import { CityRow } from "./city_row";
import { Routes } from "./routes";

export interface Props {
    game: Game;
    onInfect: (cities: Stack) => boolean;
}

export class Infect extends React.PureComponent<Props, Stack> {
    public static displayName = "Infect";

    public state = this._initialState();

    private _action: ActionProps = {
        icon: BackIcon,
        href: Routes.Dashboard,
    };

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
                <Appbar action={this._action} title="Infect" actions={this._actions} />
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

    private _initialState(): Stack {
        const forecast = gameForecast(this.props.game);
        const cities: CityForecast[] = forecast.cities as any;
        return cities
            .sort((left, right) => {
                if (right.infections === left.infections) {
                    return left.name < right.name ? -1 : 1;
                }
                return right.infections - left.infections;
            })
            .reduce(
                (stack, city) => {
                    return {
                        ...stack,
                        [city.name]: 0,
                    };
                },
                {} as Stack,
            );
    }
}
