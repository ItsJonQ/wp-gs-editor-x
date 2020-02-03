import React from "react";
import { BaseControl } from "./BaseControl";

export function ColorControl({ label, value, ...props }) {
	return (
		<BaseControl label={label} value={value}>
			<input type="color" {...props} value={value} />
		</BaseControl>
	);
}
