import React from "react";
import { css } from "@emotion/core";
import styled from "@emotion/styled";

export function Button() {
	return (
		<>
			<ButtonView>Button (Filled)</ButtonView>
			<ButtonView isOutlined>Button (Outlined)</ButtonView>
		</>
	);
}

const outlined = ({ isOutlined }) => {
	if (!isOutlined) return "";

	return css`
		background-color: transparent;
		border: 2px solid var(--wp-color-primary);
		color: var(--wp-color-primary);
	`;
};

const ButtonView = styled.button`
	background-color: var(--wp-color-primary);
	border-radius: 28px;
	border: none;
	box-shadow: none;
	color: var(--wp-color-primary-text);
	cursor: pointer;
	display: inline-block;
	font-size: inherit;
	margin: 0 10px 10px 0;
	outline: none;
	overflow-wrap: break-word;
	padding: 12px 24px;
	text-align: center;
	text-decoration: none;

	${outlined};
`;
