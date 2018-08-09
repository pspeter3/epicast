import * as React from "react";
import { classNames } from "./css";
import {
    Display,
    FlexDirection,
    FontFamily,
    JustifyContent,
    Sizing,
    TextAlign,
    TextColor,
    TextDecoration,
    TextSize,
    Tracking,
} from "./tailwind";

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
        <section
            {...props}
            className={classNames(Display.Flex, JustifyContent.Between, props.className)}
        />
    );

    public static Tile: React.SFC<React.HTMLProps<HTMLDivElement>> = props => (
        <div
            {...props}
            className={classNames(
                Display.Flex,
                FlexDirection.Col,
                JustifyContent.Around,
                Sizing.H12,
                Sizing.W24,
                props.className,
            )}
        />
    );

    public static Caption: React.SFC<React.HTMLProps<HTMLSpanElement>> = props => (
        <span
            {...props}
            className={classNames(
                Sizing.WFull,
                TextAlign.Center,
                TextColor.Grey,
                TextDecoration.Uppercase,
                TextSize.XSmall,
                Tracking.Wide,
                props.className,
            )}
        />
    );

    public static Value: React.SFC<React.HTMLProps<HTMLSpanElement>> = props => (
        <span
            {...props}
            className={classNames(
                FontFamily.Mono,
                Sizing.WFull,
                TextAlign.Center,
                TextColor.Black,
                TextSize.XLarge,
                Tracking.Wide,
                props.className,
            )}
        />
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
