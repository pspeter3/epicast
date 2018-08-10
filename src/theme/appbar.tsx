import * as React from "react";
import { classNames, focusClass } from "./css";
import {
    AlignItems,
    BackgroundColor,
    BorderRadius,
    BoxShadow,
    Display,
    FontWeight,
    JustifyContent,
    Leading,
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
    action: ActionProps;
    title: string;
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

    public static Title: React.SFC<React.HTMLProps<HTMLHeadingElement>> = props => (
        <h1
            {...props}
            className={classNames(
                FontWeight.Medium,
                Leading.Tight,
                Padding.A3,
                Sizing.H12,
                TextColor.Black,
                TextDecoration.NoUnderline,
                TextSize.XLarge,
                Tracking.Wide,
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
        const { action, title, actions } = this.props;

        return (
            <Appbar.Header>
                <Appbar.Navigation>
                    <Appbar.Action href={action.href} onClick={action.onClick}>
                        {action.icon}
                    </Appbar.Action>
                    <Appbar.Title>{title}</Appbar.Title>
                </Appbar.Navigation>
                <Appbar.Navigation>
                    {actions.map(item => (
                        <Appbar.Action key={item.href} href={item.href} onClick={item.onClick}>
                            {item.icon}
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
