import { Col, Input, Row, Select, Space } from 'antd';
import * as React from 'react';

interface Params {
  builder: string;
  cell?: any;
  cellId?: string;
}
const { Option } = Select;
const { TextArea } = Input;
const BrokerData = ['Local Broker'];
export const FakeData: React.FC<Params> = (props) => {
  const cells = props.cell?.toJSON();
  const [broker, setBroker] = React.useState(BrokerData[0]);
  const [topicTemplate, setTopic] = React.useState(
    cells.config?.topicTemplate || ''
  );
  const [messageTemplate, setMessage] = React.useState(
    cells.config?.messageTemplate || ''
  );

  React.useEffect(() => {
    if (props) {
      const cells = props.cell?.toJSON();
      setTopic(cells.config?.topicTemplate);
      setMessage(cells.config?.messageTemplate);
    }
  }, [props.cellId]);
  React.useEffect(() => {
    props.cell?.prop('config', {
      messageTemplate,
      topicTemplate,
    });
    console.log(props.cell.toJSON().config, '2333');
  }, [props.cellId, messageTemplate, topicTemplate]);

  const handleBrokerChange = (value: string) => {
    setBroker(value);
  };
  const onMqttTopicChange = (e: React.FocusEvent<HTMLInputElement>) => {
    setTopic(e.target.value);
  };
  const onMqttMessageChange = (e: React.FocusEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value);
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
      <Row>Topic Template</Row>
      <Row>
        <Input
          placeholder="e.g.my-topic or {{data.topic}}"
          value={topicTemplate}
          onChange={onMqttTopicChange}
        />
      </Row>
      <Row>Message Template</Row>
      <Row>
        <TextArea
          placeholder="textarea with clear icon"
          allowClear
          value={messageTemplate}
          onChange={onMqttMessageChange}
        />
      </Row>
    </Space>
  );
};
