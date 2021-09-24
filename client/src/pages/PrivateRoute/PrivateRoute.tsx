import * as React from "react";
import { useSelector } from "react-redux";
import { Route, RouteProps, useHistory } from "react-router";
import { RootState } from "../../store";

export const PrivateRoute: React.FC<RouteProps> = ({ ...props }) => {
  const key = useSelector((state: RootState) => state.auth.key);
  const history = useHistory();

  if (key === null) {
    history.replace("/login");
    return null;
  }

  return <Route {...props} />;
};
