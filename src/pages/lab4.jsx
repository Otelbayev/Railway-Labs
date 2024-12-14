import { Card, Input, Table } from "antd";
import React, { useState } from "react";
import { createStyles } from "antd-style";
import { dataSource } from "../mock/loads";

const useStyle = createStyles(({ css, token }) => {
  const { antCls } = token;

  return {
    customTable: css`
      ${antCls}-table {
        ${antCls}-table-container {
          ${antCls}-table-body,
          ${antCls}-table-content {
            scrollbar-width: thin;
            scrollbar-color: #eaeaea transparent;
            scrollbar-gutter: stable;
          }
        }
      }
    `,
  };
});

const columns = [
  {
    title: "Kod",
    dataIndex: "kod",
    sorter: (a, b) => a.kod.localeCompare(b.kod),
    sortDirections: ["ascend", "descend", "ascend"],
  },
  {
    title: "Ism",
    dataIndex: "ism",
    sorter: (a, b) => a.ism.localeCompare(b.ism),
    sortDirections: ["ascend", "descend", "ascend"],
  },
  {
    title: "Xavfsizlik",
    dataIndex: "xavfsizlik",
    sorter: (a, b) => a.xavfsizlik.localeCompare(b.xavfsizlik),
    sortDirections: ["ascend", "descend", "ascend"],
  },
  {
    title: "Xavfli",
    dataIndex: "xavfli",
    sorter: (a, b) => a.xavfli.localeCompare(b.xavfli),
    sortDirections: ["ascend", "descend", "ascend"],
  },
  {
    title: "Sinf",
    dataIndex: "sinf",
    sorter: (a, b) => a.sinf.localeCompare(b.sinf),
    sortDirections: ["ascend", "descend", "ascend"],
  },
  {
    title: "MVN",
    dataIndex: "mvn",
    sorter: (a, b) => a.mvn.localeCompare(b.mvn),
    sortDirections: ["ascend", "descend", "ascend"],
  },
];
const Lab4 = () => {
  const [searchText, setSearchText] = useState("");
  const { styles } = useStyle();

  const filteredData = dataSource?.filter((item) =>
    Object.values(item).some((val) =>
      String(val).toLowerCase().includes(searchText.toLowerCase())
    )
  );

  return (
    <Card title="Yuk kodini aniqlash">
      <Input
        placeholder="Qidirish"
        style={{ marginBottom: "10px" }}
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
      />
      <Table
        className={styles.customTable}
        pagination={true}
        dataSource={filteredData}
        columns={columns}
        scroll={{
          x: "max-content",
        }}
        rowKey="id"
      />
    </Card>
  );
};

export default Lab4;
