import { Fragment } from "react";

import { Sessions } from "../components";
import { Filter } from "../components";

export const Home = (): JSX.Element => {
  return (
    <Fragment>
      <Filter />
      <Sessions />
    </Fragment>
  );
};
