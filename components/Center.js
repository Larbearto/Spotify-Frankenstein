import { ChevronDownIcon } from '@heroicons/react/outline'
import { signOut, useSession } from 'next-auth/react'
import { useState, useEffect } from 'react'
import { shuffle } from 'lodash'
import { useRecoilState, useRecoilValue } from 'recoil'
import { playlistIdState, playlistState } from '../atoms/playlistAtom'
import useSpotify from '../hooks/useSpotify'
import Songs from './Songs'

const colors = [
	'from-indigo-500',
	'from-green-500',
	'from-pink-500',
	'from-yellow-500',
	'from-purple-500',
	'from-red-500',
	'from-blue-500',
	'from-gray-500',
]
const colorsAvatar = [
	'bg-gradient-to-r from-green-200 via-green-400 to-green-500',
	'bg-gradient-to-r from-red-400 via-gray-300 to-blue-500',
	'bg-gradient-to-r from-purple-200 via-purple-400 to-purple-800',
	'bg-gradient-to-r from-gray-400 via-gray-600 to-blue-800',
	'bg-gradient-to-r from-rose-700 to-pink-600',
	'bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600',
	'bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600',
	'bg-gradient-to-r from-green-400 via-green-500 to-green-600',
]

function Center() {
	const { data: session } = useSession()
	const spotifyApi = useSpotify()
	const [color, setColor] = useState(null)
	const [colorAvatar, setColorAvatar] = useState(null)
	const playlistId = useRecoilValue(playlistIdState)
	const [playlist, setPlaylist] = useRecoilState(playlistState)

	console.log(playlistId)

	useEffect(() => {
		setColor(shuffle(colors).pop())
	}, [playlistId])

	useEffect(() => {
		setColorAvatar(shuffle(colorsAvatar).pop())
	}, [playlistId])

	useEffect(() => {
		spotifyApi
			.getPlaylist(playlistId)
			.then((data) => {
				setPlaylist(data.body)
			})
			.catch((err) => console.log('something went wrong!', err))
	}, [spotifyApi, playlistId])

	console.log(playlist)

	return (
		<div className='flex-grow h-screen overflow-y-scroll scrollbar-hide '>
			<header className='absolute top-5 right-8'>
				<div
					className={`flex items-center ${colorAvatar} space-x-3 opacity-90 hover:opacity-80 cursor-pointer rounded-full p-1 pr-2 text-white`}
					onClick={signOut}
				>
					<img
						className='rounded-full w-10 h-10'
						src={session?.user.image}
						alt=''
					/>
					<h2>{session?.user.name}</h2>
					<ChevronDownIcon className='h-5 w-5' />
				</div>
				<span>Jam With Me Feature coming soon!</span>
				<br />
				<span>Mood(Moodify)/Activity Feature coming soon!</span>
				<br />
				<span>
					Dropdown menu list for top artist playlist, most played etc.
				</span>
				<br />
				<span>send a jam</span>
				<br />
				<span>options for sorting your playlists</span>
				<br />
				<span> dashboard options for customization</span>
				<br />
				<span> Present and or Message a playlist</span>
			</header>

			<section
				className={`flex items-end space-x-7 bg-gradient-to-b to-black ${color} h-80 text-white p-8`}
			>
				<img
					className='h-44 w-44 shadow-2xl'
					src={playlist?.images?.[0]?.url}
					alt=''
				/>
				<div>
					<p>PLAYLIST</p>
					<h1 className='text-2xl md:text-3xl xl:text-5xl font-bold'>
						{playlist?.name}
					</h1>
				</div>
			</section>
			<div>
				<Songs />
			</div>
		</div>
	)
}

export default Center
