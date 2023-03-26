import React, { Fragment, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Col, Input } from "antd";
import { RowForm } from "../card/index.syles";
import "../../../node_modules/react-credit-cards-2/lib/styles-compiled.css";
import Cards from "react-credit-cards-2";
import {
  formatCreditCardNumber,
  formatCVC,
  formatExpirationDate,
  formatName,
} from "./utils";

const Payment = () => {
  const { t } = useTranslation();
  const [landSelection, setLandSelection] = useState(" ");
  const [roomTypeSelection, setRoomTypeSelection] = useState(" ");

  const roomType = localStorage.getItem("roomType");
  const landSelect = localStorage.getItem("landSelection");

  useEffect(() => {
    setSelection(roomType, "roomType");
    setSelection(landSelect, "landSelection");
  }, [roomType, landSelect]);

  const setSelection = (value, type) => {
    let selection = " ";
    if (type == "roomType") {
      switch (value) {
        case "1":
          selection = t("form.standart");
          break;
        case "2":
          selection = t("form.deluxe");
          break;
        case "3":
          selection = t("form.suit");
          break;
        default:
          break;
      }
      setRoomTypeSelection(selection);
    } else {
      switch (value) {
        case "1":
          selection = t("form.land");
          break;
        case "2":
          selection = t("form.sea");
          break;
        default:
          break;
      }
      setLandSelection(selection);
    }
  };

  const [cardState, setCardState] = useState({
    number: "",
    expiry: "",
    cvc: "",
    name: "",
    focus: "",
  });

  const handleInputChange = (evt) => {
    const { name } = evt.target;
    let { value } = evt.target;
    console.log(name, value);

    if (name === "number") {
      value = formatCreditCardNumber(value);
      localStorage.setItem("creditCardNumber", value);
    } else if (name === "expiry") {
      value = formatExpirationDate(value);
      localStorage.setItem("creditCardExpiry", value);
    } else if (name === "cvc") {
      value = formatCVC(value);
      localStorage.setItem("creditCardCVC", value);
    } else if (name === "name") {
      value = formatName(value);
      localStorage.setItem("creditCardName", value);
    }

    setCardState((prev) => ({ ...prev, [name]: value }));
  };

  const handleInputFocus = (evt) => {
    setCardState((prev) => ({ ...prev, focus: evt.target.name }));
  };

  const handleCardNumberBlur = (evt) => {
    const { value } = evt.target;
    if (value.length > 16) {
      setCardState((prev) => ({ ...prev, number: value.slice(0, 16) }));
    }
  };
  return (
    <Fragment>
      <RowForm>
        <Col>
          <label htmlFor="check-in">
            {t("form.check-in-label")} : {localStorage.checkIn}
          </label>
          <label htmlFor="check-out">
            {t("form.check-out-label")} : {localStorage.checkOut}
          </label>
        </Col>
      </RowForm>
      <RowForm>
        <Col>
          <label htmlFor="room-type">
            {t("form.room-type")} : {roomTypeSelection}
          </label>
          <label htmlFor="land-selection">
            {t("form.land-selection")} : {landSelection}
          </label>
        </Col>
      </RowForm>
      <RowForm>
        <Col>
          <Cards
            number={cardState.number}
            expiry={cardState.expiry}
            cvc={cardState.cvc}
            name={cardState.name}
            focused={cardState.focus}
          />
        </Col>
      </RowForm>
      <RowForm>
        <Col span={24}>
          <Input
            type="text"
            name="name"
            placeholder="Name"
            value={cardState.name}
            required
            onChange={handleInputChange}
            onFocus={handleInputFocus}
          />
        </Col>
      </RowForm>
      <RowForm>
        <Col span={24}>
          <Input
            type="text"
            name="number"
            placeholder="Card Number"
            value={cardState.number}
            max-length="16"
            pattern="[\d| ]{16,19}"
            required
            onChange={handleInputChange}
            onFocus={handleInputFocus}
          />
        </Col>
      </RowForm>
      <RowForm>
        <Col span={12}>
          <Input
            type="text"
            name="expiry"
            placeholder="Expire Date"
            value={cardState.expiry}
            pattern="\d\d/\d\d"
            required
            onChange={handleInputChange}
            onFocus={handleInputFocus}
          />
        </Col>
        <Col span={12}>
          <Input
            type="text"
            name="cvc"
            placeholder="CCV"
            value={cardState.cvc}
            max-length="3"
            pattern="\d{3,4}"
            required
            onChange={handleInputChange}
            onFocus={handleInputFocus}
          />
        </Col>
      </RowForm>
    </Fragment>
  );
};

export default Payment;
