export enum FundType {
	A = 'A',
	B = 'B',
	C = 'C'
}

export enum Currency {
	NTD = 'NTD',
	USD = 'USD',
	EUD = 'EUD'
}

export interface Fund {
	id: number;
	name: string;
	nav: number;
	fee: number;
	f_type: FundType;
	prospectus: string;
	currency: Currency;
}