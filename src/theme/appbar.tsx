import * as React from "react";

export const AppBar: React.SFC<{}> = ({ children }) => {
    return <header className="appbar">{children}</header>;
};

export const AppBarContainer: React.SFC<{}> = ({ children }) => {
    return <div className="appbar-container">{children}</div>;
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
