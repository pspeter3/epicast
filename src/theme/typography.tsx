import * as React from "react";

export const Title: React.SFC<{}> = ({ children }) => {
    return <h1 className="title">{children}</h1>;
};

export const Header: React.SFC<{}> = ({ children }) => {
    return <h2 className="header">{children}</h2>;
};

export const SubHeader: React.SFC<{}> = ({ children }) => {
    return <h3 className="subheader">{children}</h3>;
};

export const Text: React.SFC<{}> = ({ children }) => {
    return <p className="text">{children}</p>;
};
