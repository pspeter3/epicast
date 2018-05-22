import { AppBar, AppBarIcon, AppBarNav, AppBarSection, AppBarTab, AppBarTitle } from "./appbar";
import { snapshot } from "./snapshot";

describe("AppBar", () => {
    snapshot("AppBar", AppBar);
    snapshot("AppBarContainer", AppBarSection);
    snapshot("AppBarTitle", AppBarTitle);
    snapshot("AppBarIcon", AppBarIcon);
    snapshot("AppBarNav", AppBarNav);
    snapshot("AppBarTab", AppBarTab);
});
