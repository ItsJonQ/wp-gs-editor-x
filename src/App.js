import React, { useEffect, useState, useRef } from "react";
import { Global } from "@emotion/core";
import colorize from "tinycolor2";
import styled from "@emotion/styled";
import {
	Button,
	Cover,
	ColorControl,
	ColorPalette,
	RangeControl,
	SelectControl,
	Section,
	Typography,
} from "./components";

function App() {
	const {
		styles,
		fontSize,
		fontScale,
		setFontScale,
		setFontSize,
		textAlign,
		setTextAlign,
		setTextColor,
		textColor,
		primaryColor,
		backgroundColor,
		setBackgroundColor,
		setPrimaryColor,
		colorShades,
	} = useStyles();

	const createInputHandler = fn => event => fn(event.target.value);
	const handleOnChangeFontSize = createInputHandler(setFontSize);
	const handleOnChangeFontScale = createInputHandler(setFontScale);
	const handleOnChangeTextAlign = createInputHandler(setTextAlign);

	const handleOnChangeTextColor = createInputHandler(setTextColor);
	const handleOnChangeBackgroundColor = createInputHandler(
		setBackgroundColor,
	);
	const handleOnChangePrimaryColor = createInputHandler(setPrimaryColor);

	const textAlignOptions = [
		{
			value: "left",
			label: "Left",
		},
		{
			value: "center",
			label: "Center",
		},
		{
			value: "right",
			label: "Right",
		},
		{
			value: "justify",
			label: "Justified",
		},
	];

	return (
		<Editor>
			<Global styles={styles} />
			<Container>
				<ScrollableContent>
					<BodyContent colors={colorShades} />
				</ScrollableContent>
			</Container>
			<Sidebar>
				<ScrollableContent>
					<Content>
						<SidebarPanel title="Typography">
							<RangeControl
								label="Font Size"
								onChange={handleOnChangeFontSize}
								value={fontSize}
								min="11"
								max="32"
							/>
							<RangeControl
								label="Font Scale"
								onChange={handleOnChangeFontScale}
								value={fontScale}
								min="1.1"
								max="1.3"
								step="0.01"
							/>

							<SelectControl
								label="Text Align"
								value={textAlign}
								onChange={handleOnChangeTextAlign}
								options={textAlignOptions}
							/>
						</SidebarPanel>
						<SidebarPanel title="Color">
							<ColorControl
								label="Text"
								value={textColor}
								onChange={handleOnChangeTextColor}
							/>

							<ColorControl
								label="Background"
								value={backgroundColor}
								onChange={handleOnChangeBackgroundColor}
							/>

							<ColorControl
								label="Primary"
								value={primaryColor}
								onChange={handleOnChangePrimaryColor}
							/>
						</SidebarPanel>
					</Content>
				</ScrollableContent>
			</Sidebar>
		</Editor>
	);
}

function BodyContent({ colors }) {
	return (
		<>
			<Cover />
			<Section title="Typography">
				<Typography />
			</Section>
			<Section title="Colors">
				<ColorPalette colors={colors} />
			</Section>
			<Section title="Button">
				<Button />
			</Section>

			<Section />
		</>
	);
}

