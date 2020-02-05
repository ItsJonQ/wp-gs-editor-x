import React from "react";
import styled from "@emotion/styled";
import { Heading } from "./Heading";

export const Section = ({ children, title }) => {
	return (
		<SectionView>
			<Content>
				{title && (
					<TitleView>
						<Heading as="h3">{title}</Heading>
					</TitleView>
				)}
				{children}
			</Content>
		</SectionView>
	);
};

const SectionView = styled.div`
	padding: 15vh 0;
	border-bottom: 1px solid rgba(0, 0, 0, 0.15);
`;

const TitleView = styled.div`
	margin-bottom: 7.5vh;
	margin-top: -2.5vh;
`;

const Content = styled.div`
	margin: auto;
	max-width: 720px;
	padding: 0 15px;
`;
