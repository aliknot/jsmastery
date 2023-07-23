'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { signOut, useSession, getProviders } from 'next-auth/react';
import SignIn from './SignIn';

const Nav = () => {
	const { data: session } = useSession();
	const [providers, setProviders] = useState(null);
	const [toggleDropDown, setToggleDropDown] = useState(false);

	useEffect(() => {
		const handleSetProviders = async () => {
			const response = await getProviders();

			setProviders(response);
		};

		handleSetProviders();
	}, []);

	return (
		<nav className='flex-between w-full mb-16 pt-3'>
			<Link href='/' className='flex gap-2 flex-center'>
				<Image src='assets/images/logo.svg' alt='logo' width={30} height={30} className='object-contain' />
				<p className='logo_text'>Promptopia</p>
			</Link>

			{/* Desktop Navigation */}
			<div className='sm:flex hidden'>
				{session?.user ? (
					<div className='flex gap-3 md:gap-5'>
						<Link href='/create-prompt' className='black_btn'>
							Create Post
						</Link>

						<button type='button' onClick={signOut} className='outline_btn'>
							Sign Out
						</button>

						<Link href='/profile'>
							<Image src='/assets/images/logo.svg' width={37} height={37} alt='profile' className='rounded-full' />
						</Link>
					</div>
				) : (
					<SignIn providers={providers} />
				)}
			</div>

			{/* Mobile Navigation */}
			<div className='sm:hidden flex relative'>
				{session?.user ? (
					<div className='flex'>
						<Image
							src='/assets/images/logo.svg'
							width={37}
							height={37}
							alt='profile'
							className='rounded-full cursor-pointer'
							onClick={() => setToggleDropDown((prevState) => !prevState)}
						/>

						{toggleDropDown ? (
							<div className='dropdown'>
								<Link href='/profile' className='dropdown_link' onClick={() => setToggleDropDown(false)}>
									My Profile
								</Link>
								<Link href='/create-prompt' className='dropdown_link' onClick={() => setToggleDropDown(false)}>
									Create Prompt
								</Link>
								<button
									type='button'
									onClick={() => {
										setToggleDropDown(false);
										signOut();
									}}
									className='mt-5 w-full black_btn'>
									Sign Out
								</button>
							</div>
						) : (
							<></>
						)}
					</div>
				) : (
					<SignIn providers={providers} />
				)}
			</div>
		</nav>
	);
};

export default Nav;
