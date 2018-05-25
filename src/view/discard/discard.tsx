import * as React from "react";
import { Stack } from "../../core/types";
import { Main } from "../../theme/layout";
import { DiscardRow } from "./discard_row";

export interface Props {
    discard: Stack;
    onRemove: (city: string) => void;
}

export class Discard extends React.PureComponent<Props, {}> {
    public render() {
        const { discard, onRemove } = this.props;
        return (
            <Main>
                {Object.keys(discard)
                    .sort()
                    .reduce(
                        (children, city) => {
                            const count = discard[city];
                            for (let i = 0; i < count; i++) {
                                children.push(
                                    <DiscardRow
                                        key={`${city}${i}`}
                                        city={city}
                                        onRemove={onRemove}
                                    />,
                                );
                            }
                            return children;
                        },
                        [] as Array<React.ReactElement<{}>>,
                    )}
            </Main>
        );
    }
}
