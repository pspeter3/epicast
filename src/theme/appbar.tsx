import * as React from "react";

export const AppBar: React.SFC<{}> = ({ children }) => {
    return <header className="appbar">{children}</header>;
};

export const AppBarSection: React.SFC<{}> = ({ children }) => {
    return <section className="appbar-section">{children}</section>;
};

export const AppBarTitle: React.SFC<{}> = ({ children }) => {
    return <h1 className="appbar-title">{children}</h1>;
};

export const AppBarIcon: React.SFC<{}> = ({ children }) => {
    return (
        <a href="#" className="appbar-icon">
            {children}
        </a>
    );
};

export const AppBarNav: React.SFC<{}> = ({ children }) => {
    return <nav className="appbar-section">{children}</nav>;
};

export const AppBarTab: React.SFC<{}> = ({ children }) => {
    return (
        <a href="#" className="appbar-tab">
            {children}
        </a>
    );
};
