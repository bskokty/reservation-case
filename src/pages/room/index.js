import React, { Fragment, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Col, Radio } from "antd";
import { RowForm } from "../card/index.syles";

const Room = () => {
  const { t } = useTranslation();
  const [roomType, setRoomType] = useState(1);
  const [landSelection, setLandSelection] = useState(1);

  function onChangeRoomType(e) {
    setRoomType(e.target.value);
  }

  function onChangeLandSelection(e) {
    setLandSelection(e.target.value);
  }

  useEffect(() => {
    localStorage.landSelection = landSelection;
  }, [landSelection]);

  useEffect(() => {
    localStorage.roomType = roomType;
  }, [roomType]);

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
        <Col span={4}>{t("form.room-type")}</Col>
        <Col span={20}>
          <Radio.Group
            name="radioGroupRoomType"
            defaultValue={1}
            onChange={onChangeRoomType}
          >
            <Radio value={1}>{t("form.standart")}</Radio>
            <Radio value={2}>{t("form.delux")}</Radio>
            <Radio value={3}>{t("form.suit")}</Radio>
          </Radio.Group>
        </Col>
      </RowForm>
      <RowForm>
        <Col span={4}>{t("form.landscape-selection")}</Col>
        <Col span={20}>
          <Radio.Group
            name="radioGroupType"
            defaultValue={1}
            onChange={onChangeLandSelection}
          >
            <Radio value={1}>{t("form.land")}</Radio>
            <Radio value={2}>{t("form.sea")}</Radio>
          </Radio.Group>
        </Col>
      </RowForm>
    </Fragment>
  );
};

export default Room;
