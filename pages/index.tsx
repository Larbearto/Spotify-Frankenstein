import Head from "next/head";
import Image from "next/image";
import Sidebar from "../components/Sidebar";

const Home = () => {
	return (
		<div className="bg-black h-screen overflow-hidden">
			<Head>
				<title>Spotify</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<main>
				<Sidebar />
				{/* Center */}
			</main>
			<div>{/* Player */}</div>
		</div>
	);
};

export default Home;
