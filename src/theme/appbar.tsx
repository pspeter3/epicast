import * as React from "react";
import { NavLink, NavLinkProps } from "react-router-dom";

export const AppBar: React.SFC<{}> = ({ children }) => {
    return <header className="appbar">{children}</header>;
};

export const AppBarIcon: React.SFC<NavLinkProps> = props => {
    return <NavLink className="appbar-icon" exact {...props} />;
};

export const AppBarTab: React.SFC<NavLinkProps> = props => {
    return <NavLink className="appbar-tab" exact {...props} />;
};
