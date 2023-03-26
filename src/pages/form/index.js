import React, { Fragment, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Col, DatePicker } from "antd";
import { RowForm } from "../card/index.syles";
import moment from "moment";

const FormComponent = (props) => {
  const { t } = useTranslation();
  const [checkInDate, setCheckInDate] = useState(null);
  const [checkOutDate, setCheckOutDate] = useState(null);
  const [checkOutDisabledDate, setCheckOutDisabledDate] = useState(null);

  function handleCheckInChange(date, dateString) {
    setCheckInDate(dateString);
    console.log(checkInDate);
  }

  function handleCheckOutChange(date, dateString) {
    setCheckOutDate(dateString);
    console.log(checkOutDate);
  }

  // bugünden önceki tarihleri seçmeyi engelle
  function disabledDate(current) {
    return current && current < moment().startOf("day");
  }

  useEffect(() => {
    localStorage.setItem("checkIn", checkInDate);
  }, [checkInDate]);

  useEffect(() => {
    localStorage.setItem("checkOut", checkOutDate);
  }, [checkOutDate]);

  useEffect(() => {
    setCheckOutDisabledDate((current) => {
      if (checkInDate) {
        return (date) =>
          date && date.isBefore(moment(checkInDate).startOf("day"));
      } else {
        return (date) => date && date.isBefore(moment().startOf("day"));
      }
    });
  }, [checkInDate]);

  return (
    <Fragment>
      <RowForm>
        <Col span={5}>
          <label htmlFor="check-in">{t("form.check-in-label")}</label>
        </Col>
        <Col span={19}>
          <DatePicker
            id="check-in"
            name="check-in"
            onChange={handleCheckInChange}
            disabledDate={disabledDate}
          />
        </Col>
      </RowForm>
      <RowForm>
        <Col span={5}>
          <label htmlFor="check-out">{t("form.check-out-label")}</label>
        </Col>
        <Col span={19}>
          <DatePicker
            id="check-out"
            name="check-out"
            onChange={handleCheckOutChange}
            disabled={!checkInDate}
            disabledDate={checkOutDisabledDate}
          />
        </Col>
      </RowForm>
    </Fragment>
  );
};

export default FormComponent;
