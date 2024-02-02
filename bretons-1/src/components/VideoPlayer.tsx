import './VideoPlayer.css';
import { useState, useEffect } from 'react';
import { Player } from "@remotion/player";
import { MyVideo } from "../remotion/Root";
import SwipeUp from './SwipeUp';
import Video from '../type/Video';
import Article from './Article';

function VideoPlayer(video: Video) {

  const [allowSwipe, setAllowSwipe] = useState(false);

  // set 
  useEffect(() => {
    const timer = setTimeout(() => {
      setAllowSwipe(true);
    }, 6000); // 6 seconds

    return () => clearTimeout(timer); // clear the timer 
  }, []); // An empty dependency array means that this effect will only run once when the component is loaded.

  const handleSwipeUp = () => {
    if (allowSwipe) {  
    }
  };
  
  return (
    <div id='VideoPlayer'>
        <div className='headerPlayer'>
            <img src="/bretons-1/img/logo_telegram_banc.svg" alt='Logo' />
        </div>
        <Player
            component={MyVideo}
            inputProps={{ text: "Malo" }}
            durationInFrames={1000}
            compositionWidth={1080}
            compositionHeight={1920}
            fps={60}
            style={{ width: "100%", height: "100%", position: "absolute", top: "0%" }}
            controls
        />
        {video.article ? (
            <div className='boutonRetour'><span>Retour</span></div>
        ) : (
          allowSwipe &&(
            <SwipeUp onSwipeUp={handleSwipeUp} />
          )
        )}
        {//Here is a example, need to change to video.article.
        <Article 
          title="Sounkamba Sylla, médaillée d’or ! "
          subtitle="Athlétisme : 400m" 
          content="A moins d’un an des Jeux Olympiques de Paris 2024, le sport français s’organise pour répondre présent. Si pour les stars tricolores, la voie est toute tracée pour représenter la France, pour certains athlètes, la tâche est plus complexe. En Mayenne, la spécialiste du 400 mètres Sounkamba Sylla a décidé de tout sacrifier pour réaliser son rêve olympique."
        />
}
    </div>
  );
}

export default VideoPlayer;
