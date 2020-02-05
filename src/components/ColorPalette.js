import React from "react";
import styled from "@emotion/styled";
import colorize from "tinycolor2";
import { Heading } from "./Heading";

export function ColorPalette({ colors = [] }) {
	console.log(colors);
	return (
		<Grid>
			{colors.map(color => (
				<ColorShade {...color} key={color.name} />
			))}
		</Grid>
	);
}

function ColorShade({ name, color }) {
	const colors = Object.keys(color);
	const baseColor = color.base;

	return (
		<GridItem>
			<Swatch value={baseColor}>
				<Heading as="h6">{name}</Heading>
			</Swatch>
			{colors.map((swatch, index) => {
				const value = color[swatch];

				return (
					<Swatch key={index} value={value}>
						<strong>{swatch}</strong>
					</Swatch>
				);
			})}
		</GridItem>
	);
}

function Swatch({ children, value }) {
	const textColor = colorize(value).isDark() ? "white" : "black";

	return (
		<SwatchView style={{ backgroundColor: value, color: textColor }}>
			<div>{children}</div>
			<div>{value}</div>
		</SwatchView>
	);
}

const Grid = styled.div`
	display: flex;
`;

const GridItem = styled.div`
	flex: 1;
`;

const SwatchView = styled.div`
	padding: 20px;
	font-size: 11px;
	display: flex;
	text-transform: uppercase;
	justify-content: space-between;
	align-items: center;

	h6 {
		font-size: 12px;
		margin-bottom: 4px;
		padding: 10px 0;
	}
`;
