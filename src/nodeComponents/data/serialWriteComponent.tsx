import {
  Card,
  Col,
  Divider,
  Input,
  Modal,
  Radio,
  Row,
  Select,
  Space,
  Typography,
} from 'antd';
import * as React from 'react';
import { useDebounce } from '../../utils/utils';
import { ExpandOutlined, PlusOutlined } from '@ant-design/icons';

interface Params {
  builder: string;
  cell?: any;
  cellId?: string;
}
const { Option } = Select;
const ParityData = ['none', 'even', 'mark', 'odd', 'space'];
const BaudRateData = ['110', '300', '600', '1200'];
const DataBitsData = [5, 6, 7, 8];
const WOnEncodData = ['ascii', 'utf8', 'utf16le', 'base64', 'binary', 'hex'];
export const FakeData: React.FC<Params> = (props) => {
  const cells = props.cell?.toJSON();
  const [pathTemplate, setPath] = React.useState(
    cells.config?.pathTemplate || ''
  );
  const [items, setItems] = React.useState(BaudRateData);
  const [name, setName] = React.useState('');
  const [baudRateTemplate, setBaudRate] = React.useState(
    cells.config?.baudRateTemplate || ''
  );
  const [parityTemplate, setParity] = React.useState(
    cells.config?.parityTemplate || ParityData[1]
  );
  const [dataBitsTemplate, setDataBits] = React.useState(
    cells.config?.dataBitsTemplate || DataBitsData[0]
  );
  const [stopBitsTemplate, setStopBits] = React.useState(
    cells.config?.stopBitsTemplate || 1
  );
  const [rtsctsTemplate, setRtscts] = React.useState(
    cells.config?.rtsctsTemplate || true
  );
  const [writeTemplate, setWrite] = React.useState(
    cells.config?.writeTemplate || ''
  );
  const [resultPath, setResultPath] = React.useState(
    cells.config?.resultPath || ''
  );
  const [encodeTemplate, setEncoding] = React.useState(
    cells.config?.encodeTemplate || WOnEncodData[0]
  );

  React.useEffect(() => {
    if (props) {
      const cells = props.cell?.toJSON();
      setPath(cells.config?.pathTemplate);
      if (!items.includes(cells.config?.baudRateTemplate + '')) {
        setItems([...items, cells.config?.baudRateTemplate?.toString()]);
      }
      setBaudRate(cells.config?.baudRateTemplate);
      setParity(cells.config?.parityTemplate);
      setDataBits(cells.config?.dataBitsTemplate);
      setStopBits(cells.config?.stopBitsTemplate);
      setRtscts(cells.config?.rtsctsTemplate);
      setWrite(cells.config?.writeTemplate);
      setEncoding(cells.config?.encodeTemplate);
      setResultPath(cells.config?.resultPath);
    }
  }, [props.cellId]);

  React.useEffect(() => {
    props.cell?.prop('config', {
      pathTemplate,
      baudRateTemplate,
      parityTemplate,
      dataBitsTemplate,
      stopBitsTemplate,
      rtsctsTemplate,
      writeTemplate,
      encodeTemplate,
      resultPath,
    });
  }, [
    props.cellId,
    pathTemplate,
    baudRateTemplate,
    parityTemplate,
    dataBitsTemplate,
    stopBitsTemplate,
    rtsctsTemplate,
    writeTemplate,
    encodeTemplate,
    resultPath,
  ]);

  const onBaudRateChange = (event: any) => {
    setBaudRate(event);
  };

  const addItem = (e: any) => {
    e.preventDefault();
    setItems([...items, name]);
    setName('');
  };

  const handleParityChange = (value: string) => {
    setParity(value);
  };
  const onRtsctsChange = (e: any) => {
    setRtscts(e.target.value);
  };

  return (
    <Space direction="vertical">
      <Divider plain>Configuration</Divider>
      <Row>Serial Path Template</Row>
      <Row>
        <Input
          placeholder="e.g./dev/ROBOT"
          value={pathTemplate}
          onChange={(v) => setPath(v.target.value)}
        />
      </Row>
      <Row>Baud Rate Template</Row>
      <Row>
        <Select
          style={{ width: 200 }}
          placeholder="custom dropdown render"
          value={baudRateTemplate}
          onChange={onBaudRateChange}
          dropdownRender={(menu) => (
            <>
              {menu}
              <Divider style={{ margin: '8px 0' }} />
              <Space align="center" style={{ padding: '0 8px 4px' }}>
                <Input placeholder="Please enter item" value={name} />
                <Typography.Link
                  onClick={addItem}
                  style={{ whiteSpace: 'nowrap' }}>
                  <PlusOutlined /> Add item
                </Typography.Link>
              </Space>
            </>
          )}>
          {items.map((item) => (
            <Option key={item}>{item}</Option>
          ))}
        </Select>
      </Row>
      <Row>Parity Template</Row>
      <Row>
        <Select
          defaultValue={ParityData[1]}
          value={parityTemplate}
          onChange={handleParityChange}
          style={{ width: '100%' }}>
          {ParityData.map((type) => (
            <Option key={type}>{type}</Option>
          ))}
        </Select>
      </Row>
      <Row>Data Bits Template</Row>
      <Row>
        <Select
          defaultValue={DataBitsData[0]}
          value={dataBitsTemplate}
          onChange={(v) => setDataBits(v)}
          style={{ width: '100%' }}>
          {DataBitsData.map((type) => (
            <Option key={type}>{type}</Option>
          ))}
        </Select>
      </Row>
      <Row>Stop Bits Template</Row>
      <Row>
        <Select
          defaultValue={1}
          value={stopBitsTemplate}
          onChange={(v) => setStopBits(+v)}
          style={{ width: '100%' }}>
          <Option key={1}>1</Option>
          <Option key={2}>2</Option>
        </Select>
      </Row>
      <Row>RTS/CTS Template</Row>
      <Row>
        <Radio.Group onChange={onRtsctsChange} value={rtsctsTemplate}>
          <Radio value={true}>true</Radio>
          <Radio value={false}>false</Radio>
        </Radio.Group>
      </Row>
      <Row>Write Template</Row>
      <Row>
        <Input
          placeholder="e.g.hello\r"
          value={writeTemplate}
          onChange={(v) => setWrite(v.target.value)}
        />
      </Row>
      <Row>Write Encoding</Row>
      <Row>
        <Select
          defaultValue={WOnEncodData[0]}
          value={encodeTemplate}
          onChange={(v) => setEncoding(v)}
          style={{ width: '100%' }}>
          {WOnEncodData.map((type) => (
            <Option key={type}>{type}</Option>
          ))}
        </Select>
      </Row>
      <Divider plain>Result</Divider>
      <Row>Result Path</Row>
      <Row>
        <Input
          placeholder="e.g.serialResult"
          value={resultPath}
          onChange={(v) => setResultPath(v.target.value)}
        />
      </Row>
    </Space>
  );
};
