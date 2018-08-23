import * as React from "react";
import { StandardConfig } from "../core/configs";
import { Config } from "../core/types";
import { ActionProps, Appbar } from "../theme/appbar";
import { Button, Fieldset, Legend } from "../theme/form";
import { FormField } from "../theme/form_field";
import { BackIcon, CodeIcon, SaveIcon } from "../theme/icons";
import { DialogService } from "../util/services";
import { difference, unit } from "../util/stacks";
import { CityRow } from "./city_row";
import { Routes } from "./routes";

export interface Props {
    config: Config;
    onConfigure: (config: Config) => boolean;
    services: {
        dialog: DialogService;
    };
}

export class Settings extends React.PureComponent<Props, Config> {
    public static displayName = "Settings";

    public state = this.props.config;

    private _action: ActionProps = {
        icon: BackIcon,
        href: Routes.Dashboard,
    };

    private _actions: ActionProps[] = [
        { icon: CodeIcon, href: Routes.Debug },
        {
            icon: SaveIcon,
            href: Routes.Dashboard,
            onClick: evt => {
                if (!this.props.onConfigure(this.state)) {
                    evt.preventDefault();
                }
            },
        },
    ];

    public render() {
        return (
            <>
                <Appbar action={this._action} title="Settings" actions={this._actions} />
                <>
                    <FormField
                        label="Player Deck Size"
                        value={this.state.cards}
                        onChange={this._onChangeCards}
                    />
                    <FormField
                        label="Epidemic Count"
                        value={this.state.epidemics}
                        onChange={this._onChangeEpidemics}
                    />
                    <Button onClick={this._onStandardConfig}>Standard Configuration</Button>
                    <Fieldset>
                        <Legend>Cities</Legend>
                        {Object.keys(this.state.cities).map(city => (
                            <CityRow
                                key={city}
                                city={city}
                                value={this.state.cities[city]}
                                onChange={this._onChange}
                            />
                        ))}
                        <Button onClick={this._onAddCity}>Add City</Button>
                    </Fieldset>
                </>
            </>
        );
    }

    private _onStandardConfig: React.MouseEventHandler<HTMLButtonElement> = evt => {
        evt.preventDefault();
        this.setState(StandardConfig);
    };

    private _onChangeCards = (value: number) => {
        this.setState({
            ...this.state,
            cards: value,
        });
    };

    private _onChangeEpidemics = (value: number) => {
        this.setState({
            ...this.state,
            epidemics: value,
        });
    };

    private _onAddCity: React.MouseEventHandler<HTMLButtonElement> = evt => {
        evt.preventDefault();
        const city = this.props.services.dialog.prompt("City name");
        if (city === null) {
            return;
        }
        this.setState({
            ...this.state,
            cities: {
                ...this.state.cities,
                ...unit(city),
            },
        });
    };

    private _onChange = (city: string, value: number): void => {
        const cities =
            value > 0
                ? { ...this.state.cities, [city]: value }
                : difference(this.state.cities, { [city]: this.state.cities[city] });
        this.setState({
            ...this.state,
            cities,
        });
    };
}
