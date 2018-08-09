import * as React from "react";
import { gameForecast } from "../core/selectors";
import { Game } from "../core/types";
import { ActionProps, Appbar } from "../theme/appbar";
import { DataTable } from "../theme/data_table";
import { AlertIcon, CrosshairIcon, EditIcon, UndoIcon, XIcon } from "../theme/icons";
import { Level } from "../theme/level";
import { Picker } from "../theme/picker";
import { Margin } from "../theme/tailwind";
import { Routes } from "./routes";

export interface Props {
    game: Game;
    onEpidemic: (city: string) => void;
    onUndo: () => void;
}

type Headers = "name" | "infections" | "epidemics";

export class Dashboard extends React.PureComponent<Props, {}> {
    public static displayName = "Dashboard";

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
        const { game, onEpidemic } = this.props;
        const forecast = gameForecast(game);
        const discards = Object.keys(game.discard).sort();
        const epidemics = Object.keys(game.infection[0]).sort();
        const player = game.player.reduce((a, e) => a + e) - game.turns * 2;
        return (
            <>
                <Appbar actions={this._actions} />
                <Level
                    tiles={[
                        { caption: "Turn", value: game.turns + 1 },
                        { caption: "Player Deck", value: player },
                        { caption: "Epidemic", value: forecast.epidemics, isPercent: true },
                    ]}
                    className={Margin.B6}
                />
                <DataTable<Headers>
                    headers={{ name: false, infections: true, epidemics: true }}
                    defaultSort="infections"
                    data={forecast.cities as Array<Record<Headers, string | number>>}
                />
                <Picker
                    icon={CrosshairIcon}
                    label="Epidemic"
                    options={epidemics}
                    disabled={forecast.epidemics === 0}
                    className={Margin.T6}
                    onChange={onEpidemic}
                />
                <Picker
                    icon={XIcon}
                    label="Discard"
                    options={discards}
                    disabled={discards.length === 0}
                    onChange={() => {}}
                />
            </>
        );
    }
}
