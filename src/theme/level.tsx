import * as React from "react";
import { classNames } from "./css";

export interface TileProps {
    caption: string;
    value: number;
    isPercent?: boolean;
}

export interface Props {
    tiles: TileProps[];
    className?: string;
}

export class Level extends React.PureComponent<Props, {}> {
    public static displayName = "Level";

    public static Section: React.SFC<React.HTMLProps<HTMLElement>> = props => (
        <section {...props} className={classNames("level", props.className)} />
    );

    public static Tile: React.SFC<React.HTMLProps<HTMLDivElement>> = props => (
        <div {...props} className={classNames("level__tile", props.className)} />
    );

    public static Caption: React.SFC<React.HTMLProps<HTMLSpanElement>> = props => (
        <small {...props} className={classNames("level__caption", props.className)} />
    );

    public static Value: React.SFC<React.HTMLProps<HTMLHeadingElement>> = props => (
        <h2 {...props} className={classNames("level__value", props.className)} />
    );

    public render() {
        const { tiles, className } = this.props;
        return (
            <Level.Section className={className}>
                {tiles.map(tile => (
                    <Level.Tile key={tile.caption}>
                        <Level.Value>
                            {tile.isPercent === true
                                ? `${Math.round(100 * tile.value)}%`
                                : tile.value}
                        </Level.Value>
                        <Level.Caption>{tile.caption}</Level.Caption>
                    </Level.Tile>
                ))}
            </Level.Section>
        );
    }
}

Level.Section.displayName = "Level.Section";
Level.Tile.displayName = "Level.Tile";
Level.Caption.displayName = "Level.Caption";
