import { AppBar, AppBarContainer, AppBarIcon, AppBarTitle } from "./appbar";
import { snapshot } from "./snapshot";

describe("AppBar", () => {
    snapshot("AppBar", AppBar);
    snapshot("AppBarContainer", AppBarContainer);
    snapshot("AppBarTitle", AppBarTitle);
    snapshot("AppBarIcon", AppBarIcon);
});
