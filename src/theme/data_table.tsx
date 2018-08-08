import * as React from "React";
import { classNames } from "./css";
import {
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

export interface Props {
    headers: Record<string, boolean>;
    defaultSort: string;
    data: Array<Record<string, string | number>>;
}

export interface State {
    sort: string;
}

export class DataTable extends React.PureComponent<Props, State> {
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
        const keys = Object.keys(headers);
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
                        .sort((left, right) => {
                            const isNumeric = headers[sort];
                            const a = left[sort];
                            const b = right[sort];
                            const inOrder = a < b;
                            return isNumeric ? (inOrder ? 1 : -1) : inOrder ? -1 : 1;
                        })
                        .map(record => (
                            <DataTable.Row key={record[sort]}>
                                {keys.map(key => (
                                    <DataTable.Cell
                                        key={key}
                                        className={classNames(
                                            headers[key] ? TextAlign.Right : TextAlign.Left,
                                            headers[key] ? FontFamily.Mono : FontFamily.Sans,
                                        )}
                                    >
                                        {record[key]}
                                    </DataTable.Cell>
                                ))}
                            </DataTable.Row>
                        ))}
                </tbody>
            </DataTable.Table>
        );
    }
}

DataTable.Table.displayName = "DataTable.Table";
DataTable.Row.displayName = "DataTable.Row";
DataTable.Header.displayName = "DataTable.Header";
DataTable.Cell.displayName = "DataTable.Cell";
