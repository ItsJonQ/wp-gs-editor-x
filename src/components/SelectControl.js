import React from "react";
import { BaseControl } from "./BaseControl";

export function SelectControl({ label, value, options = [], ...props }) {
	return (
		<BaseControl label={label} value={value}>
			<select defaultValue={value} {...props}>
				{options.map(item => (
					<option value={item.value} key={item.value}>
						{item.label}
					</option>
				))}
			</select>
		</BaseControl>
	);
}
