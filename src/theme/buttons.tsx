import * as React from "react";

export const IconButton: React.SFC<React.ButtonHTMLAttributes<HTMLButtonElement>> = props => {
    return <button className="icon-button" type="button" {...props} />;
};

export const SubHeaderButton: React.SFC<React.ButtonHTMLAttributes<HTMLButtonElement>> = props => {
    return <button className="subheader-button" type="button" {...props} />;
};

export const BottomButton: React.SFC<React.ButtonHTMLAttributes<HTMLButtonElement>> = props => {
    return <button className="bottom-button" type="button" {...props} />;
};
