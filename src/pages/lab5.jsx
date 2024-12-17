import { Button, Card, Col, Form, Input, Row } from "antd";
import React, { useState } from "react";

const StationCalculator = () => {
  const [formData, setFormData] = useState({
    commonRails: "",
    unusedRails: "",
    smallFreight: "",
    transitWagons: "",
    locomotiveChange: "",
    replacedLocomotives: "",
    passengerVehicles: "",
    localTransport: "",
    suburbanTransport: "",
    borderConnection: "",
  });

  const [results, setResults] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const calculate = () => {
    const {
      commonRails,
      unusedRails,
      smallFreight,
      transitWagons,
      locomotiveChange,
      replacedLocomotives,
      passengerVehicles,
      localTransport,
      suburbanTransport,
      borderConnection,
    } = formData;

    const commonRailsPoints = Math.floor(commonRails / 5) * 2;
    const unusedRailsPoints = Math.floor(unusedRails / 50) * 2;
    const smallFreightPoints = Math.floor(smallFreight / 5) * 2;
    const transitWagonsPoints = Math.floor(transitWagons / 50) * 2;
    const locomotivePoints = Math.floor(locomotiveChange / 10);
    const replacedLocomotivePoints = (replacedLocomotives / 100) * 0.05;
    const passengerVehiclesPoints = (passengerVehicles / 5) * 1.0;
    const localTransportPoints = (localTransport / 100) * 1.0;
    const suburbanTransportPoints = (suburbanTransport / 100) * 0.05;
    const borderConnectionPoints = borderConnection * 1;

    const totalPoints =
      commonRailsPoints +
      unusedRailsPoints +
      smallFreightPoints +
      transitWagonsPoints +
      locomotivePoints +
      replacedLocomotivePoints +
      passengerVehiclesPoints +
      localTransportPoints +
      suburbanTransportPoints +
      borderConnectionPoints;

    let stationClass = "";
    if (totalPoints > 75) {
      stationClass = "Vnеklassnaya";
    } else if (totalPoints > 30) {
      stationClass = "1-sinf";
    } else if (totalPoints > 14) {
      stationClass = "2-sinf";
    } else if (totalPoints > 6) {
      stationClass = "3-sinf";
    } else if (totalPoints > 1) {
      stationClass = "4-sinf";
    } else {
      stationClass = "5-sinf";
    }

    let stationType =
      smallFreight > 0
        ? "Yuk tashish stansiyasi"
        : "Yo‘lovchi tashish stansiyasi";

    setResults({
      totalPoints,
      stationClass,
      stationType,
      locomotivePoints,
      replacedLocomotivePoints,
      passengerVehiclesPoints,
      localTransportPoints,
      suburbanTransportPoints,
      borderConnectionPoints,
    });
  };

  return (
    <Card title="Stansiya sinifini aniqlash">
      <Form layout="vertical">
        <Row gutter={16}>
          <Col span={24} md={8}>
            <Form.Item
              label="Umumiy foydalanishdagi yo'llar (km)"
              name="commonRails"
              required
            >
              <Input
                type="number"
                id="commonRails"
                name="commonRails"
                value={formData.commonRails}
                onChange={handleChange}
                placeholder="Masalan, 100"
              />
            </Form.Item>
          </Col>

          <Col span={24} md={8}>
            <Form.Item
              label="Umumiy foydalanilmayan temiryo'llar (km)"
              name="unusedRails"
              required
            >
              <Input
                type="number"
                id="unusedRails"
                name="unusedRails"
                value={formData.unusedRails}
                onChange={handleChange}
                placeholder="Masalan, 50"
              />
            </Form.Item>
          </Col>

          <Col span={24} md={8}>
            <Form.Item label="Kichik yuklar soni" name="smallFreight" required>
              <Input
                type="number"
                id="smallFreight"
                name="smallFreight"
                value={formData.smallFreight}
                onChange={handleChange}
                placeholder="Masalan, 5"
              />
            </Form.Item>
          </Col>

          <Col span={24} md={8}>
            <Form.Item
              label="Tranzit vagonlar soni"
              name="transitWagons"
              required
            >
              <Input
                type="number"
                id="transitWagons"
                name="transitWagons"
                value={formData.transitWagons}
                onChange={handleChange}
                placeholder="Masalan, 50"
              />
            </Form.Item>
          </Col>

          <Col span={24} md={8}>
            <Form.Item
              label="Lokomotiv brigadalarining o'zgarishi (soni)"
              name="locomotiveChange"
              required
            >
              <Input
                type="number"
                id="locomotiveChange"
                name="locomotiveChange"
                value={formData.locomotiveChange}
                onChange={handleChange}
                placeholder="Masalan, 10"
              />
            </Form.Item>
          </Col>

          <Col span={24} md={8}>
            <Form.Item
              label="Almashtirilgan lokomotiv brigadalarining soni"
              name="replacedLocomotives"
              required
            >
              <Input
                type="number"
                id="replacedLocomotives"
                name="replacedLocomotives"
                value={formData.replacedLocomotives}
                onChange={handleChange}
                placeholder="Masalan, 100"
              />
            </Form.Item>
          </Col>

          <Col span={24} md={8}>
            <Form.Item
              label="Odamlarni tashish mashinalari (soni)"
              name="passengerVehicles"
              required
            >
              <Input
                type="number"
                id="passengerVehicles"
                name="passengerVehicles"
                value={formData.passengerVehicles}
                onChange={handleChange}
                placeholder="Masalan, 100"
              />
            </Form.Item>
          </Col>

          <Col span={24} md={8}>
            <Form.Item
              label="Mahalliy transport (soni)"
              name="localTransport"
              required
            >
              <Input
                type="number"
                id="localTransport"
                name="localTransport"
                value={formData.localTransport}
                onChange={handleChange}
                placeholder="Masalan, 100"
              />
            </Form.Item>
          </Col>

          <Col span={24} md={8}>
            <Form.Item
              label="Shahar atrofidagi transport (soni)"
              name="suburbanTransport"
              required
            >
              <Input
                type="number"
                id="suburbanTransport"
                name="suburbanTransport"
                value={formData.suburbanTransport}
                onChange={handleChange}
                placeholder="Masalan, 50"
              />
            </Form.Item>
          </Col>

          <Col span={24} md={8}>
            <Form.Item
              label="Davlatlar aro tutashuv punktlari (soni)"
              name="borderConnection"
              required
            >
              <Input
                type="number"
                id="borderConnection"
                name="borderConnection"
                value={formData.borderConnection}
                onChange={handleChange}
                placeholder="Masalan, 3"
              />
            </Form.Item>
          </Col>

          <Col span={24}>
            <Form.Item>
              <Button type="primary" onClick={calculate}>
                Hisoblash
              </Button>
            </Form.Item>
          </Col>
        </Row>
      </Form>

      {results && (
        <div style={{ fontSize: "16px" }}>
          <p>
            <b>Jami ballar:</b> {results.totalPoints.toFixed(2)}
          </p>
          <p>
            <b>Stansiya sinfi:</b> {results.stationClass}
          </p>
          <p>
            <b>Stansiya turi:</b> {results.stationType}
          </p>
          <p>
            <b>Lokomotiv brigadalarining o'zgarishi uchun ballar:</b>
            {results.locomotivePoints}
          </p>
          <p>
            <b>Almashtirilgan lokomotiv brigadalarining ballari:</b>
            {results.replacedLocomotivePoints.toFixed(2)}
          </p>
          <p>
            <b> Odamlarni tashish mashinalari uchun ballar:</b>
            {results.passengerVehiclesPoints.toFixed(2)}
          </p>
          <p>
            <b> Mahalliy transport uchun ballar:</b>
            {results.localTransportPoints.toFixed(2)}
          </p>
          <p>
            <b>Shahar atrofidagi transport uchun ballar:</b>
            {results.suburbanTransportPoints.toFixed(2)}
          </p>
          <p>
            <b>Davlatlar aro tutashuv punkti uchun ballar:</b>
            {results.borderConnectionPoints}
          </p>
        </div>
      )}
    </Card>
  );
};

export default StationCalculator;
