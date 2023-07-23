import { signIn } from 'next-auth/react';

const SignIn = ({ providers }) => {
	if (!providers) return <></>;

	const {
		google: { id, name },
	} = providers;

	return (
		<button key={name} type='button' onClick={() => signIn(id)} className='black_btn'>
			Sign In
		</button>
	);
};

export default SignIn;