const useStyles = () => {
	const baseFontScale = 1.2;
	const baseLineHeight = 1.5;
	const baseLineHeightTitleMultiplier = 0.7334;

	const [fontSize, setFontSize] = useState(16);
	const [fontScale, setFontScale] = useState(baseFontScale);
	const [textAlign, setTextAlign] = useState("left");

	const [primaryColor, setPrimaryColor] = useState("#0000ff");
	const [backgroundColor, setBackgroundColor] = useState("#ffffff");
	const [textColor, setTextColor] = useState("#000000");

	const [styles, setStyles] = useState("");

	const prevStyle = useRef("");

	const lineHeightOffsetMultiplier = fontScale - baseFontScale + 1;
	const lineHeightMultiplier = baseLineHeight / baseFontScale;
	const lineHeight =
		fontScale * lineHeightMultiplier * lineHeightOffsetMultiplier;

	const baseLineHeightTitle = lineHeight / lineHeightOffsetMultiplier;
	const titleLineHeight = (
		baseLineHeightTitle * baseLineHeightTitleMultiplier
	).toFixed(2);

	const primaryTextColor = colorize
		.mostReadable(primaryColor, [textColor, backgroundColor])
		.toHexString();

	let nextStyle = [":root {"];

	nextStyle.push(`--wp-font-size: ${fontSize}px;`);
	nextStyle.push(`--wp-font-title-line-height: ${titleLineHeight};`);
	nextStyle.push(`--wp-font-line-height: ${lineHeight};`);
	nextStyle.push(`--wp-font-text-align: ${textAlign};`);

	const typeSizes = {
		h1: 5,
		h2: 4,
		h3: 3,
		h4: 2,
		h5: 1,
		h6: 0.5,
	};

	Object.entries(typeSizes).forEach(([size, scale]) => {
		const value = (Math.pow(fontScale, scale) * fontSize).toFixed(2);
		nextStyle.push(`--wp-font-size-${size}: ${value}px;`);
	});

	nextStyle.push(`--wp-color-primary: ${primaryColor};`);
	nextStyle.push(`--wp-color-primary-text: ${primaryTextColor};`);
	nextStyle.push(`--wp-color-text: ${textColor};`);
	nextStyle.push(`--wp-color-background: ${backgroundColor};`);

	const colors = [
		{
			name: "text",
			color: textColor,
		},
		{
			name: "background",
			color: backgroundColor,
		},
		{
			name: "primary",
			color: primaryColor,
		},
	];

	const colorShades = colors.map(color => ({
		...color,
		color: getColorShades(color.color),
	}));

	colors.forEach(color => {
		const colorShades = getColorShades(color.color);
		const colorShadeIndex = Object.keys(colorShades);

		colorShadeIndex.forEach(shade => {
			const value = colorShades[shade];
			nextStyle.push(`--wp-color-${color.name}-${shade}: ${value};`);
		});
	});

	nextStyle.push("}");

	nextStyle.push("html {");
	nextStyle.push(`background: var(--wp-color-background);`);
	nextStyle.push(`color: var(--wp-color-text);`);
	nextStyle.push("}");
	nextStyle = nextStyle.join("\n");

	useEffect(() => {
		if (prevStyle.current !== nextStyle) {
			setStyles(nextStyle);
			prevStyle.current = nextStyle;
		}
	}, [prevStyle, nextStyle]);

	return {
		styles,
		fontSize,
		setFontSize,
		fontScale,
		setFontScale,
		lineHeight,
		textAlign,
		setTextAlign,
		primaryColor,
		setPrimaryColor,
		backgroundColor,
		setBackgroundColor,
		textColor,
		setTextColor,
		colorShades,
	};
};

function SidebarPanel({ title, children }) {
	return (
		<Panel>
			<PanelTitle>{title}</PanelTitle>
			{children}
		</Panel>
	);
}

const Editor = styled.div`
	display: flex;
	height: 100vh;
	position: relative;
	width: 100%;
`;

const Container = styled.div`
	flex: 1;
	height: 100%;
`;

const Sidebar = styled.div`
	border-left: 1px solid #eee;
	width: 300px;
	height: 100%;
`;

const Content = styled.div`
	padding: 20px;
`;

const ScrollableContent = styled.div`
	height: 100%;
	padding: 0;
	overflow-y: auto;
`;

const Panel = styled.div`
	margin-bottom: 32px;
`;
const PanelTitle = styled.div`
	font-weight: bold;
	margin-bottom: 12px;
`;

function getColorShades(color) {
	return {
		light20: colorize(color)
			.lighten(20)
			.toHexString(),
		light10: colorize(color)
			.lighten(10)
			.toHexString(),
		base: colorize(color).toHexString(),
		dark10: colorize(color)
			.darken(10)
			.toHexString(),
		dark20: colorize(color)
			.darken(20)
			.toHexString(),
	};
}

export default App;
