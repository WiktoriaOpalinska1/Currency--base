
/* eslint-disable jest/no-conditional-expect */
// testy integracyjne
import ResultBox from './ResultBox';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

describe('Component ResultBox', () => {
    it('should render without crashing', () => {
		const testCases = [
			{ amount: 100, from: 'PLN', to: 'USD' },
			{ amount: 20, from: 'USD', to: 'PLN' },
			{ amount: 200, from: 'PLN', to: 'USD' },
			{ amount: 345, from: 'USD', to: 'PLN' },
		];

		for (let testObj of testCases) {
			render(
				<ResultBox from={testObj.from} to={testObj.to} amount={testObj.amount}/>);
		}
	});
	it('should render proper info about conversion when PLN -> USD', () => {
		render(<ResultBox from='PLN' to='USD' amount={100} />);

		const output = screen.getByTestId('output');
		expect(output).toHaveTextContent('PLN 100.00 = $28.57');
	});
    it('should render proper info about conversion when USD -> PLN', () => {
		render(<ResultBox from='USD' to='PLN' amount={100} />);

		const output = screen.getByTestId('output');
		expect(output).toHaveTextContent('$100.00 = PLN 350.00');
	});
    it('should render same values when from equals to', () => {
		const testCases = [
			{ amount: 100, from: 'PLN', to: 'PLN' },
			{ amount: 20, from: 'PLN', to: 'PLN' },
			{ amount: 200, from: 'USD', to: 'USD' },
			{ amount: 345, from: 'USD', to: 'USD' },
		];
        for (let testObj of testCases) {
			render(
				<ResultBox from={testObj.from} to={testObj.to} amount={testObj.amount}/>);
            if (testObj.from === testObj.to === 'PLN'){
                const output = screen.getByTestId('output');
                expect(output).toHaveTextContent('PLN ' + testObj.amount + ' = PLN ' + testObj.amount);
            };
            if (testObj.from === testObj.to === 'USD'){
                const output = screen.getByTestId('output');
                expect(output).toHaveTextContent('$' + testObj.amount + ' = PLN' + testObj.amount);
            }
        };
	});
    it('should render proper info when value is lower than 0', () => {
        render(<ResultBox from='PLN' to='USD' amount={-100} />);
        const output = screen.getByTestId('output');
        expect(output).toHaveTextContent('Wrong value...');
    });
});