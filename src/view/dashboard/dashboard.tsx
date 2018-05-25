import * as React from "react";
import { gameForecast } from "../../core/selectors";
import { CityForecast, Forecast, Game } from "../../core/types";
import { Meter, Percentage } from "../../theme/data";
import { Row, Section } from "../../theme/layout";
import { Header } from "../../theme/typography";

export interface Props {
    game: Game;
}

export interface State {
    forecast: Forecast;
    sort: keyof CityForecast;
}

export class Dashboard extends React.PureComponent<Props, State> {
    public static getDerivedStateFromProps(nextProps: Props): Partial<State> {
        return { forecast: gameForecast(nextProps.game) };
    }

    public state: State = {
        forecast: { epidemics: 0, cities: [] },
        sort: "name",
    };

    public render() {
        const { forecast } = this.state;
        const { epidemics } = forecast;
        return (
            <React.Fragment>
                <Section>
                    <Row>
                        <Header>Epidemic Probability</Header>
                        <Percentage value={epidemics} />
                    </Row>
                    <Row>
                        <Meter value={epidemics} />
                    </Row>
                </Section>
            </React.Fragment>
        );
    }
}
