import happyCat from './assets/happy-cat-cat.gif';
import audioFile from './assets/happyCat.mp3';

function HappyCatImage({ isRotating, catStyle, onCatClick }) {
  const playAudio = () => {
    const audio = new Audio(audioFile);
    audio.play();
  };

  return (
    <img
      src={happyCat}
      className={`happy cat ${isRotating ? 'rotate' : ''}`}
      style={catStyle}
      alt="Happy Cat logo"
      onClick={() => {
        playAudio();
        onCatClick();
      }}
    />
  );
}

export default HappyCatImage;
