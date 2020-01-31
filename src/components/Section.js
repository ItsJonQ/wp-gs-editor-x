import React from "react";
import styled from "@emotion/styled";

export const Section = ({ children, title }) => {
	return (
		<SectionView>
			{title && <TitleView>{title}</TitleView>}
			{children}
		</SectionView>
	);
};

const SectionView = styled.div`
	margin: 40px 0 80px;
`;

const TitleView = styled.div`
	font-size: 16px;
	font-weight: bold;
	margin-bottom: 24px;
`;
