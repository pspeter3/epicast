import * as React from "react";
import { gameForecast } from "../core/selectors";
import { Game } from "../core/types";
import { ActionProps, Appbar } from "../theme/appbar";
import { Banner } from "../theme/banner";
import { DataTable } from "../theme/data_table";
import { AlertIcon, CrosshairIcon, EditIcon, UndoIcon, XIcon } from "../theme/icons";
import { Level } from "../theme/level";
import { Picker } from "../theme/picker";
import { Margin } from "../theme/tailwind";
import { Routes } from "./routes";

export interface Props {
    game: Game;
    onEpidemic: (city: string) => void;
    onRemove: (city: string) => void;
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
        const { game, onEpidemic, onRemove } = this.props;
        const forecast = gameForecast(game);
        const discards = Object.keys(game.discard).sort();
        const epidemics = Object.keys(game.infection[0]).sort();
        const isSafe = forecast.safe !== 0;
        return (
            <>
                <Appbar actions={this._actions} />
                <Level
                    tiles={[
                        { caption: "Turn", value: game.turns + 1 },
                        { caption: "Player Deck", value: forecast.remaining },
                        { caption: "Epidemic", value: forecast.epidemics, isPercent: true },
                    ]}
                    className={Margin.B2}
                />
                {isSafe ? <Banner>No epidemics for at least {forecast.safe} turns</Banner> : null}
                <DataTable<Headers>
                    headers={{ name: false, infections: true, epidemics: true }}
                    defaultSort="infections"
                    data={forecast.cities as Array<Record<Headers, string | number>>}
                />
                <Picker
                    icon={CrosshairIcon}
                    label="Epidemic"
                    options={epidemics}
                    disabled={isSafe}
                    className={Margin.T6}
                    onChange={onEpidemic}
                />
                <Picker
                    icon={XIcon}
                    label="Discard"
                    options={discards}
                    disabled={discards.length === 0}
                    onChange={onRemove}
                />
            </>
        );
    }
}
