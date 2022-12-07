import { Edge } from '@antv/x6';
import { Checkbox, Col, Input, Row, Slider, Tabs } from 'antd';
import * as React from 'react';
import ColorPickerInput from '../../common/color-picker/color-picker';
import FlowGraph from '../../Graph';
import '../../index.css';

const { TabPane } = Tabs;

interface IProps {
  id: string;
}

interface EdgeAttrs {
  stroke?: string;
  strokeWidth?: number;
  fontSize?: number;
  animate?: boolean;
}

export default function (props: IProps) {
  const { id } = props;
  const [edgeLabel, setEdgeLabel] = React.useState<any>('');
  const [attrs, setAttrs] = React.useState<EdgeAttrs>({
    stroke: '#5F95FF',
    strokeWidth: 1,
    fontSize: 12,
    animate: false,
  });

  const edgeRef = React.useRef<Edge>();

  const setAttr = (key: string, val: any) => {
    setAttrs((prev) => ({
      ...prev,
      [key]: val,
    }));
  };

  React.useEffect(() => {
    if (id) {
      const { graph } = FlowGraph;
      const cell = graph.getCellById(id);
      if (!cell || !cell.isEdge()) {
        return;
      }
      edgeRef.current = cell;
      const labels = cell.getLabels();
      if (labels[0] && labels[0].attrs) {
        setEdgeLabel(labels[0].attrs?.label.text);
      } else {
        setEdgeLabel('');
      }
      setAttrs({
        stroke: cell.attr('line2/stroke'),
        strokeWidth: cell.attr('line2/strokeWidth'),
        animate: cell.attr('line2/style/animation'),
      });
    }
  }, [id]);

  const onEdgeLabelChange = (e: React.FocusEvent<HTMLInputElement>) => {
    setEdgeLabel(e.target.value);
    if (edgeRef.current) {
      edgeRef.current.setLabels([
        {
          attrs: { label: { text: e.target.value } },
        },
      ]);
    }
  };

  const onStrokeChange = (val: string) => {
    setAttr('stroke', val);
    edgeRef.current!.attr('line2/stroke', val);
  };

  const onStrokeWidthChange = (val: number) => {
    setAttr('strokeWidth', val);
    edgeRef.current!.attr('line2/strokeWidth', val);
    edgeRef.current!.attr('line1/strokeWidth', val);
  };

  const onAnimateChange = (e: any) => {
    const isOpen = e.target.checked;
    if (isOpen) {
      edgeRef.current!.attr(
        'line2/style/animation',
        'running-line 30s infinite linear'
      );
      edgeRef.current!.attr('lines/strokeDasharray', '8');
      edgeRef.current!.attr('lines/strokeLinejoin', 'round');
      edgeRef.current!.attr('line1/strokeDasharray', 0);
    } else {
      edgeRef.current!.attr('line2/style/animation', '');
      edgeRef.current!.attr('lines/strokeDasharray', '');
    }
    setAttr('animate', e.target.checked);
  };

  return (
    <Tabs defaultActiveKey="1">
      <TabPane tab="属性" key="1">
        <Row align="middle">
          <Col span={8}>标签</Col>
          <Col span={14}>
            <Input
              placeholder="标签内容"
              value={edgeLabel}
              onChange={onEdgeLabelChange}
            />
          </Col>
        </Row>
        <Row align="middle">
          <Col span={8}>线段颜色</Col>
          <Col span={14}>
            {/* <Input
              type="color"
              value={attrs.stroke}
              style={{ width: '100%' }}
              onChange={onStrokeChange}
            /> */}

            <ColorPickerInput value={attrs.stroke} onChange={onStrokeChange} />
          </Col>
        </Row>
        <Row align="middle">
          <Col span={8}>线段宽度</Col>
          <Col span={12}>
            <Slider
              min={1}
              max={10}
              step={1}
              value={attrs.strokeWidth}
              onChange={onStrokeWidthChange}
            />
          </Col>
          <Col span={2}>
            <div className="result">{attrs.strokeWidth}</div>
          </Col>
        </Row>
      </TabPane>
      <TabPane tab="动效" key="2">
        <Row align="middle">
          <Col span={8}>动效</Col>
          <Col span={12}>
            <Checkbox checked={attrs.animate} onChange={onAnimateChange}>
              开启动效
            </Checkbox>
          </Col>
        </Row>
      </TabPane>
      <TabPane tab="Tab 3" key="3">
        Content of Tab Pane 3
      </TabPane>
    </Tabs>
  );
}
