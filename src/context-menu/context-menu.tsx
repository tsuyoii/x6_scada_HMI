import { Menu } from '@antv/x6-react-components';
import * as React from 'react';
import {
  UndoOutlined,
  RedoOutlined,
  ScissorOutlined,
  CopyOutlined,
  SnippetsOutlined,
  DeleteOutlined,
  VerticalAlignTopOutlined,
  VerticalAlignBottomOutlined,
  ArrowUpOutlined,
  ArrowDownOutlined,
  GroupOutlined,
  BlockOutlined,
} from '@ant-design/icons';
import { message } from 'antd';
import '@antv/x6-react-components/es/menu/style/index.css';
import FlowGraph from '../graph';
import { Cell, Shape } from '@antv/x6';
import { ports } from '../graph/shape';

const MenuItem = Menu.Item;
const Divider = Menu.Divider;
export const ContextMenu = (props?: any) => {
  const { graph } = FlowGraph;
  const [menuClick, setMenuClick] = React.useState(0);
  const [selected, setSelected] = React.useState<Cell[]>([]);

  const onMenuClick = (name: string) => {
    setMenuClick(menuClick + 1);
    // message.success(`${name} clicked`, 10);
    const menu = document.getElementById('contextMenu');
    if (menu) menu.style.display = 'none';
    onContextChoice(name);
  };

  const onContextChoice = (name: string) => {
    const { graph } = FlowGraph;
    const selectNode = graph?.getSelectedCells();
    setSelected(selectNode);
    if (selectNode.length > 0) {
      console.log('onContextChoice: ' + name);
      switch (name) {
        case 'top':
          selectNode[0].toFront();
          break;
        case 'bottom':
          selectNode[0].toBack();
          break;
        case 'up':
          const uplevel = selectNode[0].getZIndex() || 1;
          selectNode[0].setZIndex(uplevel + 1);
          message.success(`${name} clicked`, 10);
          break;
        case 'down':
          const downlevel = selectNode[0].getZIndex() || 1;
          selectNode[0].setZIndex(downlevel - 1);
          message.success(`${name} clicked`, 10);
          break;
        case 'combine':
          // if (selected.length > 1) {
          //   selected.forEach((cell, index) => {
          //     if (index !== 0) {
          //       selected[0].embed(cell);
          //     }
          //     cell.setProp('combine', selected[0].id);
          //   });
          // }
          if (selectNode.length > 1) {
            const combine = onCombine(graph, selectNode);
            graph?.addNode(combine);
            combine.toFront();
            if (selectNode?.length > 1) {
              selectNode.forEach((cell) => {
                combine.embed(cell);
              });
            }
            message.success(`${name} clicked`, 10);
          }

          break;
        case 'uncombine':
          const combineNode = graph?.getSelectedCells()[0];
          if (combineNode.data?.parent) {
            const children = combineNode.getChildren();
            if (children) {
              children.forEach((item) => {
                combineNode.unembed(item);
              });
            }
            graph?.removeCell(combineNode);
          }

          console.log(graph.getSelectedCellCount());
          break;
        case 'undo':
          if (graph.history.canUndo()) {
            graph.history.undo();
          }
          break;
        case 'redo':
          if (graph.history.canRedo()) {
            graph.history.redo();
          }
          break;
        case 'cut':
          if (selectNode.length) {
            graph.cut(selectNode);
          }
          break;
        case 'copy':
          graph.copy(selectNode);
          message.success(`${name} clicked`, 10);
          break;
        case 'paste':
          if (!graph.isClipboardEmpty()) {
            const cells = graph.paste({ offset: 32 });
            graph.cleanSelection();
            // graph.select(cells);
            message.success(`${name} clicked`, 10);
          }
          break;
        case 'delete':
          if (
            !(
              selectNode[0].hasTool('node-editor') ||
              selectNode[0].hasTool('edge-editor')
            )
          ) {
            // 没有在编辑状态
            if (selectNode.length) {
              graph.removeCells(selectNode);
            }
          }
          break;
        default:
          break;
      }
    }
  };

  const onCombine = (graph?: any, selected?: Cell[]) => {
    const rect = graph?.getCellsBBox(selected);
    console.log(graph, rect, 'rect');
    let combine = new Shape.Rect({
      name: 'combine',
      x: rect?.x,
      y: rect?.y,
      width: rect?.width,
      height: rect?.height,
      text: '',
      paddingLeft: 0,
      paddingRight: 0,
      paddingTop: 0,
      paddingBottom: 0,
      attrs: {
        body: {
          fill: 'transparent',
          strokeWidth: 0,
        },
      },
      strokeStyle: 'transparent',
      data: {
        parent: true,
      },
      ports: {
        ...ports,
        items: [
          {
            id: 'top',
            group: 'top',
          },
          {
            id: 'bottom',
            group: 'bottom',
          },
          {
            id: 'right',
            group: 'right',
          },
          {
            id: 'left',
            group: 'left',
          },
        ],
      },
    });
    return combine;
  };

  return (
    <div style={{ position: 'fixed', display: 'none' }} id="contextMenu">
      <div style={{ display: 'inline-block', marginLeft: 32 }}>
        <Menu hasIcon={true} onClick={onMenuClick}>
          <MenuItem
            name="top"
            icon={<VerticalAlignTopOutlined />}
            text="置顶"
          />
          <MenuItem
            name="bottom"
            icon={<VerticalAlignBottomOutlined />}
            text="置底"
          />
          <MenuItem name="up" icon={<ArrowUpOutlined />} text="上移一层" />
          <MenuItem name="down" icon={<ArrowDownOutlined />} text="下移一层" />
          <Divider />
          <MenuItem
            name="combine"
            icon={<GroupOutlined />}
            text="组合"
            active={true}
          />
          <MenuItem name="uncombine" icon={<BlockOutlined />} text="取消组合" />
          <Divider />
          <MenuItem
            name="undo"
            icon={<UndoOutlined />}
            hotkey="Cmd+Z"
            text="Undo"
            active={true}
          />
          <MenuItem
            name="redo"
            icon={<RedoOutlined />}
            hotkey="Cmd+Shift+Z"
            text="Redo"
          />
          <Divider />
          <MenuItem
            name="cut"
            icon={<ScissorOutlined />}
            hotkey="Cmd+X"
            text="Cut"
          />
          <MenuItem
            name="copy"
            icon={<CopyOutlined />}
            hotkey="Cmd+C"
            text="Copy"
          />
          <MenuItem
            name="paste"
            icon={<SnippetsOutlined />}
            hotkey="Cmd+V"
            // disabled={!graph?.isClipboardEmpty()}
            text="Paste"
          />
          <MenuItem
            name="delete"
            icon={<DeleteOutlined />}
            hotkey="Delete"
            text="Delete"
          />
        </Menu>
      </div>
    </div>
  );
};
