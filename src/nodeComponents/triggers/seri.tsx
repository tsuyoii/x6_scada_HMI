import {
  Card,
  Col,
  Divider,
  Input,
  Modal,
  Row,
  Select,
  Space,
  Typography,
} from 'antd';
import * as React from 'react';
import brace from 'brace';
import AceEditor from 'react-ace';
import 'brace/mode/javascript';
import 'brace/theme/tomorrow';
import { useDebounce } from '../../utils/utils';
import { ExpandOutlined, PlusOutlined } from '@ant-design/icons';

interface Params {
  builder: string;
  cell?: any;
  cellId?: string;
}
const { Option } = Select;
const data = `function onLoad(editor) {
    console.log("I've loaded!");
  }`;
let index = 0;
export const FakeData: React.FC<Params> = (props) => {
  const prop = props.cell;
  const [visible, setVisible] = React.useState(false);
  const [confirmLoading, setConfirmLoading] = React.useState(false);
  const [editValue, setEditValue] = React.useState(data);
  // 在要保存的地方使用debouncededit，这样可以一段时间之后再保存结果
  const debouncedEdit = useDebounce(editValue, 2000);

  const onEditChange = (newValue: string) => {
    setEditValue(newValue);
    con();
  };
  const con = () => {
    console.log(debouncedEdit);
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
    <>
      <Row>
        <br />
        <label>MQTT Topic</label>
        <br />
        <Card
          title="Default size card"
          extra={<ExpandOutlined onClick={onOpenDialog} />}
          style={{ width: 300 }}>
          {debouncedEdit}
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
            name="editor"
            onChange={onEditChange}
            value={editValue}
            fontSize={14}
            style={{ width: '900px' }}
            editorProps={{ $blockScrolling: true }}
          />
        </Modal>
      </Row>
    </>
  );
};
