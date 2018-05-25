import * as React from "react";
import { Deck } from "../../core/types";
import { BottomButton } from "../../theme/buttons";
import { Main } from "../../theme/layout";
import { size } from "../../util/stacks";
import { InfectionSection } from "./infection_section";

export interface Props {
    rate: number;
    deck: Deck;
    onInfect: (deck: Deck) => void;
    onEpidemic: (city: string) => void;
}

export type State = Deck;

export class Infection extends React.PureComponent<Props, State> {
    public state: State = [];

    public render() {
        const { deck, rate, onEpidemic } = this.props;
        const { count, activeIndex } = this.state.reduce(
            (ctx, stack, index) => {
                const sum = size(stack);
                const count = ctx.count + sum;
                return {
                    count,
                    activeIndex: rate - count > 0 ? deck.length - index : ctx.activeIndex,
                };
            },
            { count: 0, activeIndex: deck.length - 1 },
        );
        const disabled = count === 0 || count === rate;
        return (
            <React.Fragment>
                <Main>
                    {deck.reduceRight(
                        (children, stack, index) => {
                            children.push(
                                <InfectionSection
                                    key={index}
                                    index={index}
                                    stack={stack}
                                    checked={this.state[0]}
                                    onToggle={index >= activeIndex ? this._onToggle : undefined}
                                    onEpidemic={index === 0 ? onEpidemic : undefined}
                                />,
                            );
                            return children;
                        },
                        [] as Array<React.ReactElement<{}>>,
                    )}
                </Main>
                <BottomButton onClick={this._onInfect} disabled={disabled}>
                    {count === 0 ? "Skip Infection" : "Infect"}
                </BottomButton>
            </React.Fragment>
        );
    }

    private _onInfect = () => {
        this.props.onInfect(this.state);
    };

    private _onToggle = (index: number, city: string) => {
        
    };
}
