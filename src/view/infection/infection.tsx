import * as React from "react";
import { Deck } from "../../core/types";
import { PrimaryButton } from "../../theme/buttons";
import { Main } from "../../theme/layout";
import { size, union, unit } from "../../util/stacks";
import { InfectionSection } from "./infection_section";

export interface Props {
    deck: Deck;
    onInfect: (deck: Deck) => void;
    onEpidemic: (city: string) => void;
}

export interface State {
    selected: Deck;
}

export class Infection extends React.PureComponent<Props, State> {
    public state: State = { selected: [] };

    public render() {
        const { deck, onEpidemic } = this.props;
        const { selected } = this.state;
        const count = selected.reduce((sum, stack) => sum + size(stack), 0);
        return (
            <Main>
                {deck.reduceRight(
                    (children, stack, index) => {
                        children.push(
                            <InfectionSection
                                key={index}
                                index={index}
                                stack={stack}
                                checked={index >= selected.length ? {} : selected[index]}
                                onToggle={this._onToggle}
                                onEpidemic={index === 0 ? onEpidemic : undefined}
                            />,
                        );
                        return children;
                    },
                    [] as Array<React.ReactElement<{}>>,
                )}
                <PrimaryButton onClick={this._onInfect}>
                    {count === 0 ? "Skip Infection" : "Infect"}
                </PrimaryButton>
            </Main>
        );
    }

    private _onInfect = () => {
        this.props.onInfect(this.state.selected);
        this.setState({ selected: [] });
    };

    private _onToggle = (index: number, city: string) => {
        const delta = unit(city);
        let selected: Deck = this.state.selected.map((stack, i) => {
            return i === index ? union(stack, delta) : stack;
        });
        for (let i = selected.length; i <= index; i++) {
            selected = i === index ? selected.concat(delta) : selected.concat({});
        }
        this.setState({ selected });
    };
}
