import * as React from "react";

export const Tile: React.SFC<{}> = ({ children }) => {
    return <section className="tile">{children}</section>;
};

export const Row: React.SFC<{}> = ({ children }) => {
    return <div className="row">{children}</div>;
};

export const Main: React.SFC<{}> = ({ children }) => {
    return <main className="main">{children}</main>;
};
