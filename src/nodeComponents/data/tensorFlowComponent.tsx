import { Col, Divider, Input, Radio, Row, Select, Space } from 'antd';
import * as React from 'react';

interface Params {
  builder: string;
  cell?: any;
  cellId?: string;
}
const { Option } = Select;
const { TextArea } = Input;
const typeData = ['autodetect', 'float32', 'integer32', 'boolean', 'string'];
export const FakeData: React.FC<Params> = (props) => {
  const cells = props.cell?.toJSON();
  const [modelTemplate, setModel] = React.useState(
    cells.config?.modelTemplate || ''
  );
  const [modelTypeTemplate, setModelType] = React.useState(
    cells.config?.modelTypeTemplate || ''
  );
  const [dataPath, setDataPath] = React.useState(cells.config?.dataPath || '');
  const [shapePath, setShapePath] = React.useState(
    cells.config?.shapePath || ''
  );
  const [dataTypeTemplate, setDataType] = React.useState(
    cells.config?.dataTypeTemplate || ''
  );
  const [resultPath, setResultPath] = React.useState(
    cells.config?.resultPath || ''
  );

  React.useEffect(() => {
    if (props) {
      const cells = props.cell?.toJSON();
      setModel(cells.config?.modelTemplate);
      setModelType(cells.config?.modelTypeTemplate);
      setDataPath(cells.config?.dataPath);
      setShapePath(cells.config?.shapePath);
      setDataType(cells.config?.dataTypeTemplate);
      setResultPath(cells.config?.resultPath);
    }
  }, [props.cellId]);
  React.useEffect(() => {
    props.cell?.prop('config', {
      modelTemplate,
      modelTypeTemplate,
      dataPath,
      shapePath,
      dataTypeTemplate,
      resultPath,
    });
  }, [
    props.cellId,
    modelTemplate,
    modelTypeTemplate,
    dataPath,
    shapePath,
    dataTypeTemplate,
    resultPath,
  ]);

  return (
    <Space direction="vertical">
      <Divider plain>Configuration</Divider>
      <Row>Model Path Template</Row>
      <Row>
        <Input
          placeholder="e.g./tmp/myModel.json or {{data.foo}}"
          value={modelTemplate}
          onChange={(e) => setModel(e.target.value)}
        />
      </Row>
      <Row>
        <Radio.Group
          value={modelTypeTemplate}
          onChange={(e) => setModelType(e.target.value)}>
          <Space direction="vertical">
            <Radio value={'layers'}>Load this model as a layers model</Radio>
            <Radio value={'graph'}>Load this model as a graph model</Radio>
          </Space>
        </Radio.Group>
      </Row>
      <Divider plain>Predict on</Divider>
      <Row>Data Path</Row>
      <Row>
        <Input
          placeholder="e.g.data.predictData"
          value={dataPath}
          onChange={(e) => setDataPath(e.target.value)}
        />
      </Row>
      <Row>Shape Path</Row>
      <Row>
        <Input
          placeholder="e.g.data.shape"
          value={shapePath}
          onChange={(e) => setShapePath(e.target.value)}
        />
      </Row>
      <Row>Data Type</Row>
      <Row>
        <Select
          defaultValue={dataTypeTemplate}
          onChange={(e) => setDataType(e)}
          style={{ width: '100%' }}>
          {typeData.map((type) => (
            <Option key={type}>{type}</Option>
          ))}
        </Select>
      </Row>
      <Divider plain>Predict on</Divider>
      <Row>Result Path</Row>
      <Row>
        <Input
          placeholder="e.g.transorFlowResult"
          value={resultPath}
          onChange={(e) => setResultPath(e.target.value)}
        />
      </Row>
    </Space>
  );
};
