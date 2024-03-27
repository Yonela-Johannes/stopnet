import { Link } from 'react-router-dom';
import Navbar from '../components/navigation/navbar';
import PageWrapper from './page-wrapper';
import NormalButton from '../components/utils/buttons/normal-button';
import Chat from '../assets/chat.png';

const HomePage = () => {

  const ImageCard = (props) => (
    <div className='image-card'>
      <header className="text-center mb-2">
        <h3 className="text-white font-bold text-1xl">{props.title}</h3>
      </header>
      <img className="w-[340px] inline" src={props.src} alt="Chat" />
      <footer className='text-center mt-2'>
        <div className="secondary">{props.children}</div>
      </footer>
    </div>
  );

  return (
    <PageWrapper
      className="z-10 bg-bg-tertiary h-full relative"
      pageTitle="acrd.app | Messaging Made Simple">
      <Navbar />
      <section className="z-10 text-center my-4">
        <h1>It's time to ditch Discord and Zoom.</h1>
        <div className="flex justify-center">
          <div className="lead font-light mt-2 max-w-xl">
            All-in-one easy-to-use text and voice chat.
            Stop paying for Discord boosts and hassling with Zoom.
          </div>
        </div>
        <div className="p-7 py-9 h-screen md:h-[83vh] md:flex relative">
        <div className="flex flex-col gap-7 md:max-w-md lg:max-w-none lg:justify-center ">
          <h1 className="text-5xl text-black font-bold">Your place to talk</h1>
          <h2 className="text-black text-lg font-light tracking-wide lg:max-w-3xl w-full">
            Whether you’re part of a school club, gaming group, worldwide art
            community, or just a handful of friends that want to spend time
            together, Discord makes it easy to talk every day and hang out more
            often.
          </h2>
          <div className="flex flex-col sm:flex-row md:flex-col lg:flex-row md:items-start sm:items-center gap-6">
            <button className="bg-white w-60 font-medium flex items-center justify-center rounded-full p-4 text-lg hover:shadow-2xl hover:text-discord_blurple focus:outline-none transition duration-200 ease-in-out">
              Sign in
            </button>
            <button className="bg-gray-900 text-white w-72 font-medium flex items-center justify-center rounded-full p-4 text-lg hover:shadow-2xl hover:bg-gray-800 focus:outline-none transition duration-200 ease-in-out">
              Continue to rooms
            </button>
          </div>
        </div>
        <section
          title="*Description may represent unreleased features.*"
          className="">
          <ImageCard src={Chat} title="Chat Made Simple">
            Accord focuses on just the practical features for a simple messaging solution.
          </ImageCard>
        </section>

      </div>
      </section>


      <footer className="fixed bottom-0 w-full">
        <p
          className="float-right p-2"
          target="none">
          <strong className="heading">Stop</strong>
          <span className="primary">net</span>
        </p>
      </footer>
    </PageWrapper>
  );
}

export default HomePage;