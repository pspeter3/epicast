import * as React from "react";
import { classNames } from "./css";

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
        <header {...props} className={classNames("appbar", props.className)} />
    );

    public static Title: React.SFC<React.HTMLProps<HTMLHeadingElement>> = props => (
        <h1 {...props} className={classNames("appbar__title", props.className)} />
    );

    public static Navigation: React.SFC<React.HTMLProps<HTMLElement>> = props => (
        <nav {...props} className={classNames("appbar__navigation", props.className)} />
    );

    public static Action: React.SFC<React.HTMLProps<HTMLAnchorElement>> = props => (
        <a {...props} className={classNames("appbar__action", props.className)} />
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
