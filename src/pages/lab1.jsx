import { Button, Card, Col, Input, Row, Select } from "antd";
import React, { useState } from "react";
import { RiAiGenerate } from "react-icons/ri";
import { vagonNazoratBelgisi } from "../hooks/useVagonNazoratBelgisi";
import { stansiyaNazoratBelgisi } from "../hooks/useStansiyaNazoratBelgisi";

const vagonRaqamlari = [
  { value: 1, label: 2412437 },
  { value: 2, label: 1234567 },
  { value: 3, label: 9876543 },
  { value: 4, label: 3456789 },
  { value: 5, label: 5678901 },
  { value: 6, label: 2233445 },
  { value: 7, label: 5566778 },
  { value: 8, label: 1122334 },
  { value: 9, label: 4455667 },
  { value: 10, label: 6789012 },
];

const stansiyaKodlari = [
  { value: 1, label: 72000 },
  { value: 2, label: "" },
  { value: 3, label:""  },
  { value: 4, label: "" },
  { value: 5, label: "" },
];

const Lab1 = () => {
  const [type, setType] = useState("1");
  const [code, setCode] = useState(1);
  const [result, setResult] = useState(null);

  const generate = () => {
    if (type === "1") {
      const res = vagonNazoratBelgisi(
        vagonRaqamlari.find((i) => i.value === code).label
      );
      setResult(res);
    } else {
      const res = stansiyaNazoratBelgisi(2442137);

      setResult(res);
    }
  };

  return (
    <div>
      <Card title="Vagon va Stansiy nazorat belgilarini aniqlash">
        <Row gutter={16}>
          <Col span={4}>
            <Select
              size="large"
              options={[
                { value: "1", label: "Vagon" },
                { value: "2", label: "Stansiya" },
              ]}
              value={type}
              onChange={(value) => setType(value)}
              style={{ width: "100%" }}
            />
          </Col>
          <Col span={4}>
            <Select
              size="large"
              //   placeholder={`${type === "1" ? "Vagon" : "Stansiya"} kodi`}
              options={type === "1" ? vagonRaqamlari : stansiyaKodlari}
              value={code}
              onChange={(e) => setCode(e)}
              style={{ width: "100%" }}
            />
          </Col>
          <Col span={4}>
            <Button
              onClick={generate}
              style={{ width: "100%" }}
              size="large"
              type="primary"
            >
              <RiAiGenerate size={20} /> Submit
            </Button>
          </Col>
          <Col span={4}>
            <Input
              size="large"
              value={`${result}`}
              style={{ width: "100%" }}
              disabled
            />
          </Col>
        </Row>
      </Card>
    </div>
  );
};

export default Lab1;

// class Station:
//     def __init__(self, number, name):
//         self.number = number
//         self.name = name

// def stansiya_qidirish(stations, search_number):
//     for station in stations:
//         if station.number == search_number:
//             return station
//     return None

// def main():
//     while True:
//         stations = [
//             Station(722805, "Akcha"),
//             Station(722608, "Angren"),
//             Station(723009, "Ohangaron"),
//             Station(721802, "Barraj")
//         ]

//         input_number = int(input("Stansiya kodini kiriting: "))

//         use_input_number = input_number
//         i = 5
//         sum = 0

//         while use_input_number != 0:
//             cur_num = use_input_number % 10
//             sum += cur_num * i
//             i -= 1
//             use_input_number //= 10

//         print(f"Dastlabki hisoblangan yig'indi: {sum}")

//         sixth_num = sum % 11
//         print(f"Dastlabki tanlab olingan 6-raqam: {sixth_num}")

//         if sixth_num == 10:
//             print("Dastlabki olingan 6-raqam 10 bo'lganligi sababli boshqattan tanlaymiz:")

//             i = 5
//             sum = 0
//             use_input_number = input_number

//             while use_input_number != 0:
//                 cur_num = use_input_number % 10
//                 sum += cur_num * (i + 2)
//                 i -= 1
//                 use_input_number //= 10

//             print(f"Keyingi shart asosida hisoblangan yig'indi: {sum}")

//             sixth_num = sum % 11
//             print(f"Keyingi tanlab olingan 6-raqam: {sixth_num}")

//         found_number = input_number * 10 + sixth_num
//         print(f"Topilgan stansiya raqami: {found_number}")

//         found_station = stansiya_qidirish(stations, found_number)

//         if found_station:
//             print(f"Stansiya topildi, nomi: {found_station.name}")
//         else:
//             print(f"Ushbu {found_number} raqam uchun stansiya bazada mavjud emas")

//         print()

// if __name__ == "__main__":
//     main()
