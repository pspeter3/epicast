import * as React from "react";
import { classNames } from "./css";

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
        <table {...props} className={classNames("data-table", props.className)} />
    );

    public static Row: React.SFC<React.HTMLProps<HTMLTableRowElement>> = props => (
        <tr {...props} className={classNames("data-table__row", props.className)} />
    );

    public static Header: React.SFC<React.HTMLProps<HTMLTableHeaderCellElement>> = props => (
        <th {...props} className={classNames("data-table__header", props.className)} />
    );

    public static Cell: React.SFC<React.HTMLProps<HTMLTableCellElement>> = props => (
        <td {...props} className={classNames("data-table__cell", props.className)} />
    );

    public state = {
        sort: this.props.defaultSort,
    };

    public render() {
        const { headers, data } = this.props;
        const { sort } = this.state;
        const keys = Object.keys(headers) as K[];
        const id = keys[0];
        return (
            <DataTable.Table>
                <thead>
                    <DataTable.Row>
                        {keys.map(key => (
                            <DataTable.Header
                                key={key}
                                className={classNames(
                                    key === sort ? "data-table__header--selected" : undefined,
                                    headers[key] ? "data-table__header--numeric" : undefined,
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
                                            headers[key] ? "data-table__cell--numeric" : undefined,
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

    private _background(record: Record<K, string | number>): string | undefined {
        const { headers } = this.props;
        const { sort } = this.state;
        if (headers[sort]) {
            const value = record[sort] as number;
            if (value >= 1) {
                return "data-table__row--danger";
            }
            if (value >= 0.5) {
                return "data-table__row--warning";
            }
            if (value === 0) {
                return "data-table__row--safe";
            }
        }
        return undefined;
    }
}

DataTable.Table.displayName = "DataTable.Table";
DataTable.Row.displayName = "DataTable.Row";
DataTable.Header.displayName = "DataTable.Header";
DataTable.Cell.displayName = "DataTable.Cell";
