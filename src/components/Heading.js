import React from "react";
import { Text } from "./Text";

export function Heading({ as = "h1", ...props }) {
	return <Text as={as} {...props} />;
}
