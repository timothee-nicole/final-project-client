import React from "react";
import { TripContext } from "./TripContext";

export const withUser = (ComponentToPassTripContextTo) => {
    return function (props) {
      return (
        <TripContext.Consumer>
          {(context) => (
            <ComponentToPassTripContextTo {...props} context={context} />
          )}
        </TripContext.Consumer>
      );
    };
  };