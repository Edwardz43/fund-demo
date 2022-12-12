/**
 * SignAgreementParameters objects represent the parameters from the request body.
 *
 * @example {
 *  "user_id": 1,
 *  "agreement_id" : 1
 * }
 */
export interface SignAgreementParameters {
	user_id: number;
	agreement_id: number;
}