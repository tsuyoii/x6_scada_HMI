import { Divider, Input, Modal, Radio, Row, Select, Space } from 'antd';
import * as React from 'react';
import brace from 'brace';
import AceEditor from 'react-ace';
import 'brace/mode/javascript';
import 'brace/theme/tomorrow';
import { ExpandOutlined } from '@ant-design/icons';

interface Params {
  builder: string;
  cell?: any;
  cellId?: string;
}
const { Option } = Select;
const MethodData = ['workflowPayload', 'payloadPath', 'jsonTemplate'];
export const FakeData: React.FC<Params> = (props) => {
  const cells = props.cell?.toJSON();
  const [awsAccessKeyId, setAwsAccessKeyId] = React.useState(
    cells?.config?.awsAccessKeyId || ''
  );
  const [awsSecretAccessKey, setSecretAccessKey] = React.useState(
    cells.config?.awsSecretAccessKey || ''
  );
  const [awsRegion, setRegion] = React.useState(cells.config?.awsRegion || '');
  const [functionName, setFunctionName] = React.useState(
    cells.config?.functionName || ''
  );
  const [sourceMethod, setSourceMethod] = React.useState(
    cells.config?.sourceMethod || ''
  );
  const [sourceData, setSourceData] = React.useState(
    cells.config?.sourceData || ''
  );
  const [resultPath, setResultPath] = React.useState(
    cells.config?.resultPath || ''
  );
  const [errorBehavior, setErrorBehavior] = React.useState(
    cells.config?.errorBehavior || ''
  );
  const [errorPath, setErrorPath] = React.useState(
    cells.config?.errorPath || ''
  );
  const [visible, setVisible] = React.useState(false);
  const [confirmLoading, setConfirmLoading] = React.useState(false);

  React.useEffect(() => {
    setAwsAccessKeyId(cells.config?.awsAccessKeyId),
      setSecretAccessKey(cells.config?.awsSecretAccessKey),
      setRegion(cells.config?.awsRegion),
      setFunctionName(cells.config?.functionName),
      setSourceMethod(cells.config?.sourceMethod),
      setSourceData(cells.config?.sourceData),
      setResultPath(cells.config?.resultPath),
      setErrorBehavior(cells.config?.errorBehavior),
      setErrorPath(cells.config?.errorPath);
  }, [props.cellId]);

  React.useEffect(() => {
    props.cell?.prop('config', {
      awsAccessKeyId,
      awsSecretAccessKey,
      awsRegion,
      functionName,
      sourceMethod,
      sourceData,
      resultPath,
      errorBehavior,
      errorPath,
    });
  }, [
    props.cellId,
    awsAccessKeyId,
    awsSecretAccessKey,
    awsRegion,
    functionName,
    sourceMethod,
    sourceData,
    resultPath,
    errorBehavior,
    errorPath,
  ]);

  const handleMethodChange = (value: string) => {
    setSourceMethod(value);
  };
  const onOpenDialog = () => {
    setVisible(true);
  };
  const handleOk = () => {
    setConfirmLoading(true);
    setTimeout(() => {
      setVisible(false);
      setConfirmLoading(false);
    }, 500);
  };
  const handleCancel = () => {
    console.log('Clicked cancel button');
    setVisible(false);
  };

  return (
    <Space direction="vertical">
      <Divider plain>AWS Config</Divider>
      <Row>AWS Access Key ID Template</Row>
      <Row>
        <Input
          placeholder="e.g.{{data.accessKey}}"
          value={awsAccessKeyId}
          onChange={(e) => setAwsAccessKeyId(e.target.value)}
        />
      </Row>
      <Row>AWS Secret Access Key Template</Row>
      <Row>
        <Input
          placeholder="e.g.{{data.secretAccessKey}}"
          value={awsSecretAccessKey}
          onChange={(e) => setSecretAccessKey(e.target.value)}
        />
      </Row>
      <Row>AWS Region Template</Row>
      <Row>
        <Input
          placeholder="e.g.us-west-2"
          value={awsRegion}
          onChange={(e) => setRegion(e.target.value)}
        />
      </Row>
      <Divider plain>Lambda Config</Divider>
      <Row>Lambda Function Name</Row>
      <Row>
        <Input
          placeholder="e.g.myLambdaFunctionName"
          value={functionName}
          onChange={(e) => setFunctionName(e.target.value)}
        />
      </Row>
      <Row>
        <Select
          defaultValue={MethodData[0]}
          value={sourceMethod}
          onChange={handleMethodChange}
          style={{ width: '100%' }}>
          {MethodData.map((type) => (
            <Option key={type}>{type}</Option>
          ))}
        </Select>
      </Row>

      {sourceMethod === 'payloadPath' ? (
        <>
          <Row>Data Source Path</Row>
          <Row>
            <Input
              placeholder="e.g. data.labdaPayload"
              value={sourceData}
              onChange={(e) => setSourceData(e.target.value)}
            />
          </Row>
        </>
      ) : sourceMethod === 'jsonTemplate' ? (
        <>
          <Row>Data JSON Template</Row>
          <Row>
            <ExpandOutlined
              onClick={onOpenDialog}
              style={{
                position: 'relative',
                left: '93%',
                top: '17px',
                zIndex: 100,
              }}
            />
            <AceEditor
              mode="javascript"
              theme="tomorrow"
              name="jsoneditor"
              onChange={(newValue: string) => setSourceData(newValue)}
              value={sourceData}
              fontSize={14}
              style={{ width: '240px' }}
              editorProps={{ $blockScrolling: true }}
              height={'250px'}
            />
            <Modal
              title="Title"
              visible={visible}
              onOk={handleOk}
              confirmLoading={confirmLoading}
              onCancel={handleCancel}
              width={1000}>
              <AceEditor
                mode="javascript"
                theme="tomorrow"
                name="editor"
                onChange={(newValue: string) => setSourceData(newValue)}
                value={sourceData}
                fontSize={14}
                style={{ width: '900px' }}
                editorProps={{ $blockScrolling: true }}
              />
            </Modal>
          </Row>
        </>
      ) : null}

      <Divider plain>Output</Divider>
      <Row>Result Path</Row>
      <Row>
        <Input
          placeholder="e.g.data.lambdaResult"
          value={resultPath}
          onChange={(e) => setResultPath(e.target.value)}
        />
      </Row>
      <Divider plain>Error</Divider>
      <Row>
        <Radio.Group
          value={errorBehavior}
          onChange={(e) => setErrorBehavior(e.target.value)}>
          <Space direction="vertical">
            <Radio value={'throw'}>Error The Workflow</Radio>
            <Radio value={'payloadPath'}>
              Store AWS Lambda Error At Payload Path
            </Radio>
          </Space>
        </Radio.Group>
      </Row>
      {errorBehavior === 'payloadPath' ? (
        <>
          <Row>Error Path</Row>
          <Row>
            <Input
              placeholder="e.g. working.labdaError"
              value={errorPath}
              onChange={(e) => setErrorPath(e.target.value)}
            />
          </Row>
        </>
      ) : null}
    </Space>
  );
};
