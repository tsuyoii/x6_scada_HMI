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
const ParseData = ['byteLength', 'delimiter'];
const DataBitsData = [5, 6, 7, 8];
const WOnEncodData = ['ascii', 'utf8', 'utf16le', 'base64', 'binary', 'hex'];
export const FakeData: React.FC<Params> = (props) => {
  const cells = props.cell?.toJSON();
  const [path, setPath] = React.useState(cells.config?.path || '');
  const [items, setItems] = React.useState(BaudRateData);
  const [name, setName] = React.useState('');
  const [baudRate, setBaudRate] = React.useState(cells.config?.baudRate || '');
  const [parity, setParity] = React.useState(
    cells.config?.parity || ParityData[1]
  );
  const [dataBits, setDataBits] = React.useState(
    cells.config?.dataBits || DataBitsData[0]
  );
  const [stopBits, setStopBits] = React.useState(cells.config?.stopBits || 1);
  const [rtscts, setRtscts] = React.useState(cells.config?.rtscts || true);
  const [writeOnOpen, setWriteOnOpen] = React.useState(
    cells.config?.writeOnOpen || ''
  );
  const [writeOnOpenEncoding, setWriteOnOpenEncoding] = React.useState(
    cells.config?.writeOnOpenEncoding || ''
  );
  const [parseBy, setParse] = React.useState(
    cells.meta?.parseBy || ParseData[0]
  );
  const [delimiter, setDelimiter] = React.useState(
    cells.config?.delimiter || ''
  );
  const [delimiterEncoding, setDelimiterEncoding] = React.useState(
    cells.config?.delimiterEncoding || WOnEncodData[0]
  );
  const [byteLength, setByteLength] = React.useState<string | number>(
    cells.config?.byteLength || ''
  );
  const [encoding, setEncoding] = React.useState(
    cells.config?.encoding || WOnEncodData[0]
  );
  const [count, setCount] = React.useState(0);

  React.useEffect(() => {
    if (props) {
      const cells = props.cell?.toJSON();
      setPath(cells.config?.path);
      if (!items.includes(cells.config?.baudRate + '')) {
        setItems([...items, cells.config?.baudRate?.toString()]);
      }
      setBaudRate(cells.config?.baudRate);
      setParity(cells.config?.parity);
      setDataBits(cells.config?.dataBits);
      setStopBits(cells.config?.stopBits);
      setRtscts(cells.config?.rtscts);
      setWriteOnOpen(cells.config?.writeOnOpen);
      setWriteOnOpenEncoding(cells.config?.writeOnOpenEncoding);
      setParse(cells.meta?.parseBy);
      setDelimiter(cells.config?.delimiter);
      if (parseBy === 'delimiter') {
        setDelimiterEncoding(cells.config?.delimiterEncoding);
        setByteLength('');
      } else {
        setByteLength(cells.config?.byteLength);
        setDelimiterEncoding('');
      }
      setEncoding(cells.config?.encoding);

      // props.cell.prop放这里，当连续点击一个节点后又跳转到另一个节点时有百分之20的可能会导致config无法对应上
      // props.cell?.prop('config', {
      //     // path:cells.config?.path,
      //     // baudRate:cells.config?.baudRate,
      //     path,
      //     baudRate,
      //     parity,
      //     dataBits,
      //     stopBits,
      //     rtscts,
      //     writeOnOpen,
      //     writeOnOpenEncoding,
      //     parseBy,
      //     delimiter,
      //     delimiterEncoding,
      //     byteLength,
      //     encoding
      // })
      // console.log(props.cell.toJSON().config,'2333')
      // console.log(path,baudRate,parity,dataBits,stopBits,rtscts,writeOnOpen,writeOnOpenEncoding,parseBy,delimiter,delimiterEncoding,byteLength,encoding)
    }
  }, [props.cellId]);

  React.useEffect(() => {
    props.cell?.prop('config', {
      path,
      baudRate,
      parity,
      dataBits,
      stopBits,
      rtscts,
      writeOnOpen,
      writeOnOpenEncoding,
      parseBy,
      delimiter,
      delimiterEncoding,
      byteLength,
      encoding,
    });
    // },[props.cellId,count])
  }, [
    props.cellId,
    path,
    baudRate,
    parity,
    dataBits,
    stopBits,
    rtscts,
    writeOnOpen,
    writeOnOpenEncoding,
    parseBy,
    delimiter,
    delimiterEncoding,
    byteLength,
    encoding,
  ]);

  const onBaudRateChange = (event: any) => {
    setBaudRate(event);
    setCount(count + 1);
  };

  const addItem = (e: any) => {
    e.preventDefault();
    setItems([...items, name]);
    setName('');
  };

  const handleParityChange = (value: string) => {
    setParity(value);
    setCount(count + 1);
  };
  const onRtsctsChange = (e: any) => {
    setRtscts(e.target.value);
    setCount(count + 1);
  };
  const handleParseChange = (value: string) => {
    setParse(value);
    setCount(count + 1);
  };

  return (
    <Space direction="vertical">
      <Divider plain>Configuration</Divider>
      <Row>Serial Path</Row>
      <Row>
        <Input
          placeholder="e.g./dev/ROBOT"
          value={path}
          onChange={(v) => {
            setPath(v.target.value);
            setCount(count + 1);
          }}
        />
      </Row>
      <Row>Baud Rate</Row>
      <Row>
        <Select
          style={{ width: 200 }}
          placeholder="custom dropdown render"
          value={baudRate}
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
      <Row>Parity</Row>
      <Row>
        <Select
          defaultValue={ParityData[1]}
          value={parity}
          onChange={handleParityChange}
          style={{ width: '100%' }}>
          {ParityData.map((type) => (
            <Option key={type}>{type}</Option>
          ))}
        </Select>
      </Row>
      <Row>Data Bits</Row>
      <Row>
        <Select
          defaultValue={DataBitsData[0]}
          value={dataBits}
          onChange={(v) => {
            setDataBits(v);
            setCount(count + 1);
          }}
          style={{ width: '100%' }}>
          {DataBitsData.map((type) => (
            <Option key={type}>{type}</Option>
          ))}
        </Select>
      </Row>
      <Row>Stop Bits</Row>
      <Row>
        <Select
          defaultValue={1}
          value={stopBits}
          onChange={(v) => {
            setStopBits(+v);
            setCount(count + 1);
          }}
          style={{ width: '100%' }}>
          <Option key={1}>1</Option>
          <Option key={2}>2</Option>
        </Select>
      </Row>
      <Row>RTS/CTS Handshake</Row>
      <Row>
        <Radio.Group onChange={onRtsctsChange} value={rtscts}>
          <Radio value={true}>true</Radio>
          <Radio value={false}>false</Radio>
        </Radio.Group>
      </Row>
      <Row>Write After Port Opens</Row>
      <Row>
        <Input
          placeholder="e.g.hello\r"
          value={writeOnOpen}
          onChange={(v) => {
            setWriteOnOpen(v.target.value);
            setCount(count + 1);
          }}
        />
      </Row>
      <Row>Write On Open Encoding</Row>
      <Row>
        <Select
          defaultValue={WOnEncodData[0]}
          value={writeOnOpenEncoding}
          onChange={(v) => {
            setWriteOnOpenEncoding(v);
            setCount(count + 1);
          }}
          style={{ width: '100%' }}>
          {WOnEncodData.map((type) => (
            <Option key={type}>{type}</Option>
          ))}
        </Select>
      </Row>
      <Row>Parse Method</Row>
      <Row>
        <Select
          defaultValue={'byteLength'}
          value={parseBy}
          onChange={handleParseChange}
          style={{ width: '100%' }}>
          <Option key={'byteLength'}>Byte Length</Option>
          <Option key={'delimiter'}>Delimiter</Option>
        </Select>
      </Row>
      {parseBy === 'delimiter' ? (
        <>
          <Row>Delimiter</Row>
          <Row>
            <Input
              placeholder="e.g.\r"
              value={delimiter}
              onChange={(v) => {
                setDelimiter(v.target.value);
                setCount(count + 1);
              }}
            />
          </Row>
          <Row>Delimiter Encoding</Row>
          <Row>
            <Select
              defaultValue={WOnEncodData[0]}
              value={delimiterEncoding}
              onChange={(v) => {
                setDelimiterEncoding(v);
                setCount(count + 1);
              }}
              style={{ width: '100%' }}>
              {WOnEncodData.map((type) => (
                <Option key={type}>{type}</Option>
              ))}
            </Select>
          </Row>
        </>
      ) : (
        <>
          <Row>Byte Length</Row>
          <Row>
            <Input
              placeholder="e.g.8"
              value={byteLength}
              onChange={(v) => {
                setByteLength(v.target.value);
                setCount(count + 1);
              }}
            />
          </Row>
        </>
      )}
      <Row>Output Encoding</Row>
      <Row>
        <Select
          defaultValue={WOnEncodData[0]}
          value={encoding}
          onChange={(v) => {
            setEncoding(v);
            setCount(count + 1);
          }}
          style={{ width: '100%' }}>
          {WOnEncodData.map((type) => (
            <Option key={type}>{type}</Option>
          ))}
        </Select>
      </Row>
    </Space>
  );
};
