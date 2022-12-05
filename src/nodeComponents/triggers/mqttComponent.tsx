import { Input, Row, Select, Space } from 'antd';
import * as React from 'react';

interface Params {
  builder: string;
  cell?: any;
  cellId?: string;
}
const { Option } = Select;
const BrokerData = ['Local Broker'];
export const FakeData: React.FC<Params> = (props) => {
  const [broker, setBroker] = React.useState(BrokerData[0]);
  const [topic, setTopic] = React.useState('');

  React.useEffect(() => {
    if (props) {
      const cells = props.cell?.toJSON();
      // setBroker()
      // setTopic()
    }
  }, [props.cellId]);
  React.useEffect(() => {
    props.cell?.prop('config', {
      broker,
      topic,
    });
  }, [broker, topic]);

  const handleBrokerChange = (value: string) => {
    setBroker(value);
  };
  const onMqttTopicChange = (e: React.FocusEvent<HTMLInputElement>) => {
    setTopic(e.target.value);
  };

  return (
    <Space direction="vertical">
      <Row>Broker</Row>
      <Row>
        <Select
          defaultValue={broker}
          onChange={handleBrokerChange}
          style={{ width: '100%' }}>
          {BrokerData.map((type) => (
            <Option key={type}>{type}</Option>
          ))}
        </Select>
      </Row>
      <Row>MQTT Topic</Row>
      <Row>
        <Input
          placeholder="e.g.legacy/commands"
          value={topic}
          onChange={onMqttTopicChange}
        />
      </Row>
    </Space>
  );
};
