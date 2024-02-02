import Card from 'react-bootstrap/Card';
import { FavoriteButton } from './Fav_nav';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './CardCarousel.css';
import athleteData from '../data/Athlete.json';
import { Carousel } from 'react-bootstrap';
import { Athlete, VideoListItemProps, EventDataItem} from './type';
import EventData from '../data/Event.json';

const allAthletesData = athleteData.Athlete.reduce((allAthletes: Athlete[], athletesArray: Athlete[]) => {
  return allAthletes.concat(athletesArray);
}, []);

const athleteVideosData = allAthletesData.map((athlete: Athlete) => {
  const allEventsData: EventDataItem[] = (EventData.Event.flat() as EventDataItem[]);


  const athleteEvents = allEventsData.filter((event: EventDataItem) => event.Athlete === athlete.Athlete);

  const videosForAthlete = athleteEvents.map((event: EventDataItem) => ({
    id: event.IdEvent.toString(),
    title: event.Athlete,
    subtitle: event.Epreuve,
    srcPhoto: athlete.Photo,
    description: event.Performance,
  }));

  return videosForAthlete;
}).flat();

function CardCarousel({ video }: VideoListItemProps) {
  const [isFavorited, setIsFavorited] = useState(false);
  const [favoriteButtonId] = useState(video.id);
  const navigate = useNavigate();

  useEffect(() => {
    const favoritesFromStorage = JSON.parse(localStorage.getItem('favorites') || '[]');
    setIsFavorited(favoritesFromStorage.includes(video.id));
  }, [video.id]);

  const handleImageClick = (imageName: string) => {
    console.log(`Image "${imageName}" cliquée !`);
  };

  const handlePlayClick = (id: string) => {
    console.log(`Image "${id}" cliquée !`);
    navigate('VideoPlayer', { state: { id: id } })
  };

  const handleFavoriteClick = () => {
    const updatedIsFavorited = !isFavorited;
    setIsFavorited(updatedIsFavorited);
    const favoritesFromStorage = JSON.parse(localStorage.getItem('favorites') || '[]');
    const updatedFavorites = updatedIsFavorited
      ? [...favoritesFromStorage, video.id]
      : favoritesFromStorage.filter((fav: string) => fav !== video.id);
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
  };

  return (
    <Card className="custom-card" style={{ width: '15rem' }}>
      <div className="image-container">
        <Card.Img className="custom-image" variant="top" src={video.srcPhoto}  />
        <div className='card_text'>
          <h4>{video.title}</h4>
          <p>{video.subtitle}</p>
        </div>
      </div>
      <img
        className="PlayButton"
        src="/bretons-1/img/Play_button.svg"
        alt="PlayButton"
        onClick={() => handlePlayClick(video.id)}
      />
      <img className={`overlay-image ${isFavorited ? 'saveyellow' : ''}`} src="/bretons-1/img/GoldMedal.png" alt="Overlay" />
      <Card.Body>
        <div className="image-row">
          <img
            className="BicycleLogo"
            src="/bretons-1/img/Bicycle_logo.svg"
            alt="Bicycle"
            onClick={() => handleImageClick('BicycleLogo')}
          />
          <FavoriteButton
            isFavorited={isFavorited}
            onClick={handleFavoriteClick}
            buttonId={favoriteButtonId}
          />
          <img
            className="ShareLogo"
            src="/bretons-1/img/Share_logo.svg"
            alt="Share"
            onClick={() => handleImageClick('ShareLogo')}
          />
        </div>
      </Card.Body>
    </Card>
  );
}

function ControlledCarousel() {
  const [videosData] = useState(athleteVideosData);

  return (
    <Carousel className="carousel_main" style={{ width: '15rem' }} indicators={true} controls={false}>
      {videosData.map(video => (
        <Carousel.Item key={video.id}>
          <CardCarousel key={video.id} video={video} />
        </Carousel.Item>
      ))}
    </Carousel>
  );
}

export default ControlledCarousel;