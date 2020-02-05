import React from "react";
import styled from "@emotion/styled";
import { Heading } from "./Heading";

export function Cover({ children = "My Site" }) {
	return (
		<CoverView>
			<Heading as="h1">{children}</Heading>
		</CoverView>
	);
}

const CoverView = styled.div`
	background-color: var(--wp-color-primary);
	color: var(--wp-color-primary-text);
	height: 90vh;
	max-height: 480px;
	align-items: center;
	display: flex;
	justify-content: center;
`;
