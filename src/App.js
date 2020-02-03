import React, { useEffect, useState, useRef } from "react";
import { Global } from "@emotion/core";
import styled from "@emotion/styled";
import {
	ColorControl,
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
					<Content>
						<Section title="Typography">
							<Typography />
						</Section>
					</Content>
				</ScrollableContent>
			</Container>
			<Sidebar>
				<ScrollableContent>
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
							max="1.5"
							step="0.025"
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
				</ScrollableContent>
			</Sidebar>
		</Editor>
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
		h6: 0.92,
	};

	Object.entries(typeSizes).forEach(([size, scale]) => {
		const value = (Math.pow(fontScale, scale) * fontSize).toFixed(2);
		nextStyle.push(`--wp-font-size-${size}: ${value}px;`);
	});

	nextStyle.push(`--wp-color-primary: ${primaryColor};`);
	nextStyle.push(`--wp-color-text: ${textColor};`);
	nextStyle.push(`--wp-color-background: ${backgroundColor};`);

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

const Content = styled.div`
	margin: auto;
	max-width: 720px;
	padding: 0 15px 20vh;
`;

const Sidebar = styled.div`
	border-left: 1px solid #eee;
	width: 300px;
	height: 100%;
`;

const ScrollableContent = styled.div`
	height: 100%;
	padding: 20px;
	overflow-y: auto;
`;

const Panel = styled.div`
	margin-bottom: 32px;
`;
const PanelTitle = styled.div`
	font-weight: bold;
	margin-bottom: 12px;
`;

export default App;
