import * as React from "react";
import { ReactWrapper } from "../../node_modules/@types/enzyme";
import { classNames, focusClass } from "./css";
import {
    AlignItems,
    BackgroundColor,
    BorderRadius,
    BoxShadow,
    Display,
    FontWeight,
    JustifyContent,
    Outline,
    Padding,
    Pin,
    Positioning,
    Sizing,
    TextColor,
    TextDecoration,
    TextSize,
    Tracking,
} from "./tailwind";

export interface AppbarStructure
    extends React.StatelessComponent<React.HTMLAttributes<HTMLElement>> {
    Title: React.SFC<React.HTMLAttributes<HTMLAnchorElement>>;
}

export const Appbar: React.SFC<React.HTMLProps<HTMLElement>> = props => (
    <header
        className={classNames(
            Positioning.Absolute,
            Pin.Top,
            Pin.Horizontal,
            Display.Flex,
            AlignItems.Center,
            JustifyContent.Between,
            BoxShadow.Medium,
            BackgroundColor.Base,
            Padding.A1,
            props.className,
        )}
        {...props}
    />
);

export const Headline: React.SFC<React.HTMLProps<HTMLAnchorElement>> = props => (
    <a
        className={classNames(
            TextColor.Black,
            TextDecoration.NoUnderline,
            TextSize.XLarge,
            FontWeight.Medium,
            Tracking.Wide,
            Padding.X3,
            Sizing.H6,
            props.className,
        )}
        {...props}
    />
);

export const Actions: React.SFC<React.HTMLProps<HTMLElement>> = props => (
    <nav className={classNames(Display.Flex, Sizing.H12, props.className)} {...props} />
);

export const Action: React.SFC<React.HTMLProps<HTMLAnchorElement>> = props => (
    <a
        className={classNames(
            TextColor.Black,
            Padding.A3,
            BorderRadius.Full,
            focusClass(Outline.None),
            focusClass(BackgroundColor.Dark),
            props.className,
        )}
        {...props}
    />
);
