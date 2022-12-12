import {User} from '../../src/users/models';

export const mockUser = (): User[] => {
	const users: User[] = [];
	//
	const user: User = {
		id: 1,
		email: 'kobe.bryant@laker.co',
		username: 'kobe bryant',
		phone: '+886912345678'
		,
	};
	users.push(user);
	return users;
};