import * as React from "react";
import { NavLink, NavLinkProps } from "react-router-dom";

export const IconLink: React.SFC<NavLinkProps> = props => {
    return <NavLink className="icon-link" exact {...props} />;
};

export const TabLink: React.SFC<NavLinkProps> = props => {
    return <NavLink className="tab-link" exact {...props} />;
};
