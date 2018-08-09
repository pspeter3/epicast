import * as React from "react";
import { RouterService } from "../util/services";

export interface Services {
    router: RouterService;
}

export interface Props {
    services: Services;
    children: (route: string) => React.ReactElement<any>;
}

export interface State {
    route: string;
}

export class Router extends React.Component<Props, State> {
    public static displayName = "Router";

    public state = {
        route: this.props.services.router.route(),
    };

    private _release?: () => void;

    public render() {
        return this.props.children(this.state.route);
    }

    public componentDidMount() {
        this._release = this.props.services.router.onRouteChange(route => this.setState({ route }));
    }

    public componentWillUnmount() {
        if (this._release) {
            this._release();
        }
    }
}
