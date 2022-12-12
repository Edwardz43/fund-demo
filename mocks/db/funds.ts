import {Currency, Fund, FundType} from '../../src/funds/model';

export const mockFunds = (): Fund[] => {
	const funds: Fund[] = [];
	for (let i = 0; i < 3; i++) {
		const fund: Fund = {
			id: i + 1,
			name: 'FUND' + i.toString().padStart(2, '0'),
			f_type: FundType.A,
			currency: Currency[Currency.USD],
			nav: 35.43,
			fee: 1.5,
			prospectus: 'some announcement here',
		};
		funds.push(fund);
	}
	return funds;
};