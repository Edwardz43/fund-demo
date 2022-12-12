/**
 * User objects represents the user info used for registration.
 */
export interface User {
	/**
	 * The id of the user
	 */
	id: number;
	/**
	 * The username of the user
	 */
	username: string;
	/**
	 * The email of the user
	 */
	email: string;
	/**
	 * The phone number of the user
	 */
	phone: string;

	password?: string;
}

// export interface GetUserResponse {
// 	data?: User;
// 	error?: string;
// }

/**
 * UserCreationParams objects represent the parameters of the user create endpoint.
 *
 * @example {
 *  "username": "John Doe",
 *  "email" : "johndoe@example.com",
 *  "phone" : "886912345678",
 *  "password" : "asdf1234"
 * }
 */
export interface UserCreationParams {
	/**
	 * The name the user used to register his account
	 */
	username: string;
	/**
	 * The email the user used to register his account
	 */
	email: string;
	/**
	 * The password the user used to register his account
	 */
	password: string;
	/**
	 * The phone number the user used to register his account
	 */
	phone: string;
}


/**
 * UserLoginParams objects represent the response with jwt token.
 *
 * @example {
 *  "username": "John Doe",
 *  "email" : "johndoe@example.com",
 *  "password" : "asdf1234"
 * }
 */
export interface UserLoginParams {
	/**
	 * The username of a specific user for login.
	 */
	username: string;
	/**
	 * The email of a specific user for login.
	 */
	email: string;
	/**
	 * The password of a specific user for login.
	 */
	password: string;
}

/**
 * UserLoginResponse objects represent the response with jwt token if login success.
 * Error message will display if login failed.
 */
export interface UserLoginResponse {
	/**
	 * JWT token is login success.
	 */
	token?: string;
	/**
	 * error message if login failed.
	 */
	error?: string;
}


/**
 * UserCreationResponse objects represent the response of the result of creation.
 *
 * @example {
 *  "success": true,
 *  "id" : 1,
 *  accountId : "asdf1234567890",
 * }
 */
export interface UserCreationResponse {
	/**
	 * Creation success flag.
	 */
	success?: boolean;
	/**
	 * User ID
	 */
	id?: number;
	/**
	 * Account ID
	 */
	accountId?: string;
	/**
	 * Error message if creation failed.
	 */
	error?: string;
}