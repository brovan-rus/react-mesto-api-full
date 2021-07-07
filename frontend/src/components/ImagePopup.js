import Popup from "./Popup";

function ImagePopup({ card, onClose }) {
  return (
    <Popup isOpen={card.isOpened} onClose={onClose}>
      <img src={card.link} alt={card.name} className="popup__photo" />
      <h2 className="popup__title popup__title_content_photo">{card.name}</h2>
    </Popup>
  );
}

export default ImagePopup;
