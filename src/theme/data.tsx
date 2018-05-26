import * as React from "react";

export const Meter: React.SFC<{ active?: boolean; value: number }> = ({ active, value }) => {
    const classNames = ["data-meter"];
    if (active) {
        classNames.push("active");
    }
    return <meter className={classNames.join(" ")} value={value} />;
};

export const Numeric: React.SFC<{ value: number }> = ({ value }) => {
    return <p className="data-numeric">{value.toFixed(2)}</p>;
};

export const Percentage: React.SFC<{ value: number }> = ({ value }) => {
    return <p className="data-percentage">{Math.round(value * 100)}%</p>;
};
