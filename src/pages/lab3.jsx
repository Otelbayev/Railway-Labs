import { Button, Card, Col, Form, Input, Row } from "antd";
import React, { useState } from "react";

const letterValues = {
  A: 10,
  B: 12,
  C: 13,
  D: 14,
  E: 15,
  F: 16,
  G: 17,
  H: 18,
  I: 19,
  J: 20,
  K: 21,
  L: 23,
  M: 24,
  N: 25,
  O: 26,
  P: 27,
  Q: 28,
  R: 29,
  S: 30,
  T: 31,
  U: 32,
  V: 34,
  W: 35,
  X: 36,
  Y: 37,
  Z: 38,
};

const Lab3 = () => {
  const [result1, setResult1] = useState("");
  const [result2, setResult2] = useState("");
  const [form1] = Form.useForm();
  const [form2] = Form.useForm();

  const calculateMedium = (e) => {
    const input = e?.orta?.trim();

    if (!/^\d{8}$/.test(input)) {
      setResult1("Iltimos, faqat 8 ta raqam kiriting.");
      return;
    }

    const digits = input.split("").map(Number);
    let sum = 0;

    digits.forEach((digit, index) => {
      sum += digit * Math.pow(2, index);
    });

    const controlNumber = sum % 11;
    setResult1(`Nazorat raqami: ${controlNumber}`);
  };

  const calculateLarge = (e) => {
    const input = e?.katta?.trim();

    const match = input.match(/^([A-Z]{4})(\d{6})$/);
    if (!match) {
      setResult2("Xatolik Konteyner raqami noto'g'ri.");
      return;
    }

    const letters = match[1];
    const numbers = match[2];

    const letterValuesArray = letters
      .split("")
      .map((char) => letterValues[char]);
    if (letterValuesArray.includes(undefined)) {
      setResult2("Iltimos, faqat to'g'ri bosh harflarni kiriting.");
      return;
    }

    const digits = numbers.split("").map(Number);
    const combined = [...letterValuesArray, ...digits];

    let sum = 0;

    combined.forEach((value, index) => {
      sum += value * Math.pow(2, index);
    });

    const controlNumber = sum % 11;
    setResult2(`Nazorat raqami: ${controlNumber}`);
  };

  return (
    <Card title="Kontainer nazorat raqamini hisoblash">
      {["12345678", "67893456", "23487609", "87324623"].map((v, index) => (
        <Button
          style={{
            margin: "5px",
          }}
          onClick={() => form1.setFieldsValue({ orta: v })}
          key={index}
        >
          {v}
        </Button>
      ))}
      <Form layout="vertical" onFinish={calculateMedium} form={form1}>
        <Row gutter={[5, 5]}>
          <Col xs={24} md={20}>
            <Form.Item
              name="orta"
              label="O'rta tannarjli konteyner raqamini kiriting:"
              rules={[
                {
                  required: true,
                  message: "O'rta tannarjli konteyner raqamini kiriting!",
                },
              ]}
            >
              <Input
                placeholder="Masalan: 12345678"
                maxLength={8}
                minLength={8}
              />
            </Form.Item>
          </Col>
          <Col xs={24} md={4}>
            <Form.Item label=" ">
              <Button
                type="primary"
                htmlType="submit"
                style={{ width: "100%" }}
              >
                Topish
              </Button>
            </Form.Item>
          </Col>
        </Row>
      </Form>
      {result1 && <b>{result1}</b>}
      <hr style={{ margin: "20px 0" }} />
      {["CMAU765432", "MSCU123456", "CMAU400123"].map((v, index) => (
        <Button
          style={{
            margin: "5px",
          }}
          onClick={() => form2.setFieldsValue({ katta: v })}
          key={index}
        >
          {v}
        </Button>
      ))}
      <Form layout="vertical" onFinish={calculateLarge} form={form2}>
        <Row gutter={[5, 5]}>
          <Col xs={24} md={20}>
            <Form.Item
              name="katta"
              label="Katta tannarjli konteyner raqamini kiriting:"
              rules={[
                {
                  required: true,
                  message: "Katta tannarjli konteyner raqamini kiriting!",
                },
              ]}
            >
              <Input
                placeholder="Masalan: AAA123456"
                maxLength={10}
                minLength={10}
              />
            </Form.Item>
          </Col>
          <Col xs={24} md={4}>
            <Form.Item label=" ">
              <Button
                style={{ width: "100%" }}
                type="primary"
                htmlType="submit"
              >
                Topish
              </Button>
            </Form.Item>
          </Col>
        </Row>
      </Form>
      {result2 && <b>{result2}</b>}
    </Card>
  );
};

export default Lab3;

// import React, { useState } from "react";

// const Form = () => {

//   return (
//     <div className="container">
//       <h1>Konteyner Nazorat Raqamini Hisoblash</h1>

//       {/* O'rta tannarjli konteyner */}
//       <div className="section">
//         <h3>O'rta tannarjli konteyner</h3>
//         <label htmlFor="mediumContainer">
//           O'rta tannarjli konteyner raqamini kiriting:
//         </label>
//         <input
//           type="text"
//           id="mediumContainer"
//           value={mediumContainer}
//           onChange={(e) => setMediumContainer(e.target.value)}
//           placeholder="Masalan: 12345678"
//         />
//         <button type="button" onClick={calculateMedium}>
//           Nazorat raqamini topish
//         </button>
//       </div>

//       {/* Katta tannarjli konteyner */}
//       <div className="section">
//         <h3>Katta tannarjli konteyner</h3>
//         <label htmlFor="largeContainer">
//           Katta tannarjli konteyner raqamini kiriting:
//         </label>
//         <input
//           type="text"
//           id="largeContainer"
//           value={largeContainer}
//           onChange={(e) => setLargeContainer(e.target.value)}
//           placeholder="Masalan: ABCD123456"
//         />
//         <button type="button" onClick={calculateLarge}>
//           Nazorat raqamini topish
//         </button>
//       </div>

//       {/* Natija */}
//       <div id="result" className="result">
//         {result && <p>{result}</p>}
//       </div>
//     </div>
//   );
// };

// export default Form;
