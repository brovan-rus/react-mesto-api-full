import Popup from "./Popup";
import success from "../images/success.svg";
import fail from "../images/problem.svg";

function InfoTooltip({ isOpen, onClose, isSuccess }) {
  return (
    <Popup isOpen={isOpen} onClose={onClose} content="message">
      <img
        className="info-tool__image"
        src={isSuccess ? success : fail}
        alt={"Иконка, обозначающая успех или провал действия"}
      />
      <h2 className="info-tool__title">
        {isSuccess
          ? "Вы успешно зарегистрировались!"
          : "Что-то пошло не так!\n" + "Попробуйте ещё раз."}
      </h2>
    </Popup>
  );
}

export default InfoTooltip;
