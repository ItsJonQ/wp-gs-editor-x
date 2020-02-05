import styled from "@emotion/styled";

export const Text = styled.span`
	margin: 0;
	padding: 0;

	text-align: var(--wp-font-text-align);

	h1& {
		font-size: var(--wp-font-size-h1);
	}
	h2& {
		font-size: var(--wp-font-size-h2);
	}
	h3& {
		font-size: var(--wp-font-size-h3);
	}
	h4& {
		font-size: var(--wp-font-size-h4);
	}
	h5& {
		font-size: var(--wp-font-size-h5);
	}
	h6& {
		font-size: var(--wp-font-size-h6);
	}
	p& {
		font-size: var(--wp-font-size);
	}
	h1&,
	h2&,
	h3&,
	h4&,
	h5&,
	h6& {
		line-height: var(--wp-font-title-line-height);
	}
	p& {
		line-height: var(--wp-font-line-height);
	}
`;
