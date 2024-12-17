import {
  Button,
  Card,
  Col,
  Form,
  Input,
  InputNumber,
  message,
  Row,
} from "antd";
import React, { useState } from "react";

const VAGON_DATA_LIST = [
  {
    id: 1,
    birinchiUstun: [2],
    ikkinchiUstun: [0],
    uchinchiUstun: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
    oklarSoni: "4",
    vagonOgirligi: "24.2 tonna",
    vagonUzunligi: "15.35 m",
  },
  {
    id: 2,
    birinchiUstun: [2],
    ikkinchiUstun: [1, 3],
    uchinchiUstun: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
    oklarSoni: "4",
    vagonOgirligi: "23 tonna",
    vagonUzunligi: "14.73 m",
  },
  {
    id: 3,
    birinchiUstun: [2],
    ikkinchiUstun: [4, 5],
    uchinchiUstun: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
    oklarSoni: "4",
    vagonOgirligi: "24 tonna",
    vagonUzunligi: "14.73 m",
  },
  {
    id: 4,
    birinchiUstun: [2],
    ikkinchiUstun: [6, 7],
    uchinchiUstun: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
    oklarSoni: "4",
    vagonOgirligi: "26 tonna",
    vagonUzunligi: "15.35 m",
  },
  {
    id: 5,
    birinchiUstun: [2],
    ikkinchiUstun: [8],
    uchinchiUstun: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
    oklarSoni: "4",
    vagonOgirligi: "27 tonna",
    vagonUzunligi: "17.64 m",
  },
  {
    id: 6,
    birinchiUstun: [2],
    ikkinchiUstun: [9],
    uchinchiUstun: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
    oklarSoni: "8",
    vagonOgirligi: "29 tonna",
    vagonUzunligi: "18.8 m",
  },
  {
    id: 7,
    birinchiUstun: [3],
    ikkinchiUstun: [0],
    uchinchiUstun: [0, 1, 2, 3, 4],
    oklarSoni: "4",
    vagonOgirligi: "25 tonna",
    vagonUzunligi: "10 m",
  },
  {
    id: 8,
    birinchiUstun: [3],
    ikkinchiUstun: [0],
    uchinchiUstun: [5, 6, 7],
    oklarSoni: "4",
    vagonOgirligi: "23 tonna",
    vagonUzunligi: "10.87 m",
  },
];

const VAGON_TURI_LIST = [
  { id: 0, type: "Yo'lovchi" },
  { id: 1, type: "Lokomotiv" },
  { id: 2, type: "Kritiy" },
  { id: 3, type: "Spes" },
  { id: 4, type: "Platforma" },
  { id: 5, type: "Xususiy" },
  { id: 6, type: "Pol Vagon" },
  { id: 7, type: "Sisterna" },
  { id: 8, type: "Izotermik" },
  { id: 9, type: "Boshqa vagonlar" },
];

const arr = [
  2349857, 2439875, 2459874, 2459823, 2323948, 2349857, 2435096, 2430559,
];

const Lab2 = () => {
  const [vagonKodi, setVagonKodi] = useState("");
  const [model, setModel] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  const calculateControlNumber = (code) => {
    let summCode = 0;
    for (let i = 0; i < code.length; i++) {
      const mul = i % 2 === 0 ? 2 : 1;
      let a = parseInt(code[i], 10) * mul;
      if (a >= 10) {
        a = Math.floor(a / 10) + (a % 10);
      }
      summCode += a;
    }
    return 10 - (summCode % 10);
  };

  const getVagon = (c) => {
    const code = c.toString();
    const controlNumber = calculateControlNumber(code);
    const fullCode = code + controlNumber;

    const birinchiUstun = parseInt(fullCode[0], 10);
    const ikkinchiUstun = parseInt(fullCode[1], 10);
    const uchinchiUstun = parseInt(fullCode[2], 10);
    const otishYoli = parseInt(fullCode[6], 10);

    const result = VAGON_DATA_LIST.find(
      (vagon) =>
        vagon.birinchiUstun.includes(birinchiUstun) &&
        vagon.ikkinchiUstun.includes(ikkinchiUstun) &&
        vagon.uchinchiUstun.includes(uchinchiUstun)
    );

    if (result) {
      result.vagonOtuvchiYolBorligi =
        otishYoli === 0 ? "O'tish yo'li yo'q" : "O'tish yo'li bor";
      result.vagonTuri =
        VAGON_TURI_LIST.find((item) => item.id === birinchiUstun)?.type ||
        "Unknown";
      result.vagonKodi = fullCode;
      result.nazoratRaqami = controlNumber;
    }

    return result;
  };

  const onFinish = () => {
    const vagonModel = getVagon(vagonKodi);
    if (vagonModel) {
      setModel(vagonModel);
      setErrorMessage("");
    } else {
      setModel(null);
      setErrorMessage("Vagon ma'lumoti topilmadi");
    }
  };

  console.log(vagonKodi);

  return (
    <Card title="Vagon nazorat raqamini aniqlash">
      {arr.map((e, index) => (
        <Button
          style={{
            margin: "5px",
          }}
          key={index}
          onClick={() => setVagonKodi(e)}
        >
          {e}
        </Button>
      ))}
      <Form layout="vertical" onFinish={onFinish}>
        <Row gutter={[5, 5]}>
          <Col xs={24} md={20}>
            <Form.Item rules={[{ required: true, message: "Vagon raqami" }]}>
              <InputNumber
                placeholder="Vagon raqami"
                style={{ width: "100%" }}
                value={vagonKodi}
                onChange={(e) => setVagonKodi(e)}
                maxLength={7}
                minLength={7}
              />
            </Form.Item>
          </Col>
          <Col xs={24} md={4}>
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                style={{ width: "100%" }}
              >
                Qidirish
              </Button>
            </Form.Item>
          </Col>
        </Row>
      </Form>
      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
      {model && (
        <div style={{ fontSize: "14px" }}>
          <p>
            <b>Vagon Kodi:</b> {model.vagonKodi}
          </p>
          <p>
            <b>Nazorat Raqami:</b> {model.nazoratRaqami}
          </p>
          <p>
            <b>Vagon Turi:</b> {model.vagonTuri}
          </p>
          <p>
            <b>Vagon Uzunligi: </b>
            {model.vagonUzunligi}
          </p>
          <p>
            <b>Vagon Og'irligi:</b> {model.vagonOgirligi}
          </p>
          <p>
            <b>Oqlar Soni:</b> {model.oklarSoni}
          </p>
          <p>
            <b>O'tuvchi Yo'l:</b> {model.vagonOtuvchiYolBorligi}
          </p>
        </div>
      )}
    </Card>
  );
};

export default Lab2;
