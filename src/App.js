import React, { useEffect, useState, useRef } from "react";
import { Global } from "@emotion/core";
import styled from "@emotion/styled";
import { Section, Typography } from "./components";

function App() {
	const {
		styles,
		fontSize,
		fontScale,
		setFontScale,
		setFontSize,
	} = useStyles();
	return (
		<>
			<Global styles={styles} />
			<Container>
				<Section title="Typography">
					<Typography />
				</Section>
			</Container>
		</>
	);
}

const useStyles = () => {
	const [fontSize, setFontSize] = useState(16);
	const [fontScale, setFontScale] = useState(1.2);
	const [styles, setStyles] = useState("");
	const prevStyle = useRef("");

	let nextStyle = [":root {"];

	nextStyle.push(`--wp-font-size: ${fontSize}px;`);

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
	};
};

const Container = styled.div`
	margin: auto;
	max-width: 720px;
	padding: 0 15px 20vh;
`;

export default App;
