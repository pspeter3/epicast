import * as React from "react";

export const IconButton: React.SFC<React.ButtonHTMLAttributes<HTMLButtonElement>> = props => {
    return <button className="icon-button" {...props} />;
};
