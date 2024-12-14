import { Button, Card, Col, Form, InputNumber, message, Row } from "antd";
import React, { useState } from "react";
import { vagons } from "../mock/vagons";

const Lab2 = () => {
  const [form] = Form.useForm();
  const [data, setData] = useState();

  // Data for vagon models
  const vagonDataList = [
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

  // Data for vagon types
  const dataVagonTuri = [
    [0, "Yo'lovchi"],
    [1, "Lokomotiv"],
    [2, "Kritiy"],
    [3, "Spes"],
    [4, "Platforma"],
    [5, "Xususiy"],
    [6, "Pol Vagon"],
    [7, "Sisterna"],
    [8, "Izotermik"],
    [9, "Boshqa vagonlar"],
  ];

  // Function to get the vagon based on a code
  function getVagon(e) {
    const code = e.number;
    try {
      let summCode = 0;

      // Calculate the sum for the code
      for (let i = 0; i < code.length; i++) {
        let mul = i % 2 === 0 ? 2 : 1;
        let a = parseInt(code[i]) * mul;
        if (a >= 10) {
          const a1 = Math.floor(a / 10);
          a = a1 + (a % 10);
        }
        summCode += a;
      }

      const res = 10 - (summCode % 10);
      const fullCode = code + res.toString();

      const birinchiUstun = parseInt(fullCode[0]);
      const ikkinchiUstun = parseInt(fullCode[1]);
      const uchinchiUstun = parseInt(fullCode[2]);
      const otishYoli = parseInt(fullCode[6]);

      // Find the vagon based on the provided data
      const vagon = vagonDataList.find(
        (vagon) =>
          vagon.birinchiUstun.includes(birinchiUstun) &&
          vagon.ikkinchiUstun.includes(ikkinchiUstun) &&
          vagon.uchinchiUstun.includes(uchinchiUstun)
      );

      console.log(vagon);

      if (vagon) {
        // Set vagon's otishYoli status
        if (otishYoli === 0) {
          vagon.vagonOtuvchiYolBorligi = "O'tish yo'li yo'q";
        } else if (otishYoli >= 1 && otishYoli <= 9) {
          vagon.vagonOtuvchiYolBorligi = "O'tish yo'li bor";
        }

        // Set vagon type
        vagon.vagonTuri = dataVagonTuri.find(
          (item) => item[0] === birinchiUstun
        )?.[1];

        // Set vagon code and nazorat raqami
        vagon.vagonKodi = fullCode;
        vagon.nazoratRaqami = res;

        console.log(vagon);
        console.log(vagonDataList);
        console.log(fullCode);
      }
    } catch (error) {
      return null;
    }
  }

  const onFinish = (e) => {};

  return (
    <Card title="Vagon nazorat raqamini aniqlash">
      <Form layout="vertical" onFinish={getVagon} form={form}>
        <Row gutter={[5, 5]}>
          <Col xs={24} md={20}>
            <Form.Item
              name="number"
              rules={[{ required: true, message: "Vagon raqami" }]}
            >
              <InputNumber
                placeholder="Vagon raqami"
                style={{ width: "100%" }}
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

      {data && (
        <div className="mt-5">
          <p>
            <b>Vagon kodi:</b> {data?.vagonKodi}
          </p>
          <p>
            <b>Vagon turi:</b> {data?.vagonTuri}
          </p>
          <p>
            <b>Vagon uzunligi:</b> {data?.vagonUzunligi}
          </p>
          <p>
            <b>Vagon o'g'irligi:</b> {data?.vagonOgirligi}
          </p>
          <p>
            <b>Vagon otuvchi yol borligi:</b> {data?.vagonOtuvchiYolBorligi}
          </p>
        </div>
      )}
    </Card>
  );
};

export default Lab2;
