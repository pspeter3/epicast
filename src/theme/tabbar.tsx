import * as React from "react";

export const TabBar: React.SFC<{}> = ({ children }) => {
    return <nav className="tabbar">{children}</nav>;
};

export const Tab: React.SFC<{}> = ({ children }) => {
    return (
        <a href="#" className="tab">
            {children}
        </a>
    );
};
