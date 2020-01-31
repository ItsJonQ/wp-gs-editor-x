import React from "react";
import styled from "@emotion/styled";

const headingContent =
	"Lorem ipsum dolor sit amet, consectetur adipiscing elit";
const bodyContent =
	"Maecenas fermentum sapien auctor rutrum vehicula. Praesent a venenatis lectus, in lacinia risus. Pellentesque at ipsum efficitur, pharetra ante vitae, interdum ex. Pellentesque convallis urna et magna malesuada cursus. Sed bibendum efficitur mi eu vulputate. Quisque elit ante, cursus nec vehicula et, fringilla sed purus. Nulla posuere odio ut orci fermentum varius";

export const Typography = () => {
	return (
		<>
			<Break>
				<Heading as="h1" />
				<Heading as="h2" />
				<Heading as="h3" />
				<Heading as="h4" />
				<Heading as="h5" />
				<Heading as="h6" />
				<Body />
			</Break>
			<Break>
				<Example />
			</Break>
		</>
	);
};

const Heading = ({ as = "h1" }) => {
	return (
		<TextWrapper>
			<Label>{as}</Label>
			<TextView as={as}>{headingContent}</TextView>
		</TextWrapper>
	);
};

const Body = () => {
	return (
		<TextWrapper>
			<Label>Paragraph</Label>
			<TextView as="p">{bodyContent}</TextView>
		</TextWrapper>
	);
};

const Example = () => {
	return (
		<>
			<Label>Example</Label>
			<Spacer>
				<TextView as="h1">{headingContent}</TextView>
			</Spacer>
			<Spacer>
				<TextView as="p">{bodyContent}</TextView>
			</Spacer>
			<Spacer>
				<TextView as="h2">{headingContent}</TextView>
			</Spacer>
			<TextView as="p">{bodyContent}</TextView>
		</>
	);
};

const TextWrapper = styled.div`
	padding: 0 0 20px;
`;

const Label = styled.div`
	font-size: 10px;
	opacity: 0.5;
	text-transform: uppercase;
	margin-bottom: 8px;
`;

const TextView = styled.div`
	margin: 0;
	padding: 0;
`;

const Break = styled.div`
	margin-bottom: 40px;
`;

const Spacer = styled.div`
	margin-bottom: 16px;
`;
