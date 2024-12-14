import React, { useState } from "react";
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
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { stations } from "../mock/stations";

const MapViewChanger = ({ center }) => {
  const map = useMap();
  React.useEffect(() => {
    map.flyTo(center, 13, {
      animate: true,
      duration: 1.5,
    });
  }, [center, map]);

  return null;
};

const App = () => {
  const [form] = Form.useForm();
  const [data, setData] = useState({
    id: 1,
    name: "Kungrad",
    code: "737209",
    type: "Uchastka",
    class: "Birinchi",
    lat: 43.040748,
    lng: 58.841385,
  });

  const onFinish = (e) => {
    const code = e.number;
    let summCode = 0;

    for (let i = 0; i < code.length; i++) {
      const a = parseInt(code[i], 10) * (i + 1);
      summCode += a;
    }

    let res = summCode % 11;

    if (res === 10) {
      summCode = 0;

      for (let i = 0; i < code.length; i++) {
        const a = parseInt(code[i], 10) * (i + 3);
        summCode += a;
      }

      res = summCode % 11;

      if (res === 10) {
        res = 0;
      }
    }

    const fullCode = code + res.toString();

    const station = stations.find((x) => x?.code === fullCode);

    if (!station) {
      message.error("Bu stansiya bazada mavjud emas!");
      return;
    }

    setData(station);
  };

  return (
    <Card title="Stansiya turini aniqlash">
      {stations.map((e) => (
        <Button
          key={e.id}
          onClick={() => form.setFieldsValue({ number: e.code.slice(0, 5) })}
          style={{
            margin: "5px",
          }}
        >
          {e.code.slice(0, 4)}
        </Button>
      ))}
      <Form layout="vertical" onFinish={onFinish} form={form}>
        <Row gutter={[5, 5]}>
          <Col xs={24} md={20}>
            <Form.Item
              name="number"
              rules={[{ required: true, message: "Stansiya raqami" }]}
            >
              <InputNumber
                placeholder="Stansiya raqami"
                style={{ width: "100%" }}
                maxLength={5}
                minLength={5}
                defaultValue={"73720"}
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
      <div
        style={{
          padding: "10px",
          fontSize: "18px",
        }}
      >
        <div>Stantsiya nomi: {data?.name}</div>
        <div>Stantsiya kod: {data?.code}</div>
        <div>Stantsiya klassi: {data?.class}</div>
        <div>Stantsiya turi: {data?.type} stansiyasi</div>
      </div>
      <div style={{ height: "400px", position: "relative", zIndex: 0 }}>
        <MapContainer
          center={[data?.lat, data?.lng]}
          zoom={13}
          style={{ height: "100%", width: "100%" }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          <MapViewChanger center={[data?.lat, data?.lng]} />
          <Marker position={[data?.lat, data?.lng]}>
            <Popup>{data?.name}</Popup>
          </Marker>
        </MapContainer>
      </div>
    </Card>
  );
};

export default App;
