import React, { useEffect, useState, useRef } from "react";
import { Global } from "@emotion/core";
import styled from "@emotion/styled";
import { Section, Typography } from "./components";

function App() {
	const {
		styles,
		fontSize,
		fontScale,
		lineHeight,
		setFontScale,
		setFontSize,
		setLineHeight,
	} = useStyles();

	const createInputHandler = fn => event => fn(event.target.value);
	const handleOnChangeFontSize = createInputHandler(setFontSize);
	const handleOnChangeFontScale = createInputHandler(setFontScale);
	const handleOnChangeLineHeight = createInputHandler(setLineHeight);

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
						<RangeControl
							label="Line Height"
							onChange={handleOnChangeLineHeight}
							value={lineHeight}
							min="1.1"
							max="2"
							step="0.05"
						/>
					</SidebarPanel>
				</ScrollableContent>
			</Sidebar>
		</Editor>
	);
}

const useStyles = () => {
	const [fontSize, setFontSize] = useState(16);
	const [fontScale, setFontScale] = useState(1.2);
	const [lineHeight, setLineHeight] = useState(1.5);
	const [styles, setStyles] = useState("");
	const prevStyle = useRef("");

	let nextStyle = [":root {"];

	const titleLineHeight = (lineHeight * 0.7334).toFixed(2);

	nextStyle.push(`--wp-font-size: ${fontSize}px;`);
	nextStyle.push(`--wp-font-title-line-height: ${titleLineHeight};`);
	nextStyle.push(`--wp-font-line-height: ${lineHeight};`);

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
		setLineHeight,
	};
};

function RangeControl({ label, value, ...props }) {
	return (
		<Label>
			<LabelText>
				{label} ({value})
			</LabelText>
			<input type="range" {...props} value={value} />
		</Label>
	);
}

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
	width: 300px;
	height: 100%;
`;

const ScrollableContent = styled.div`
	height: 100%;
	padding: 20px;
	overflow-y: auto;
`;

const Label = styled.label`
	display: block;
	margin: 0 0 10px;
	input {
		display: block;
		width: 100%;
	}
`;

const LabelText = styled.div`
	font-size: 12px;
	font-weight: bold;
`;

const Panel = styled.div`
	margin-bottom: 32px;
`;
const PanelTitle = styled.div`
	font-weight: bold;
	margin-bottom: 12px;
`;

export default App;
