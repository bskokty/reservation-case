import { useTranslation } from "react-i18next";
import "../i18n";
import Form from "./form";
import { Row, Col, Button, Card, Modal } from "antd";
import { TabsContainer, ButtonContainer, RowForm } from "./card/index.syles";
import { useState, useEffect } from "react";
import Room from "./room";
import Payment from "./payment";

export default function Home() {
  const { t, i18n } = useTranslation();
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [openSucsess, setOpenSucsess] = useState(false);

  // const dispatch = useDispatch();
  /* const isTab1Disabled = useSelector(state => state.disabledTabs.tab1);
  const isTab2Disabled = useSelector(state => state.disabledTabs.tab2);
  const isTab3Disabled = useSelector(state => state.disabledTabs.tab3);
  const activekey      = useSelector(state => state.disabledTabs.activekey);*/

  const [activekey, setActivekey] = useState("1");

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  const onChange = (key) => {
    setActivekey(key);
  };

  const onChangeButton = (type) => {
    let controlTab = true;
    if (activekey === "1") {
      controlTab =
        localStorage.getItem("checkIn") != undefined &&
        localStorage.getItem("checkOut") != undefined &&
        localStorage.getItem("checkIn") != "null" &&
        localStorage.getItem("checkOut") != "null"
          ? true
          : false;
    } else if (activekey === "2") {
      controlTab =
        localStorage.getItem("landSelection") != undefined &&
        localStorage.getItem("roomType") != undefined &&
        localStorage.getItem("landSelection") != "null" &&
        localStorage.getItem("roomType") != "null"
          ? true
          : false;
    }

    if (controlTab) {
      const tabKey =
        type === "prev" ? Number(activekey) - 1 : Number(activekey) + 1;
      setActivekey(tabKey.toString());
    }
    if (!controlTab) {
      setOpen(true);
    }
  };

  const onChangePaymentButton = () => {
    localStorage.getItem("creditCardNumber") != undefined &&
    localStorage.getItem("creditCardExpiry") != undefined &&
    localStorage.getItem("creditCardCVC") != undefined &&
    localStorage.getItem("creditCardName") != undefined &&
    localStorage.getItem("creditCardNumber") != "null" &&
    localStorage.getItem("creditCardExpiry") != "null" &&
    localStorage.getItem("creditCardCVC") != "null" &&
    localStorage.getItem("creditCardName") != "null"
      ? setOpenSucsess(true)
      : setOpen(true);
  };

  const handleOk = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setOpen(false);
    }, 3000);
  };
  const handleCancel = () => {
    setOpen(false);
  };

  const items = [
    {
      key: "1",
      label: `Tarih`,
      children: <Form activeKey={activekey} />,
      disabled: activekey != 1,
    },
    {
      key: "2",
      label: `Oda`,
      children: <Room />,
      disabled: activekey != 2,
    },
    {
      key: "3",
      label: `Ödeme`,
      children: <Payment />,
      disabled: activekey != 3,
    },
  ];

  return (
    <div>
      <Button onClick={() => changeLanguage("en")}>English</Button>
      <Button onClick={() => changeLanguage("tr")}>Türkçe</Button>

      <Row>
        <Col span={7}> </Col>
        <Col span={10}>
          <Card bordered={false}>
            <TabsContainer
              activeKey={activekey}
              items={items}
              onChange={onChange}
            />
            <RowForm>
              <Col span={12}>
                {activekey !== "1" && (
                  <ButtonContainer
                    type="primary"
                    htmlType="submit"
                    block
                    onClick={() => onChangeButton("prev")}
                  >
                    Geri
                  </ButtonContainer>
                )}
              </Col>
              <Col span={12}>
                {activekey !== "3" ? (
                  <ButtonContainer
                    type="primary"
                    htmlType="submit"
                    block
                    onClick={() => onChangeButton("next")}
                  >
                    İleri
                  </ButtonContainer>
                ) : (
                  <ButtonContainer
                    type="primary"
                    htmlType="submit"
                    block
                    onClick={() => onChangePaymentButton("next")}
                  >
                    Ödeme Yap
                  </ButtonContainer>
                )}
              </Col>
            </RowForm>
          </Card>
        </Col>
        <Col span={7}></Col>
      </Row>

      <Modal
        open={open}
        title="WARNING"
        onCancel={handleCancel}
        footer={[
          <Button key="back" onClick={handleCancel}>
            OK
          </Button>,
        ]}
      >
        <p>Tüm değerleri eksiksiz doldurduğunuzdan emin olun.</p>
      </Modal>

      <Modal
        open={openSucsess}
        title="Sucsess"
        onCancel={() => setOpenSucsess(false)}
        footer={[
          <Button key="back" onClick={() => setOpenSucsess(false)}>
            OK
          </Button>,
        ]}
      >
        <p>Rezervasyonunuz başarı ile tamamlanmıştır </p>
      </Modal>
    </div>
  );
}
