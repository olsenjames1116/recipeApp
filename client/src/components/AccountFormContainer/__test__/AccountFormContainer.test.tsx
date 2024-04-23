import AccountFormContainer from '../AccountFormContainer';
import { render, screen } from '@testing-library/react';

describe('AccountFormContainer', () => {
	it('should render component', () => {
		render(<AccountFormContainer children={<div />} />);
		const accountFormContainer = screen.getByTestId('account-form-container');

		expect(accountFormContainer).toBeInTheDocument();
	});

	it('should render a child element', () => {
		render(<AccountFormContainer children={<div />} />);
		const accountFormContainer = screen.getByTestId('account-form-container');

		expect(accountFormContainer).toContainHTML('<div />');
	});
});
