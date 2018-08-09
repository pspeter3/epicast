import * as React from "react";
import { classNames } from "./css";
import {
    AlignItems,
    BackgroundColor,
    BorderRadius,
    BoxShadow,
    Display,
    FontWeight,
    JustifyContent,
    Margin,
    Padding,
    Sizing,
    TextSize,
    Tracking,
} from "./tailwind";

export const Banner: React.SFC<React.HTMLProps<HTMLDivElement>> = props => (
    <div
        {...props}
        className={classNames(
            AlignItems.Center,
            BackgroundColor.Secondary,
            BorderRadius.Small,
            BoxShadow.Small,
            Display.Flex,
            FontWeight.Medium,
            JustifyContent.Center,
            Margin.B2,
            Margin.X1,
            Padding.X3,
            Sizing.H6,
            TextSize.Small,
            Tracking.Wide,
            props.className,
        )}
    />
);
