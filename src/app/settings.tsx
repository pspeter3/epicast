import * as React from "react";
import { Config } from "../core/types";
import { ActionProps, Appbar } from "../theme/appbar";
import { classNames, focusClass } from "../theme/css";
import { FormField } from "../theme/form_field";
import { CodeIcon, SaveIcon } from "../theme/icons";
import {
    AlignItems,
    BackgroundColor,
    BorderColor,
    BorderRadius,
    BorderSize,
    BorderStyle,
    BoxShadow,
    Display,
    FontWeight,
    JustifyContent,
    Outline,
    Padding,
    Sizing,
    TextColor,
    TextDecoration,
    TextSize,
    Tracking,
} from "../theme/tailwind";
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

    public static Legend: React.SFC<React.HTMLProps<HTMLLegendElement>> = props => (
        <legend
            {...props}
            className={classNames(
                FontWeight.Medium,
                Padding.A3,
                Sizing.H12,
                TextColor.Grey,
                TextSize.Small,
                Tracking.Wide,
                props.className,
            )}
        />
    );

    public static ButtonField: React.SFC<React.HTMLProps<HTMLButtonElement>> = props => (
        <div className={classNames(Padding.X3, Padding.Y1)}>
            <button
                {...props}
                className={classNames(
                    AlignItems.Center,
                    BorderColor.Base,
                    BorderRadius.Small,
                    BorderSize.A2,
                    BorderStyle.Solid,
                    Display.InlineFlex,
                    FontWeight.Medium,
                    JustifyContent.Center,
                    Padding.X4,
                    Sizing.H10,
                    Sizing.WFull,
                    TextColor.Base,
                    TextDecoration.Uppercase,
                    TextSize.Small,
                    focusClass(BackgroundColor.Lightest),
                    focusClass(BoxShadow.Large),
                    focusClass(Outline.None),
                    props.className,
                )}
            />
        </div>
    );

    public state = this.props.config;

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
                <Appbar actions={this._actions} />
                <main className={classNames(Padding.X1)}>
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
                    <fieldset>
                        <Settings.Legend>Cities</Settings.Legend>
                        {Object.keys(this.state.cities).map(city => (
                            <CityRow
                                city={city}
                                value={this.state.cities[city]}
                                onChange={this._onChange}
                            />
                        ))}
                        <Settings.ButtonField onClick={this._onAddCity}>
                            Add City
                        </Settings.ButtonField>
                    </fieldset>
                </main>
            </>
        );
    }

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

    private _onAddCity = () => {
        const city = this.props.services.dialog.prompt("City name");
        if (city === null) {
            return this.props.services.dialog.alert("Cannot set empty city name");
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

Settings.Legend.displayName = "Settings.Legend";
Settings.ButtonField.displayName = "Settings.ButtonField";
