import * as React from "react";
import { Stack } from "../../core/types";
import { Section } from "../../theme/layout";
import { value } from "../../util/stacks";
import { InfectionRow } from "./infection_row";

export interface Props {
    index: number;
    stack: Stack;
    checked: Stack;
    onToggle: (index: number, city: string) => void;
    onEpidemic?: (city: string) => void;
}

export class InfectionSection extends React.PureComponent<Props, {}> {
    public render() {
        const { stack, checked, onEpidemic } = this.props;
        return (
            <Section>
                {Object.keys(stack)
                    .sort()
                    .reduce(
                        (children, city) => {
                            const count = stack[city];
                            const numChecked = value(checked, city);
                            for (let i = 0; i < count; i++) {
                                children.push(
                                    <InfectionRow
                                        key={`${city}${i}`}
                                        city={city}
                                        checked={i < numChecked}
                                        onToggle={this._onToggle}
                                        onEpidemic={onEpidemic}
                                    />,
                                );
                            }
                            return children;
                        },
                        [] as Array<React.ReactElement<{}>>,
                    )}
            </Section>
        );
    }

    private _onToggle = (city: string) => {
        this.props.onToggle(this.props.index, city);
    };
}
