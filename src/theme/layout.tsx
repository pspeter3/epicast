import * as React from "react";

export const AppBar: React.SFC<{}> = ({ children }) => {
    return <header className="appbar">{children}</header>;
};

export const Main: React.SFC<{}> = ({ children }) => {
    return <main className="main">{children}</main>;
};

export const Section: React.SFC<{}> = ({ children }) => {
    return <section className="section">{children}</section>;
};

export const Row: React.SFC<{}> = ({ children }) => {
    return <div className="row">{children}</div>;
};
