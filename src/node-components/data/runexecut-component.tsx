import {
  Button,
  Cascader,
  Checkbox,
  Divider,
  Input,
  Row,
  Select,
  Space,
  Tag,
} from 'antd';
import * as React from 'react';

interface Params {
  builder: string;
  cell?: any;
  cellId?: string;
}
const { Option } = Select;
const WOnEncodData = ['ascii', 'utf8', 'utf16le', 'base64', 'binary', 'hex'];
export const FakeData: React.FC<Params> = (props) => {
  const cells = props.cell?.toJSON();
  const [commandTemplate, setCommand] = React.useState(
    cells.config?.commandTemplate || ''
  );
  const [cwdTemplate, setCwd] = React.useState(cells.config?.cwdTemplate || '');
  const [detached, setDetached] = React.useState(
    cells.config?.detached || false
  );
  const [encodingTemplate, setEncoding] = React.useState(
    cells.config?.encodingTemplate
  );
  const [resultPath, setResultPath] = React.useState(
    cells.config?.resultPath || ''
  );
  const [keyTemplate, setKey] = React.useState('');
  const [valueTemplate, setValue] = React.useState('');

  const [tags, setTags] = React.useState<any[]>(
    cells.config?.envsTemplate || []
  );

  React.useEffect(() => {
    if (props) {
      const cells = props.cell?.toJSON();
      setCommand(cells.config?.commandTemplate);
      setCwd(cells.config?.cwdTemplate);
      setDetached(cells.config?.detached);
      setEncoding(cells.config?.encodingTemplate);
      setResultPath(cells.config?.resultPath);
      setTags(cells.config?.envsTemplate || []);
    }
  }, [props.cellId]);

  // React.useEffect(()=>{
  //     props.cell?.prop('config', {
  //         commandTemplate,
  //         cwdTemplate,
  //         detached,
  //         encodingTemplate,
  //         envsTemplate:[...tags],
  //         resultPath
  //     })
  // },[props.cellId,commandTemplate,
  //     cwdTemplate,
  //     detached,
  //     encodingTemplate,
  //     tags,
  //     resultPath])

  const changeVariables = () => {
    if (!keyTemplate || !valueTemplate) {
      return;
    }
    setTags([
      ...tags,
      {
        keyTemplate,
        valueTemplate,
      },
    ]);
    setKey('');
    setValue('');
  };
  const handleClose = (removedTag: string) => {
    const tempTags = tags.filter((tag) => tag?.keyTemplate !== removedTag);
    setTags(tempTags);
    console.log(tempTags, tags);
  };

  return (
    <Space direction="vertical">
      <Divider plain>Configuration</Divider>
      <Row>Command</Row>
      <Row>
        <Input
          placeholder="grep -c 'foo' {{data.filePath}}"
          value={commandTemplate}
          onChange={(v) => setCommand(v.target.value)}
        />
      </Row>
      <Row>Current Working Directory</Row>
      <Row>
        <Input
          placeholder="e.g./my/dir or {{myDirectory}}"
          value={cwdTemplate}
          onChange={(v) => setCwd(v.target.value)}
        />
      </Row>
      <Row>Encoding</Row>
      <Row>
        <Select
          defaultValue={WOnEncodData[0]}
          value={encodingTemplate}
          onChange={(v) => setEncoding(v)}
          style={{ width: '100%' }}>
          {WOnEncodData.map((type) => (
            <Option key={type}>{type}</Option>
          ))}
        </Select>
      </Row>
      <Row>
        <Checkbox
          checked={detached}
          onChange={(e) => setDetached(e.target.checked)}>
          Run in detached state?
        </Checkbox>
      </Row>
      <Divider plain>Environment Variables</Divider>
      <Row align="middle">
        <Input
          placeholder="key:e.g.MY_V"
          value={keyTemplate}
          onChange={(v) => setKey(v.target.value)}
          style={{ width: '40%' }}
        />
        <Input
          placeholder="value:e.g.MY_Value o"
          value={valueTemplate}
          onChange={(v) => setValue(v.target.value)}
          style={{ width: '40%' }}
        />
        <Button
          type={'primary'}
          onClick={changeVariables}
          size={'small'}
          style={{ display: 'inline-block' }}>
          添加
        </Button>
        {tags?.map((tag, index) => {
          const show = `${tag.keyTemplate} : ${tag.valueTemplate}`;
          return (
            <Tag
              className="edit-tag"
              key={tag.keyTemplate}
              closable
              onClose={() => handleClose(tag.keyTemplate)}>
              {show}
            </Tag>
          );
        })}
      </Row>
      <Divider plain>Result</Divider>
      <Row>Result Path</Row>
      <Row>
        <Input
          placeholder="e.g.data.execResult"
          value={resultPath}
          onChange={(v) => setResultPath(v.target.value)}
        />
      </Row>
    </Space>
  );
};
