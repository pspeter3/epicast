import * as React from "react";
import { gameForecast } from "../../core/selectors";
import { CityForecast, Forecast, Game } from "../../core/types";
import { NumericSubHeaderButton, PrimarySubHeaderButton } from "../../theme/buttons";
import { Meter, Numeric, Percentage } from "../../theme/data";
import { Main, Row, Section } from "../../theme/layout";
import { Header, Text } from "../../theme/typography";

export interface Props {
    game: Game;
}

type SortKey = keyof CityForecast;

const SORT_KEYS: SortKey[] = ["name", "infections", "epidemics"];

export interface State {
    forecast: Forecast;
    sort: SortKey;
}

export class Dashboard extends React.PureComponent<Props, State> {
    public static getDerivedStateFromProps(nextProps: Props): Partial<State> {
        return { forecast: gameForecast(nextProps.game) };
    }

    public state: State = {
        forecast: { epidemics: 0, cities: [] },
        sort: SORT_KEYS[1],
    };

    public render() {
        const { forecast } = this.state;
        const { epidemics } = forecast;
        return (
            <Main>
                <Section>
                    <Row>
                        <Header>Epidemic Probability</Header>
                        <Percentage value={epidemics} />
                    </Row>
                    <Row>
                        <Meter value={epidemics} />
                    </Row>
                </Section>
                <Row>
                    {SORT_KEYS.map((sort, index) => {
                        const onClick = () => {
                            this.setState({
                                sort,
                            });
                        };
                        return index === 0 ? (
                            <PrimarySubHeaderButton
                                key={sort}
                                aria-pressed={sort === this.state.sort}
                                onClick={onClick}
                            >
                                {sort}
                            </PrimarySubHeaderButton>
                        ) : (
                            <NumericSubHeaderButton
                                key={sort}
                                aria-pressed={sort === this.state.sort}
                                onClick={onClick}
                            >
                                {sort}
                            </NumericSubHeaderButton>
                        );
                    })}
                </Row>
                {Array.from(this.state.forecast.cities)
                    .sort(this._onSort)
                    .map(city => (
                        <Row key={city.name}>
                            <Text>{city.name}</Text>
                            <Numeric value={city.infections} />
                            <Numeric value={city.epidemics} />
                        </Row>
                    ))}
            </Main>
        );
    }

    private _onSort = (a: CityForecast, b: CityForecast) => {
        const { sort } = this.state;
        if (sort === "name") {
            return a.name.localeCompare(b.name);
        }
        return b[sort] - a[sort];
    };
}
