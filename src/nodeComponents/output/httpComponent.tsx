import {
  Alert,
  AutoComplete,
  Card,
  Cascader,
  Checkbox,
  Divider,
  Input,
  Menu,
  Modal,
  Radio,
  Row,
  Select,
  Space,
  Tag,
  Tooltip,
} from 'antd';
import * as React from 'react';
import brace from 'brace';
import AceEditor from 'react-ace';
import 'brace/mode/javascript';
import 'brace/theme/tomorrow';
import { useDebounce } from '../../utils/utils';
import { ExpandOutlined } from '@ant-design/icons';

interface Params {
  builder: string;
  cell?: any;
  cellId?: string;
}
const { Option } = Select;
const ReqMethodData = ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'];
const EncodingData = ['ascii', 'utf8', 'utf16le', 'base64', 'binary', 'hex'];
const options = [
  { value: 'Accept', label: 'Accept' },
  { value: 'Accept-Charset', label: 'Accept-Charset' },
  { value: 'Accept-Datetime', label: 'Accept-Datetime' },
  { value: 'Accept-Encoding', label: 'Accept-Encoding' },
  { value: 'Accept-Language', label: 'Accept-Language' },
];
const optionV = [
  { value: 'application/atom+xml', label: 'application/atom+xml' },
  { value: 'application/ecmascript', label: 'application/ecmascript' },
  { value: 'application/font-woff', label: 'application/font-woff' },
  { value: 'application/graphql', label: 'application/graphql' },
  { value: 'application/gzip', label: 'application/gzip' },
];

