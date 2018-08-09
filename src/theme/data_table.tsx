import * as React from "react";
import { classNames } from "./css";
import {
    BackgroundColor,
    BorderSize,
    BorderStyle,
    FontFamily,
    FontWeight,
    Padding,
    Sizing,
    TableBorder,
    TextAlign,
    TextColor,
    TextDecoration,
    TextSize,
    Tracking,
} from "./tailwind";

export interface Props<K extends string> {
    headers: Record<K, boolean>;
    defaultSort: K;
    data: Array<Record<K, string | number>>;
}

export interface State<K extends string> {
    sort: K;
}

export class DataTable<K extends string> extends React.PureComponent<Props<K>, State<K>> {
    public static displayName = "DataTable";

    public static Table: React.SFC<React.HTMLProps<HTMLTableElement>> = props => (
        <table
            {...props}
            className={classNames(Sizing.WFull, TableBorder.Collapse, props.className)}
        />
    );

    public static Row: React.SFC<React.HTMLProps<HTMLTableRowElement>> = props => (
        <tr
            {...props}
            className={classNames(Sizing.H12, BorderStyle.Solid, BorderSize.B1, props.className)}
        />
    );

    public static Header: React.SFC<React.HTMLProps<HTMLTableHeaderCellElement>> = props => (
        <th
            {...props}
            className={classNames(
                TextSize.Small,
                FontWeight.Medium,
                Tracking.Wide,
                TextDecoration.Capitalize,
                Padding.X4,
                props.className,
            )}
        />
    );

    public static Cell: React.SFC<React.HTMLProps<HTMLTableCellElement>> = props => (
        <td {...props} className={classNames(Padding.X4, props.className)} />
    );

    public state = {
        sort: this.props.defaultSort,
    };

    public render() {
        const { headers, data } = this.props;
        const { sort } = this.state;
        const keys = Object.keys(headers) as K[];
        const id = keys[0];
        let max: number | undefined;
        return (
            <DataTable.Table>
                <thead>
                    <DataTable.Row>
                        {keys.map(key => (
                            <DataTable.Header
                                key={key}
                                className={classNames(
                                    key === sort ? TextColor.Base : TextColor.Grey,
                                    headers[key] ? TextAlign.Right : TextAlign.Left,
                                )}
                                onClick={() => this.setState({ sort: key })}
                            >
                                {key}
                            </DataTable.Header>
                        ))}
                    </DataTable.Row>
                </thead>
                <tbody>
                    {data
                        .sort(
                            (
                                left: Record<K, string | number>,
                                right: Record<K, string | number>,
                            ): number => {
                                let a = left[sort];
                                let b = right[sort];
                                const isNumeric = headers[sort] && a !== b;
                                if (a === b) {
                                    a = left[id];
                                    b = right[id];
                                }
                                const inOrder = a < b;
                                return isNumeric ? (inOrder ? 1 : -1) : inOrder ? -1 : 1;
                            },
                        )
                        .map(record => (
                            <DataTable.Row key={record[id]} className={this._background(record)}>
                                {keys.map(key => (
                                    <DataTable.Cell
                                        key={key}
                                        className={classNames(
                                            headers[key] ? TextAlign.Right : TextAlign.Left,
                                            headers[key] ? FontFamily.Mono : FontFamily.Sans,
                                        )}
                                    >
                                        {headers[key]
                                            ? (record[key] as number).toFixed(2)
                                            : record[key]}
                                    </DataTable.Cell>
                                ))}
                            </DataTable.Row>
                        ))}
                </tbody>
            </DataTable.Table>
        );
    }

    private _background(record: Record<K, string | number>): string {
        const { headers } = this.props;
        const { sort } = this.state;
        if (headers[sort]) {
            const value = record[sort] as number;
            if (value > 1) {
                return BackgroundColor.Danger;
            }
            if (value > 0.5) {
                return BackgroundColor.Warning;
            }
        }
        return BackgroundColor.White;
    }
}

DataTable.Table.displayName = "DataTable.Table";
DataTable.Row.displayName = "DataTable.Row";
DataTable.Header.displayName = "DataTable.Header";
DataTable.Cell.displayName = "DataTable.Cell";
