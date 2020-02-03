import React from "react";
import { BaseControl } from "./BaseControl";

export function RangeControl({ label, value, ...props }) {
	return (
		<BaseControl label={label} value={value}>
			<input type="range" {...props} value={value} />
		</BaseControl>
	);
}