export const FakeData: React.FC<Params> = (props) => {
  const cells = props.cell?.toJSON();
  const [visible, setVisible] = React.useState(false);
  const [bodyVisible, setBodyVisible] = React.useState(false);
  const [confirmLoading, setConfirmLoading] = React.useState(false);

  const [method, setReqMethod] = React.useState(
    cells?.config?.method || ReqMethodData[0]
  );
  const [uriTemplate, setUriTemplate] = React.useState(
    cells.config?.uriTemplate || ''
  );
  const [timeoutTemplate, setTimeoutTemplate] = React.useState(
    cells.config?.timeoutTemplate || ''
  );
  const [requestEncodingTemplate, setRequestEncodingTemplate] = React.useState(
    cells.config?.requestEncodingTemplate || EncodingData[0]
  );
  const [bodyTemplate, setBodyTemplate] = React.useState(
    cells.config?.bodyTemplate || ''
  );
  // 在要保存的地方使用debouncededit，这样可以一段时间之后再保存结果
  const debouncedEdit = useDebounce(bodyTemplate, 2000);
  const [authType, setAuthType] = React.useState(
    cells.config?.authType || 'none'
  );
  const [usernameTemplate, setUsernameTemplate] = React.useState(
    cells.config?.authCredentials?.usernameTemplate || ''
  );
  const [passwordTemplate, setPasswordTemplate] = React.useState(
    cells.config?.authCredentials?.passwordTemplate || ''
  );
  const [authKeyTemplate, setAuthKeyTemplate] = React.useState(
    cells.config?.authCredentials?.keyTemplate || ''
  );
  const [authCertTemplate, setAuthCertTemplate] = React.useState(
    cells.config?.authCredentials?.certTemplate || ''
  );
  const [disableSSLVerification, setDisableSSLVerification] = React.useState(
    cells.config?.disableSSLVerification || false
  );
  const [caCertTemplate, setCaCertTemplate] = React.useState(
    cells.config?.caCertTemplate || ''
  );
  const debouncedCert = useDebounce(caCertTemplate, 2000);
  const [encodingTemplate, setEncodingTemplate] = React.useState(
    cells.config?.encodingTemplate || EncodingData[0]
  );
  const [responsePath, setResponsePath] = React.useState(
    cells.config?.responsePath || ''
  );
  const [errorBehavior, setErrorBehavior] = React.useState(
    cells.config?.errorBehavior || ''
  );
  const [errorPath, setErrorPath] = React.useState(
    cells.config?.errorPath || ''
  );

  const [tags, setTags] = React.useState<any[]>(cells.config?.headerInfo || []);
  const [cascader, setCascader] = React.useState([]);

  const [count, setCount] = React.useState(0);

  React.useEffect(() => {
    setReqMethod(cells.config?.method),
      setUriTemplate(cells.config?.uriTemplate),
      setTimeoutTemplate(cells.config?.timeoutTemplate),
      setRequestEncodingTemplate(cells.config?.requestEncodingTemplate),
      setBodyTemplate(cells.config?.bodyTemplate),
      setAuthType(cells.config?.authType),
      setUsernameTemplate(
        cells.config?.authCredentials?.React.usernameTemplate
      ),
      setPasswordTemplate(cells.config?.authCredentials?.passwordTemplate),
      setAuthCertTemplate(cells.config?.authCredentials?.certTemplate),
      setAuthKeyTemplate(cells.config?.authCredentials?.keyTemplate),
      setDisableSSLVerification(cells.config?.disableSSLVerification),
      setCaCertTemplate(cells.config?.caCertTemplate),
      setEncodingTemplate(cells.config?.encodingTemplate),
      setResponsePath(cells.config?.responsePath),
      setErrorBehavior(cells.config?.errorBehavior),
      setErrorPath(cells.config?.errorPath),
      setTags(cells.config?.headerInfo || []);
  }, [props.cellId]);

  React.useEffect(() => {
    props.cell?.prop('config', {
      method,
      uriTemplate,
      timeoutTemplate,
      requestEncodingTemplate,
      bodyTemplate,
      authType,
      config: {
        authCredentials: {
          usernameTemplate,
          passwordTemplate,
          certTemplate: authCertTemplate,
          keyTemplate: authKeyTemplate,
        },
      },
      disableSSLVerification,
      caCertTemplate,
      encodingTemplate,
      responsePath,
      errorBehavior,
      errorPath,
      headerInfo: [...tags],
    });
  }, [
    props.cellId,
    method,
    uriTemplate,
    timeoutTemplate,
    requestEncodingTemplate,
    bodyTemplate,
    authType,
    usernameTemplate,
    passwordTemplate,
    authCertTemplate,
    authKeyTemplate,
    disableSSLVerification,
    caCertTemplate,
    encodingTemplate,
    responsePath,
    errorBehavior,
    errorPath,
    tags,
  ]);

  const onEditChange = (newValue: string) => {
    setBodyTemplate(newValue);
    setCount(count + 1);
  };
  const onOpenDialog = () => {
    setVisible(true);
  };
  const onOpenBodyDialog = () => {
    setBodyVisible(true);
  };
  const handleOk = () => {
    setConfirmLoading(true);
    setTimeout(() => {
      setVisible(false);
      setBodyVisible(false);
      setConfirmLoading(false);
    }, 500);
  };
  const handleCancel = () => {
    console.log('Clicked cancel button');
    setVisible(false);
    setBodyVisible(false);
  };
  const handleReqMethodChange = (value: string) => {
    setReqMethod(value);
    setCount(count + 1);
  };
  const requestHeadOption = Object(options).map(
    (item: { value: string; label: string }) => {
      return {
        value: item.value,
        label: item.label,
        children: optionV,
      };
    }
  );
  const handleClose = (removedTag: string[]) => {
    const tempTags = tags.filter(
      (tag: { key: string; valueTemplate: string }) =>
        JSON.stringify(tag) !== JSON.stringify(removedTag)
    );
    setTags(tempTags);
    setCount(count + 1);
    console.log(tempTags, tags);
  };

  return (
    <Space direction="vertical">
      <Divider plain>Request</Divider>
      <Row>Request Method</Row>
      <Row>
        <Select
          defaultValue={ReqMethodData[0]}
          value={method}
          onChange={handleReqMethodChange}
          style={{ width: '100%' }}>
          {ReqMethodData.map((type) => (
            <Option key={type}>{type}</Option>
          ))}
        </Select>
      </Row>
      <Row>URL Template</Row>
      <Row>
        <Input
          placeholder="http://foo.com,{{data.foo}}"
          value={uriTemplate}
          onChange={(e) => {
            setUriTemplate(e.target.value);
            setCount(count + 1);
          }}
        />
      </Row>
      <Row>Timeout Template(Seconds)</Row>
      <Row>
        <Input
          placeholder="30,{{data.timeout}}"
          value={timeoutTemplate}
          onChange={(e) => {
            setTimeoutTemplate(e.target.value);
            setCount(count + 1);
          }}
        />
      </Row>
      {method !== 'GET' && method !== 'DELETE' ? (
        <>
          <Row>Body Encoding Type</Row>
          <Row>
            <Select
              defaultValue={EncodingData[0]}
              value={requestEncodingTemplate}
              onChange={(e) => {
                setRequestEncodingTemplate(e);
                setCount(count + 1);
              }}
              style={{ width: '100%' }}>
              {EncodingData.map((type) => (
                <Option key={type}>{type}</Option>
              ))}
            </Select>
          </Row>
          <Row>Body Template</Row>
          <Row>
            <Card
              style={{ width: 240 }}
              bodyStyle={{ width: 220, overflow: 'auto', padding: '8px' }}
              onClick={onOpenBodyDialog}>
              <pre>{debouncedEdit}</pre>
              <ExpandOutlined
                style={{ float: 'right', top: '10px' }}
                onClick={onOpenBodyDialog}
              />
            </Card>
            <Modal
              title="Title1"
              visible={bodyVisible}
              onOk={handleOk}
              confirmLoading={confirmLoading}
              onCancel={handleCancel}
              width={1000}>
              <AceEditor
                mode="javascript"
                theme="tomorrow"
                name="editor"
                onChange={onEditChange}
                // value={editValue}
                value={bodyTemplate}
                fontSize={14}
                style={{ width: '900px' }}
                editorProps={{ $blockScrolling: true }}
              />
            </Modal>
          </Row>
        </>
      ) : null}

      <Divider plain>Request Headers</Divider>
      <Row>Name Template</Row>
      <Row align="middle">
        <Cascader
          options={requestHeadOption}
          style={{ width: 240 }}
          value={cascader}
          onChange={(value: any) => {
            setTags([
              ...tags,
              {
                key: value[0],
                valueTemplate: value[1],
              },
            ]);
            // setCascader([])
            setCount(count + 1);
          }}
          placeholder="Please select"
        />

        {tags?.map((tag, index) => {
          const show = `${tag.key} / ${tag.valueTemplate}`;
          // const show = tag.join('/')
          return (
            <Tag
              className="edit-tag"
              key={tag.key + tag.valueTemplate}
              closable
              onClose={() => handleClose(tag)}>
              {show.length > 33 ? `${show.slice(0, 33)}...` : show}
            </Tag>
          );
        })}
      </Row>
      <Divider plain>Authorization</Divider>
      <Row>Authorization Type</Row>
      <Row>
        <Select
          defaultValue={'none'}
          value={authType}
          onChange={(e) => {
            setAuthType(e);
            setCount(count + 1);
          }}
          style={{ width: '100%' }}>
          <Option key={'none'}>None</Option>
          <Option key={'basic'}>Basic</Option>
          <Option key={'clientCert'}>Client Certification</Option>
        </Select>
      </Row>
      {authType === 'basic' ? (
        <>
          <Row>React.username</Row>
          <Row>
            <Input
              placeholder="e.g.myReact.user or {{data.React.username}}"
              value={usernameTemplate}
              onChange={(e) => {
                setUsernameTemplate(e.target.value);
                setCount(count + 1);
              }}
            />
          </Row>
          <Row>Password</Row>
          <Row>
            <Input
              placeholder="e.g.mypassword or {{data.password}}"
              value={passwordTemplate}
              onChange={(e) => {
                setPasswordTemplate(e.target.value);
                setCount(count + 1);
              }}
            />
          </Row>
        </>
      ) : authType === 'clientCert' ? (
        <>
          <Row>Client Certificate Key</Row>
          <Row>
            <AceEditor
              mode="javascript"
              theme="tomorrow"
              name="authKey"
              onChange={(newValue: string) => {
                setAuthKeyTemplate(newValue);
                setCount(count + 1);
              }}
              // value={editValue}
              value={authKeyTemplate}
              fontSize={14}
              style={{ width: '240px' }}
              editorProps={{ $blockScrolling: true }}
              height={'250px'}
            />
          </Row>
          <Row>Client Certificate</Row>
          <Row>
            <AceEditor
              mode="javascript"
              theme="tomorrow"
              name="authCert"
              onChange={(newValue: string) => {
                setAuthCertTemplate(newValue);
                setCount(count + 1);
              }}
              // value={editValue}
              value={authCertTemplate}
              fontSize={14}
              height={'250px'}
              style={{ width: '240px' }}
              editorProps={{ $blockScrolling: true }}
            />
          </Row>
        </>
      ) : null}
      <Divider plain>SSL Options</Divider>
      <Row>
        <Checkbox
          checked={disableSSLVerification}
          onChange={(e) => {
            setDisableSSLVerification(e.target.checked);
            setCount(count + 1);
          }}>
          Disable SSL Verification?
        </Checkbox>
      </Row>
      {!disableSSLVerification ? (
        <Row>
          <Card
            extra={<ExpandOutlined onClick={onOpenDialog} />}
            style={{ width: 220 }}
            bodyStyle={{ width: 220, overflow: 'auto' }}>
            <pre>{debouncedCert}</pre>
          </Card>
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
              name="certEditor"
              onChange={(newValue: string) => {
                setCaCertTemplate(newValue);
                setCount(count + 1);
              }}
              // value={editValue}
              value={caCertTemplate}
              fontSize={14}
              style={{ width: '900px' }}
              editorProps={{ $blockScrolling: true }}
            />
          </Modal>
        </Row>
      ) : null}

      <Divider plain>Response</Divider>
      <Row>Response Encoding Type</Row>
      <Row>
        <Select
          defaultValue={EncodingData[0]}
          value={encodingTemplate}
          onChange={(e) => {
            setEncodingTemplate(e);
            setCount(count + 1);
          }}
          style={{ width: '100%' }}>
          {EncodingData.map((type) => (
            <Option key={type}>{type}</Option>
          ))}
        </Select>
      </Row>
      <Row>Payload Path to Store Response</Row>
      <Row>
        <Input
          placeholder="e.g. data.foo.[0].bar"
          value={responsePath}
          onChange={(e) => {
            setResponsePath(e);
            setCount(count + 1);
          }}
        />
      </Row>
      <Divider plain>Error</Divider>
      <Row>
        <Radio.Group
          value={errorBehavior}
          onChange={(e) => {
            setErrorBehavior(e.target.value);
            setCount(count + 1);
          }}>
          <Space direction="vertical">
            <Radio value={'throw'}>Error The Workflow</Radio>
            <Radio value={'payloadPath'}>
              Store HTTP Error At Payload Path
            </Radio>
          </Space>
        </Radio.Group>
      </Row>
      {errorBehavior === 'payloadPath' ? (
        <>
          <Row>Store Error Response</Row>
          <Row>
            <Input
              placeholder="e.g. data.foo.[0].error"
              value={errorPath}
              onChange={(e) => {
                setErrorPath(e.target.value);
                setCount(count + 1);
              }}
            />
          </Row>
        </>
      ) : null}
    </Space>
  );
};
