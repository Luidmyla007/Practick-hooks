import { useEffect, useState } from 'react';
import { Loader } from '../Loader/Loader';
export const Modal = ({ image, closeAModal }) => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const closeModalOnEsc = e => {
      if (e.code === 'Escape') {
        closeAModal();
      }
    };
    window.addEventListener('keydown', closeModalOnEsc);
    return () => {
      window.removeEventListener('keydown', closeModalOnEsc);
    };
  }, [closeAModal]);

  const onLoad = () => {
    setLoaded(true);
    };
    

    
  return (
    <div className="Backdrop">
      <div className="Modal">
        <img
          src={`http://image.tmdb.org/t/p/original${image}`}
          alt="movies"
          width="400px"
          onLoad={onLoad}
          style={{ display: loaded ? 'block' : 'none' }}
        />
        {!loaded && <Loader />}
        {loaded && (
          <button type="button" onClick={() => closeAModal()}>
            Close
          </button>
        )}
      </div>
    </div>
  );
};