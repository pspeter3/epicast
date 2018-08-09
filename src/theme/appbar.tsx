import * as React from "react";
import { Routes } from "../app/routes";
import { classNames, focusClass } from "./css";
import {
    AlignItems,
    BackgroundColor,
    BorderRadius,
    BoxShadow,
    Display,
    FontWeight,
    JustifyContent,
    Outline,
    Padding,
    Pin,
    Positioning,
    Sizing,
    TextColor,
    TextDecoration,
    TextSize,
    Tracking,
} from "./tailwind";

export interface ActionProps {
    icon: React.ReactElement<any>;
    href: string;
    onClick?: React.MouseEventHandler<HTMLAnchorElement>;
}

export interface Props {
    actions: ActionProps[];
}

export class Appbar extends React.PureComponent<Props, {}> {
    public static displayName = "Appbar";

    public static Header: React.SFC<React.HTMLProps<HTMLElement>> = props => (
        <header
            {...props}
            className={classNames(
                Positioning.Fixed,
                Pin.Top,
                Pin.Horizontal,
                Display.Flex,
                AlignItems.Center,
                JustifyContent.Between,
                BoxShadow.Medium,
                BackgroundColor.Base,
                Padding.A1,
                props.className,
            )}
        />
    );

    public static Title: React.SFC<React.HTMLProps<HTMLAnchorElement>> = props => (
        <a
            {...props}
            className={classNames(
                TextColor.Black,
                TextDecoration.NoUnderline,
                TextSize.XLarge,
                FontWeight.Medium,
                Tracking.Wide,
                Padding.A3,
                Sizing.H12,
                BorderRadius.Small,
                focusClass(Outline.None),
                focusClass(BackgroundColor.Dark),
                props.className,
            )}
        />
    );

    public static Navigation: React.SFC<React.HTMLProps<HTMLElement>> = props => (
        <nav {...props} className={classNames(Display.Flex, Sizing.H12, props.className)} />
    );

    public static Action: React.SFC<React.HTMLProps<HTMLAnchorElement>> = props => (
        <a
            {...props}
            className={classNames(
                TextColor.Black,
                Padding.A3,
                BorderRadius.Full,
                focusClass(Outline.None),
                focusClass(BackgroundColor.Dark),
                props.className,
            )}
        />
    );

    public render() {
        const { title, actions } = this.props;

        return (
            <Appbar.Header>
                <Appbar.Title href={Routes.Dashboard}>Epidemia</Appbar.Title>
                <Appbar.Navigation>
                    {actions.map(action => (
                        <Appbar.Action
                            key={action.href}
                            href={action.href}
                            onClick={action.onClick}
                        >
                            {action.icon}
                        </Appbar.Action>
                    ))}
                </Appbar.Navigation>
            </Appbar.Header>
        );
    }
}

Appbar.Header.displayName = "Appbar.Header";
Appbar.Title.displayName = "Appbar.Title";
Appbar.Navigation.displayName = "Appbar.Navigation";
Appbar.Action.displayName = "Appbar.Action";
