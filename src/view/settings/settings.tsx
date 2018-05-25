import * as React from "react";
import { Redirect } from "react-router";
import { Config } from "../../core/types";
import { BottomButton, SubHeaderButton } from "../../theme/buttons";
import { Main, Row } from "../../theme/layout";
import { SubHeader } from "../../theme/typography";
import { DialogService } from "../../util/services";
import { difference, union, unit } from "../../util/stacks";
import { Routes } from "../routes";
import { SettingsRow } from "./settings_row";

export interface Services {
    dialog: DialogService;
}

export interface Props {
    config: Config;
    onConfigure: (config: Config) => void;
    services: Services;
}

export interface State {
    config: Config;
    submitted: boolean;
}

type Counter = "cards" | "epidemics";

export class Settings extends React.PureComponent<Props, State> {
    public state = {
        config: this.props.config,
        submitted: false,
    };

    public render() {
        const { config } = this.state;
        const { cities } = config;
        if (this.state.submitted) {
            return <Redirect to={Routes.Dashboard} />;
        }
        return (
            <React.Fragment>
                <SettingsRow
                    name="cards"
                    displayName="Player Deck Size"
                    value={config.cards}
                    onDecrement={this._onDecrementCounter}
                    onChange={this._onSetCounter}
                    onIncrement={this._onIncrementCounter}
                />
                <SettingsRow
                    name="epidemics"
                    displayName="Epidemic Count"
                    value={config.cards}
                    onDecrement={this._onDecrementCounter}
                    onChange={this._onSetCounter}
                    onIncrement={this._onIncrementCounter}
                />
                <Row>
                    <SubHeader>Infection Deck</SubHeader>
                    <SubHeaderButton onClick={this._onAddCity}>Add City</SubHeaderButton>
                </Row>
                <Main>
                    {Object.keys(cities).map(city => {
                        return (
                            <SettingsRow
                                key={city}
                                name={city}
                                value={cities[city]}
                                onDecrement={this._onDecrementCity}
                                onChange={this._onSetCity}
                                onIncrement={this._onIncrementCity}
                            />
                        );
                    })}
                </Main>
                <BottomButton onClick={this._onSave}>Save</BottomButton>
            </React.Fragment>
        );
    }

    private _onDecrementCounter = (name: string) => {
        this.setState({
            config: {
                ...this.state.config,
                [name]: this.state.config[name as Counter] - 1,
            },
        });
    };

    private _onSetCounter = (name: string, value: number) => {
        this.setState({
            config: {
                ...this.state.config,
                [name]: value,
            },
        });
    };

    private _onIncrementCounter = (name: string) => {
        this.setState({
            config: {
                ...this.state.config,
                [name]: this.state.config[name as Counter] + 1,
            },
        });
    };

    private _onAddCity = () => {
        const city = this.props.services.dialog.prompt("City Name");
        this._onIncrementCity(city);
    };

    private _onDecrementCity = (city: string) => {
        const { config } = this.state;
        this.setState({
            config: {
                ...config,
                cities: difference(config.cities, unit(city)),
            },
        });
    };

    private _onSetCity = (city: string, value: number) => {
        const { config } = this.state;
        this.setState({
            config: {
                ...config,
                cities: {
                    ...config.cities,
                    [city]: value,
                },
            },
        });
    };

    private _onIncrementCity = (city: string) => {
        const { config } = this.state;
        this.setState({
            config: {
                ...config,
                cities: union(config.cities, unit(city)),
            },
        });
    };

    private _onSave = () => {
        const { config } = this.state;
        if (
            config.cards <= 0 ||
            config.epidemics <= 0 ||
            config.cards < config.epidemics ||
            Object.keys(config.cities).length === 0
        ) {
            this.props.services.dialog.alert("Invalid State");
            return;
        }
        if (this.props.services.dialog.confirm("Reset Game State?")) {
            this.props.onConfigure(this.state.config);
            this.setState({
                submitted: true,
            });
        }
    };
}
