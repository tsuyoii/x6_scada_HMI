import * as React from 'react';
import './header.css';
import {
  ZoomInOutlined,
  FormatPainterOutlined,
  ZoomOutOutlined,
  AlignCenterOutlined,
  AimOutlined,
  UnlockOutlined,
  EyeOutlined,
  LockOutlined,
  SaveOutlined,
  UndoOutlined,
  RedoOutlined,
  FolderOpenOutlined,
  FullscreenExitOutlined,
} from '@ant-design/icons';
import {
  Divider,
  Input,
  message,
  Space,
  Tooltip,
  Upload,
  UploadProps,
} from 'antd';
import FlowGraph from '../graph';
import { exportJSON } from '../utils/utils';

export const Header = (props?: any) => {
  const { graph } = FlowGraph;
  const [initgraph, setGraph] = React.useState(graph);
  const [zoom, setZoom] = React.useState('100%');
  const [lock, setLock] = React.useState(false);
  const [preview, setPreview] = React.useState(false);
  const [copyStyle, setCopyStyle] = React.useState<any>();

  React.useEffect(() => {
    // const { graph } = FlowGraph;
    setGraph(graph);
    setZoom(graph?.zoom() * 100 + '%');
  }, [graph]);

  graph?.on('scale', () => {
    setZoom(graph?.zoom() * 100 + '%');
  });
  // 放在这里报错了，graph.on()执行了多遍，因此需要在恰当的时候执行graph.off()关闭监听
  // graph?.on('node:selected', ({ cell }) => {
  //   console.log(cell.getAttrByPath('text/text'), copyStyle);
  //   if (copyStyle && copyStyle.isnode === cell.isNode()) {
  //     // console.log(copyStyle);
  //     cell.setAttrs(copyStyle.attrs);
  //   }
  // });
  React.useEffect(() => {
    if (!copyStyle) {
      initgraph?.off('cell:selected');
    }
    initgraph?.on('cell:selected', ({ cell }) => {
      console.log(cell.getAttrByPath('text/text'), copyStyle);
      if (copyStyle && copyStyle.isnode === cell.isNode()) {
        cell.setAttrs(copyStyle.attrs);
      }
    });
  }, [copyStyle]);

  const upprops: UploadProps = {
    showUploadList: false,
    action: '',
    accept: '.json',
    headers: {
      authorization: 'application/json',
    },
    beforeUpload: (file, fileList) => {
      onImportJson(file);
    },
  };

  const onSave = () => {
    if (props?.onSave) {
      props.onSave(graph?.toJSON());
      return;
    }
    exportJSON(graph?.toJSON(), `x6_scada_${new Date().getTime()}`);
  };

  const onImportJson = (file: Blob) => {
    // 创建FileReader对象读取
    const reader = new FileReader();
    reader.readAsText(file);
    reader.onload = () => {
      const data = JSON.parse(reader.result as string);
      console.log(data, 'jsondata');
      initgraph.fromJSON(data);
    };
  };

  const onUndo = () => {
    if (initgraph.history.canUndo()) {
      initgraph.history.undo();
    }
  };

  const onRedo = () => {
    if (initgraph.history.canRedo()) {
      initgraph.history.redo();
    }
  };

  const onCopyStyle = () => {
    if (copyStyle) {
      // 已经拷贝过样式，则再点一次就删除复制的样式
      setCopyStyle(undefined);
      return;
    }
    // 复制样式
    const select = initgraph.getSelectedCells();
    if (select.length > 1 || select.length === 0) {
      message.error('请选择一个节点或一条线段进行样式复制！');
      return;
    }

    if (select[0].isNode()) {
      const bodyOri = select[0].getAttrByPath('body');
      const textOri = select[0].getAttrByPath('text');
      setCopyStyle({
        copy: true,
        isnode: true,
        attrs: {
          body: {
            fill: (bodyOri as any).fill,
            stroke: (bodyOri as any).stroke,
            strokeWidth: (bodyOri as any).strokeWidth,
          },
          text: {
            fill: (textOri as any).fill,
            fontSize: (textOri as any).fontSize,
          },
        },
      });
      return;
    }
    if (select[0].isEdge()) {
      // 线
      const { lines, line1, line2 } = select[0].getAttrs();
      setCopyStyle({
        copy: true,
        isnode: false,
        attrs: {
          lines,
          line1,
          line2,
        },
      });
      return;
    }
  };

  const zoomLarge = () => {
    if (zoom === '900%') return;
    initgraph?.zoom(0.1);
    const scale = (initgraph?.zoom() * 100).toFixed(0);
    setZoom(scale + '%');
  };
  const zoomSmall = () => {
    if (zoom === '50%') return;
    initgraph?.zoom(-0.1);
    const scale = (initgraph?.zoom() * 100).toFixed(0);
    setZoom(scale + '%');
  };

  const onAutoFill = () => {
    // initgraph?.unlockScroller();
    initgraph?.zoomToFit({ maxScale: 1 });
    const scale = (initgraph?.zoom() * 100).toFixed(0);
    setZoom(scale + '%');
    // initgraph?.centerContent();
    // initgraph?.lockScroller();
    // initgraph?.scaleContentToFit();
    // const rect = initgraph?.getAllCellsBBox();
    // initgraph?.transitionToRect({
    //   x: rect?.x || 1,
    //   y: rect?.y || 1,
    //   width: rect?.width || 1,
    //   height: rect?.height || 1,
    // });
  };

  const onCenter = () => {
    initgraph?.centerContent();
  };

  const onLock = (lockE: boolean) => {
    initgraph.cleanSelection();
    const cells = initgraph.getCells();
    cells.forEach((cell) => {
      cell.setProp('lock', lockE);
    });
    setLock(lockE);
    initgraph.toggleRubberband();
  };

  const onPreview = () => {
    const stencilMenu = document.querySelector<HTMLElement>('.left-tab')!;
    stencilMenu.style.position = 'absolute';
    stencilMenu.style.left = '-200px';

    const configPanel = document.querySelector<HTMLElement>('.config')!;
    configPanel.style.display = 'none';

    onLock(true);
    onAutoFill();
    onCenter();
    setPreview(true);
  };

  const onExitPreview = () => {
    const stencilMenu = document.querySelector<HTMLElement>('.left-tab')!;
    stencilMenu.style.position = 'relative';
    stencilMenu.style.left = '0px';

    const configPanel = document.querySelector<HTMLElement>('.config')!;
    configPanel.style.display = 'block';

    onLock(false);
    onAutoFill();
    onCenter();
    setPreview(false);
  };

  return (
    <>
      <div className="menu-icon-list">
        <Space split={<Divider type="vertical" />}>
          <Tooltip placement="bottom" title={'保存'}>
            <SaveOutlined onClick={onSave} />
          </Tooltip>
          <Tooltip placement="bottom" title={'导入'}>
            <Upload {...upprops}>
              <FolderOpenOutlined />
            </Upload>
          </Tooltip>
          {!preview ? (
            <>
              <Tooltip placement="bottom" title={'撤销'}>
                <UndoOutlined
                  disabled={!initgraph?.history?.canUndo()}
                  onClick={onUndo}
                />
              </Tooltip>
              <Tooltip placement="bottom" title={'重做'}>
                <RedoOutlined
                  disabled={!initgraph?.history?.canRedo()}
                  onClick={onRedo}
                />
              </Tooltip>
              <Tooltip placement="bottom" title={'样式刷'}>
                <FormatPainterOutlined
                  style={{ color: copyStyle ? 'orange' : 'black' }}
                  onClick={onCopyStyle}
                />
                {/* <ClearOutlined /> */}
              </Tooltip>
            </>
          ) : null}

          <Input
            addonBefore={
              <Tooltip placement="bottom" title={'放大'}>
                <ZoomInOutlined onClick={zoomLarge} />
              </Tooltip>
            }
            addonAfter={
              <Tooltip placement="bottom" title={'缩小'}>
                <ZoomOutOutlined onClick={zoomSmall} />
              </Tooltip>
            }
            value={zoom}
            disabled
          />
          <Tooltip placement="bottom" title={'自适应'}>
            <AimOutlined onClick={onAutoFill} />
          </Tooltip>
          <Tooltip placement="bottom" title={'居中'}>
            <AlignCenterOutlined onClick={onCenter} />
          </Tooltip>
          {!preview ? (
            <>
              <Tooltip placement="bottom" title={lock ? '锁定' : '解锁'}>
                {lock ? (
                  <LockOutlined
                    onClick={() => onLock(false)}
                    style={{ color: 'orange' }}
                  />
                ) : (
                  <UnlockOutlined onClick={() => onLock(true)} />
                )}
              </Tooltip>
              {/* <LockOutlined /> */}
              <Tooltip placement="bottom" title={'预览'}>
                <EyeOutlined onClick={onPreview} />
              </Tooltip>{' '}
            </>
          ) : (
            <Tooltip placement="bottom" title={'退出预览'}>
              <FullscreenExitOutlined onClick={onExitPreview} />
            </Tooltip>
          )}
        </Space>
      </div>
    </>
  );
};
