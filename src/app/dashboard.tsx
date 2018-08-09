import * as React from "react";
import { gameForecast } from "../core/selectors";
import { Game } from "../core/types";
import { ActionProps, Appbar } from "../theme/appbar";
import { classNames, focusClass } from "../theme/css";
import { DataTable } from "../theme/data_table";
import { AlertIcon, EditIcon, UndoIcon } from "../theme/icons";
import {
    AlignItems,
    Appearance,
    BackgroundColor,
    BorderRadius,
    BorderSize,
    BorderStyle,
    Display,
    FontFamily,
    FontWeight,
    JustifyContent,
    Margin,
    Outline,
    Padding,
    Sizing,
    TextColor,
    TextDecoration,
    TextSize,
    Tracking,
} from "../theme/tailwind";
import { Routes } from "./routes";

export interface Props {
    game: Game;
    onEpidemic: (city: string) => void;
    onUndo: () => void;
}

type Headers = "name" | "infections" | "epidemics";

export class Dashboard extends React.PureComponent<Props, {}> {
    public static displayName = "Dashboard";

    public static Section: React.SFC<React.HTMLProps<HTMLElement>> = props => (
        <section
            {...props}
            className={classNames(Margin.B6, Display.Flex, Padding.X3, Padding.Y1, props.className)}
        />
    );

    public static Percentage: React.SFC<React.HTMLProps<HTMLDivElement>> = props => (
        <div
            {...props}
            className={classNames(
                AlignItems.Center,
                BorderRadius.SmallLeft,
                BorderSize.B1,
                BorderSize.L1,
                BorderSize.T1,
                Display.Flex,
                FontFamily.Mono,
                JustifyContent.Center,
                Sizing.H10,
                Sizing.W12,
                TextColor.Grey,
                TextSize.XSmall,
                props.className,
            )}
        />
    );

    public static Dropdown: React.SFC<React.HTMLProps<HTMLSelectElement>> = props => (
        <select
            {...props}
            className={classNames(
                Appearance.None,
                BackgroundColor.White,
                BorderRadius.None,
                BorderRadius.SmallRight,
                BorderSize.A1,
                BorderStyle.Solid,
                FontWeight.Medium,
                Padding.X4,
                Sizing.H10,
                Sizing.WFull,
                TextColor.Grey,
                TextDecoration.Uppercase,
                TextSize.Small,
                Tracking.Wide,
                focusClass(BackgroundColor.Lightest),
                focusClass(Outline.None),
            )}
        />
    );

    private static _DEFAULT_VALUE = "Epidemic";

    private _actions: ActionProps[] = [
        {
            icon: UndoIcon,
            href: Routes.Dashboard,
            onClick: evt => {
                evt.preventDefault();
                this.props.onUndo();
            },
        },
        { icon: AlertIcon, href: Routes.Infect },
        { icon: EditIcon, href: Routes.Settings },
    ];

    public render() {
        const { game } = this.props;
        const forecast = gameForecast(game);
        const options = Object.keys(game.infection[0]).sort();
        return (
            <>
                <Appbar title="Epidemia" actions={this._actions} />
                <Dashboard.Section>
                    <Dashboard.Percentage>
                        {Math.round(forecast.epidemics * 100)}%
                    </Dashboard.Percentage>
                    <Dashboard.Dropdown value={Dashboard._DEFAULT_VALUE} onChange={this._onChange}>
                        <option disabled={true} value={Dashboard._DEFAULT_VALUE}>
                            {Dashboard._DEFAULT_VALUE}
                        </option>
                        <>
                            {options.map(option => (
                                <option key={option} value={option}>
                                    {option}
                                </option>
                            ))}
                        </>
                    </Dashboard.Dropdown>
                </Dashboard.Section>
                <DataTable<Headers>
                    headers={{ name: false, infections: true, epidemics: true }}
                    defaultSort="infections"
                    data={forecast.cities as Array<Record<Headers, string | number>>}
                />
            </>
        );
    }

    public _onChange: React.ChangeEventHandler<HTMLSelectElement> = evt => {
        this.props.onEpidemic(evt.target.value);
    };
}
