import {
  Card,
  Divider,
  Input,
  Radio,
  Row,
  Select,
  Space,
  Typography,
} from 'antd';
import * as React from 'react';
import { PlusOutlined } from '@ant-design/icons';

interface Params {
  builder: string;
  cell?: any;
  cellId?: string;
}
interface ReadInstructionsType {
  typeTemplate: string;
  addressTemplate?: string;
  lengthTemplate?: string;
  deviceIdCodeTemplate?: string;
  objectIdTemplate?: string;
  key: string;
}
const { Option } = Select;

const ParityData = ['none', 'even', 'mark', 'odd', 'space'];
const BaudRateData = ['110', '300', '600', '1200'];
const RegisterTypeData = [
  'input-register',
  'holding-register',
  'discrete-input',
  'coil',
  'read-device-identification',
];
const DataBitsData = [5, 6, 7, 8];
export const FakeData: React.FC<Params> = (props) => {
  const cells = props.cell?.toJSON();

  const [connectionTypeTemplate, setConnectionType] = React.useState(
    cells.config?.connectionTypeTemplate || 'tcp'
  );
  const [items, setItems] = React.useState(BaudRateData);
  const [name, setName] = React.useState('');
  const [baudRateTemplate, setBaudRate] = React.useState(
    cells.config?.baudRateTemplate || ''
  );
  const [pathTemplate, setPath] = React.useState(
    cells.config?.pathTemplate || ''
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
  const [unitIdTemplate, setUnitId] = React.useState(
    cells.config?.unitIdTemplate || ''
  );
  const [areUnsignedInts, setUnsignedInts] = React.useState(
    cells.config?.areUnsignedInts || false
  );
  const [timeoutTemplate, setTimeoutTemplate] = React.useState(
    cells.config?.timeoutTemplate || ''
  );
  const [endiannessTemplate, setEndianness] = React.useState(
    cells.config?.endiannessTemplate || ''
  );
  const [hostTemplate, setHost] = React.useState(
    cells.config?.hostTemplate || ''
  );
  const [portTemplate, setPort] = React.useState(
    cells.config?.portTemplate || ''
  );
  const [readInstructionsType, setReadInstructionsType] = React.useState(
    cells.config?.readInstructionsType || 'array'
  );
  const [readInstructions, setReadInstructions] = React.useState(
    cells.config?.readInstructions
  );
  const [destinationPath, setDestinationPath] = React.useState(
    cells.config?.destinationPath || ''
  );

  React.useEffect(() => {
    setConnectionType(cells.config?.connectionTypeTemplate || 'tcp');
    if (!items.includes(cells.config?.baudRateTemplate + '')) {
      setItems([...items, cells.config?.baudRateTemplate?.toString()]);
    }
    setPath(cells.config?.pathTemplate);
    setBaudRate(cells.config?.baudRateTemplate);
    setParity(cells.config?.parityTemplate || ParityData[1]);
    setDataBits(cells.config?.dataBitsTemplate || DataBitsData[0]);
    setStopBits(cells.config?.stopBitsTemplate || 1);
    setUnitId(cells.config?.unitIdTemplate),
      setUnsignedInts(cells.config?.areUnsignedInts || false),
      setEndianness(cells.config?.endiannessTemplate),
      setHost(cells.config?.hostTemplate),
      setPort(cells.config?.portTemplate),
      setTimeoutTemplate(cells.config?.timeoutTemplate),
      setReadInstructionsType(cells.config?.readInstructionsType || 'array');
    if (cells.config?.readInstructionsType === 'array') {
      setReadInstructions([
        ...cells.config?.readInstructions,
        {
          addressTemplate: '',
          key: '',
          lengthTemplate: '',
          typeTemplate: 'input-register',
        },
      ]);
    } else if (cells.config?.readInstructionsType === 'payload') {
      setReadInstructions(cells.config?.readInstructions || '');
    }
    setDestinationPath(cells.config?.destinationPath);
  }, [props.cellId]);

  React.useEffect(() => {
    props.cell?.prop('config', {
      connectionTypeTemplate,
      pathTemplate,
      timeoutTemplate,
      baudRateTemplate,
      parityTemplate,
      dataBitsTemplate,
      stopBitsTemplate,
      unitIdTemplate,
      areUnsignedInts,
      endiannessTemplate,
      hostTemplate,
      portTemplate,
      readInstructionsType,
      destinationPath,
      readInstructions:
        readInstructionsType === 'payloadPath'
          ? readInstructions
          : readInstructions.filter((item: any) => item.key !== ''),
    });
  }, [
    props.cellId,
    connectionTypeTemplate,
    pathTemplate,
    timeoutTemplate,
    baudRateTemplate,
    parityTemplate,
    dataBitsTemplate,
    stopBitsTemplate,
    unitIdTemplate,
    areUnsignedInts,
    endiannessTemplate,
    hostTemplate,
    portTemplate,
    readInstructionsType,
    destinationPath,
    readInstructions,
  ]);

  const onBaudRateChange = (event: any) => {
    setBaudRate(event);
  };

  const addItem = (e: any) => {
    e.preventDefault();
    setItems([...items, name]);
    setName('');
  };

  const onChangeReadInstructionsType = (value: string) => {
    setReadInstructionsType(value);
    if (value === 'array') {
      setReadInstructions([
        {
          addressTemplate: '',
          key: '',
          lengthTemplate: '',
          typeTemplate: 'input-register',
        },
      ]);
    } else if (value === 'payloadPath') {
      setReadInstructions('');
    }
  };

  const setReadInstructionsConfig = (
    value: string,
    type: string,
    index?: number
  ) => {
    if (readInstructionsType === 'payloadPath' && type === 'payload') {
      setReadInstructions(value);
      return;
    }
    const temp = [...readInstructions];
    temp[index!][type] = value;
    if (index === temp.length - 1 && temp[index!]['key'] !== '') {
      temp[index! + 1] = {
        addressTemplate: '',
        key: '',
        lengthTemplate: '',
        typeTemplate: 'input-register',
      };
    }
    setReadInstructions([...temp]);
  };

  return (
    <Space direction="vertical">
      <Divider plain>Address Config</Divider>
      <Row>
        <Radio.Group
          value={connectionTypeTemplate}
          onChange={(e) => setConnectionType(e.target.value)}>
          <Space direction="vertical">
            <Radio value={'tcp'}>TCP Connection</Radio>
            <Radio value={'serial'}>Serial RTU Connection</Radio>
          </Space>
        </Radio.Group>
      </Row>
      {connectionTypeTemplate === 'serial' ? (
        <>
          <Row>Path Template</Row>
          <Row>
            <Input
              placeholder="e.g./dev/ROBOT or {{data.serial}}"
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
              onChange={(e) => setParity(e)}
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
          <Row>Unit ID Template</Row>
          <Row>
            <Input
              placeholder="e.g.{{data.unitId}}"
              value={unitIdTemplate}
              onChange={(v) => setUnitId(v.target.value)}
            />
          </Row>
          <Row>
            <Radio.Group
              value={areUnsignedInts}
              onChange={(e) => setUnsignedInts(e.target.value)}>
              <Space direction="vertical">
                <Radio value={false}>
                  Convert the results into signed integers
                </Radio>
                <Radio value={true}>
                  Convert the results into unsigned integers
                </Radio>
              </Space>
            </Radio.Group>
          </Row>
          <Row>Timeout Template (in milliseconds)</Row>
          <Row>
            <Input
              placeholder="e.g.{{data.timeout}} or 3000000"
              value={timeoutTemplate}
              onChange={(v) => setTimeoutTemplate(v.target.value)}
            />
          </Row>
          <Row>Endianness Template</Row>
          <Row>
            <Input
              placeholder="e.g.big or {{working.endianness}}"
              value={endiannessTemplate}
              onChange={(v) => setEndianness(v.target.value)}
            />
          </Row>
        </>
      ) : (
        <>
          <Row>Host Template</Row>
          <Row>
            <Input
              placeholder="e.g.{{data.host}} or 192.168.0.9"
              value={hostTemplate}
              onChange={(v) => setHost(v.target.value)}
            />
          </Row>
          <Row>Port Template</Row>
          <Row>
            <Input
              placeholder="e.g.{{data.port}} or 502"
              value={portTemplate}
              onChange={(v) => setPort(v.target.value)}
            />
          </Row>
          <Row>Unit ID Template</Row>
          <Row>
            <Input
              placeholder="e.g.{{data.unitId}}"
              value={unitIdTemplate}
              onChange={(v) => setUnitId(v.target.value)}
            />
          </Row>
          <Row>Timeout Template (in milliseconds)</Row>
          <Row>
            <Input
              placeholder="e.g.{{data.timeout}} or 3000000"
              value={timeoutTemplate}
              onChange={(v) => setTimeoutTemplate(v.target.value)}
            />
          </Row>
        </>
      )}
      <Divider plain>Write Instructions</Divider>
      <Row>
        <Radio.Group
          value={readInstructionsType}
          onChange={(e) => onChangeReadInstructionsType(e.target.value)}>
          <Space direction="vertical">
            <Radio value={'array'}>Array of Template Strings</Radio>
            <Radio value={'payloadPath'}>Payload Path</Radio>
          </Space>
        </Radio.Group>
      </Row>
      {readInstructionsType === 'array' ? (
        <>
          {readInstructions.map((item: ReadInstructionsType, index: number) => {
            return (
              <Card style={{ width: 220 }}>
                <Row>Register Type</Row>
                <Row>
                  <Select
                    defaultValue={RegisterTypeData[0]}
                    value={item?.typeTemplate}
                    onChange={(e) =>
                      setReadInstructionsConfig(e, 'typeTemplate', index)
                    }
                    style={{ width: '100%' }}>
                    {RegisterTypeData.map((type) => (
                      <Option key={type}>{type}</Option>
                    ))}
                  </Select>
                </Row>
                {item?.typeTemplate === 'read-device-identification' ? (
                  <>
                    <Row>Device ID Code Template</Row>
                    <Row>
                      <Input
                        placeholder="e.g.1 or {{working.deviceIdCode}}"
                        value={item?.deviceIdCodeTemplate}
                        onChange={(v) =>
                          setReadInstructionsConfig(
                            v.target.value,
                            'deviceIdCodeTemplate',
                            index
                          )
                        }
                      />
                    </Row>
                    <Row>Objext ID Template</Row>
                    <Row>
                      <Input
                        placeholder="e.g.0 or {{working.objectId}}"
                        value={item?.objectIdTemplate}
                        onChange={(v) =>
                          setReadInstructionsConfig(
                            v.target.value,
                            'objectIdTemplate',
                            index
                          )
                        }
                      />
                    </Row>
                  </>
                ) : (
                  <>
                    <Row>Address Template</Row>
                    <Row>
                      <Input
                        placeholder="e.g.0 or {{working.address}}"
                        value={item?.addressTemplate}
                        onChange={(v) =>
                          setReadInstructionsConfig(
                            v.target.value,
                            'addressTemplate',
                            index
                          )
                        }
                      />
                    </Row>
                    <Row>Length Template</Row>
                    <Row>
                      <Input
                        placeholder="e.g.1 or {{working.length}}"
                        value={item?.lengthTemplate}
                        onChange={(v) =>
                          setReadInstructionsConfig(
                            v.target.value,
                            'lengthTemplate',
                            index
                          )
                        }
                      />
                    </Row>
                  </>
                )}
                <Row>Result Key</Row>
                <Row>
                  <Input
                    placeholder="请保证key值的唯一性"
                    value={item?.key}
                    onChange={(v) =>
                      setReadInstructionsConfig(v.target.value, 'key', index)
                    }
                  />
                </Row>
                <Divider plain></Divider>
              </Card>
            );
          })}
        </>
      ) : (
        <>
          <Row>Path to Read Instruction</Row>
          <Row>
            <Input
              placeholder="e.g.data.myInstruction"
              value={readInstructions}
              onChange={(v) =>
                setReadInstructionsConfig(v.target.value, 'payload')
              }
            />
          </Row>
        </>
      )}
      <Divider plain>Result</Divider>
      <Row>Result Path</Row>
      <Row>
        <Input
          placeholder="e.g.result.modbusData"
          value={destinationPath}
          onChange={(v) => setDestinationPath(v.target.value)}
        />
      </Row>
    </Space>
  );
};
