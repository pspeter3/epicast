import * as React from "react";
import * as ReactDOM from "react-dom";
import { Appbar } from "./theme/appbar";
import { classNames, focusClass } from "./theme/css";
import { DataTable } from "./theme/data_table";
import { AlertIcon, CodeIcon, EditIcon, SaveIcon, UndoIcon } from "./theme/icons";
import { NumericInput } from "./theme/numeric_input";
import {
    AlignItems,
    BackgroundColor,
    BorderColor,
    BorderRadius,
    BorderSize,
    BorderStyle,
    BoxShadow,
    Display,
    FontWeight,
    JustifyContent,
    Outline,
    Padding,
    Sizing,
    TextAlign,
    TextColor,
    TextDecoration,
    TextSize,
    Tracking,
} from "./theme/tailwind";

class KitchenSink extends React.PureComponent<{}, { value: number }> {
    public static displayName = "KitchenSink";

    public state = {
        value: 1,
    };

    public render() {
        return (
            <>
                <Appbar
                    title="Epidemia"
                    actions={[
                        { icon: UndoIcon, href: "#/undo" },
                        { icon: AlertIcon, href: "#/infect" },
                        { icon: CodeIcon, href: "#/debug" },
                        { icon: EditIcon, href: "#/settings" },
                        { icon: SaveIcon, href: "#/save" },
                    ]}
                />
                <DataTable<"name" | "infections" | "epidemics">
                    headers={{ name: false, infections: true, epidemics: true }}
                    defaultSort="infections"
                    data={[
                        { name: "San Francisco", infections: 0.502, epidemics: 0.23 },
                        { name: "Los Angeles", infections: 0.32, epidemics: 0.37 },
                    ]}
                />
                <div className={classNames(Display.Flex, JustifyContent.Between, Padding.X1)}>
                    <label className={classNames(Padding.A3)}>Example</label>
                    <NumericInput value={this.state.value} onChange={this._onChange} />
                </div>
                <div className={classNames(Padding.Y1, Padding.X3)}>
                    <button
                        className={classNames(
                            Sizing.H10,
                            Sizing.WFull,
                            Display.InlineFlex,
                            AlignItems.Center,
                            JustifyContent.Center,
                            BorderRadius.Small,
                            BorderStyle.Solid,
                            BorderSize.A2,
                            BorderColor.Base,
                            TextSize.Small,
                            FontWeight.Medium,
                            TextColor.Base,
                            TextDecoration.Uppercase,
                            Tracking.Wide,
                            BoxShadow.Small,
                            focusClass(Outline.None),
                            focusClass(BackgroundColor.Lightest),
                            focusClass(BoxShadow.Large),
                        )}
                    >
                        Test
                    </button>
                </div>
                <div className={classNames(Padding.Y1, Padding.X3)}>
                    <select
                        className={classNames(
                            Sizing.H10,
                            Sizing.WFull,
                            BorderRadius.Small,
                            BorderStyle.Solid,
                            BorderSize.A1,
                            BackgroundColor.White,
                            TextSize.Small,
                            FontWeight.Medium,
                            TextColor.Grey,
                            TextDecoration.Uppercase,
                            Tracking.Wide,
                            focusClass(Outline.None),
                            focusClass(BackgroundColor.Lightest),
                        )}
                    >
                        <option selected={true} disabled={true}>
                            Epidemic
                        </option>
                        <option value="San Francisco">San Francisco</option>
                        <option value="Los Angeles">Los Angeles</option>
                    </select>
                </div>
            </>
        );
    }

    private _onChange = (value: number): void => {
        this.setState({ value });
    };
}

ReactDOM.render(<KitchenSink />, document.getElementById("root"));
