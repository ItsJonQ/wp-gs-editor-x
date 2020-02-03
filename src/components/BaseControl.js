import React from "react";
import styled from "@emotion/styled";

export function BaseControl({ label, value, children }) {
	return (
		<Label>
			<LabelText>
				{label} ({value})
			</LabelText>
			{children}
		</Label>
	);
}

const Label = styled.label`
	display: block;
	margin: 0 0 10px;

	input[type="range"],
	select {
		display: block;
		width: 100%;
	}
`;

const LabelText = styled.div`
	font-size: 12px;
	font-weight: bold;
`;
