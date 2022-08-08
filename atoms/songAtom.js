import { atom } from 'recoil'

export const currentTrackIdState = atom({
	key: 'currentTrackIdState', // unique ID with respect to the other atoms/selectors
	default: null,
})

export const isPlayingState = atom({
	key: 'isPlayingState', // whether a track is currently playing
	default: false,
})
