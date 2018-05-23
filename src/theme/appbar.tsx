import * as React from "react";

export const AppBar: React.SFC<{}> = ({ children }) => {
    return <header className="appbar">{children}</header>;
};
