import { Card, Modal, Row, Space } from 'antd';
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
const data = `/*
* payload variable contains current payload.
* e.g. payload.data.myValue
*
* You can modify the current payload variable
* or return an object that will entirely
* replace the payload.
*
* console.log() will write a message to
* the Debug tab.
*
* The Buffer object is available for
* complex parsing: https://nodejs.org/dist/latest-v6.x/docs/api/buffer.html
*/`;

export const FakeData: React.FC<Params> = (props) => {
  const [visible, setVisible] = React.useState(false);
  const [confirmLoading, setConfirmLoading] = React.useState(false);
  const [editValue, setEditValue] = React.useState(data);
  // 在要保存的地方使用debouncededit，这样可以一段时间之后再保存结果
  const debouncedEdit = useDebounce(editValue, 2000);

  React.useEffect(() => {
    if (props) {
      const cells = props.cell?.toJSON();
      setEditValue(cells.config?.script);
    }
  }, [props.cellId]);
  React.useEffect(() => {
    props.cell?.prop('config', {
      script: debouncedEdit,
    });
    // console.log('time',timer,unitType,transToSec(timer,unitType))
  }, [props.cellId, debouncedEdit]);

  const onEditChange = (newValue: string) => {
    setEditValue(newValue);
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
      <Row>
        <Card
          title="Function (JavaScript)"
          extra={<ExpandOutlined onClick={onOpenDialog} />}
          style={{ width: 220 }}
          bodyStyle={{ width: 220, overflow: 'auto' }}>
          <pre>{debouncedEdit}</pre>
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
    </Space>
  );
};
