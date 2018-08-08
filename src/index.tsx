import * as React from "react";
import * as ReactDOM from "react-dom";
import { Appbar } from "./theme/appbar";
import { DataTable } from "./theme/data_table";
import { AlertIcon, CodeIcon, EditIcon, SaveIcon, UndoIcon } from "./theme/icons";
import { NumericInput } from "./theme/numeric_input";

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
                <NumericInput value={this.state.value} onChange={this._onChange} />
            </>
        );
    }

    private _onChange = (value: number): void => {
        this.setState({ value });
    };
}
ReactDOM.render(<KitchenSink />, document.getElementById("root"));
