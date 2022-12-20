import { Divider, Input, Row, Select, Space } from 'antd';
import * as React from 'react';

interface Params {
  builder: string;
  cell?: any;
  cellId?: string;
}

export const FakeData: React.FC<Params> = (props) => {
  const { cellId } = props;
  // console.log(cellId);
  const [defaultV, setDefault] = React.useState('default');

  React.useEffect(() => {
    const data = props.cell?.getData();
    console.log(cellId, data?.config?.theme, 'www');
    setDefault(data?.config?.theme || 'default');
  }, [cellId]);

  const handleChange = (value: string) => {
    props.cell?.setData({
      config: {
        theme: value,
      },
    });
    setDefault(value);
  };

  return (
    <Space direction="vertical">
      <Divider plain>Input</Divider>
      <Row>theme</Row>
      <Row>
        <Select
          value={defaultV}
          style={{ width: 120 }}
          onChange={handleChange}
          options={[
            {
              value: 'defalut',
              label: '默认',
            },
            {
              value: 'light',
              label: '明亮',
            },
            {
              value: 'dark',
              label: '暗色',
            },
          ]}
        />
      </Row>
    </Space>
  );
};
