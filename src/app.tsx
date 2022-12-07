// import React, { useState, useEffect } from 'react';
import * as React from 'react';
import FlowGraph from './Graph';
import './app.css';
import { Cell, Graph } from '@antv/x6';
import Config from './ConfigPanel/config';
import { CONFIG_TYPE } from './constant/enums';
import { Tabs } from 'antd';
import { ImgStencil } from './Graph/ImgStencil';
import { initImgStencil, initSystemStencil } from './Graph/initStencil';
import { ContextMenu } from './ContextMenu/contextMenu';
import { Header } from './Header/Header';

export default function App() {
  const apiUrl = process.env.REACT_APP_LOT_API_URL;
  console.log(apiUrl);

  // const [isReady, setIsReady] = useState(false)
  const [type, setType] = React.useState<CONFIG_TYPE>(CONFIG_TYPE.GRID);
  const [id, setID] = React.useState('');
  const [category, setCategory] = React.useState('');
  const [imgStencil, setImgStencil] = React.useState<any>();

  const getContainerSize = () => {
    return {
      width: document.body.offsetWidth - 214,
      height: document.body.offsetHeight - 50,
    };
  };

  React.useEffect(() => {
    const { graph } = FlowGraph.init();
    // setIsReady(true)
    fetchData(graph);
    graph.on('blank:click', () => {
      setType(CONFIG_TYPE.GRID);

      //将x6画布中绘制的data转换一下数据结构
      console.log(graph.toJSON(), 'tojson');
      const data = graph.toJSON();
      const output: any = {};
      data.cells.forEach((item) => {
        if (item.shape === 'edge') {
          let sour = item.source.cell;
          let left =
            item.source.port === 'bottom-left' ? item.target.cell : null;
          let right =
            item.source.port === 'bottom-right' ? item.target.cell : null;
          if (left || right) {
            if (output[sour] && (output[sour][0] || output[sour][1])) {
              //已经有其他选项的
              if (!output[sour][0]) {
                output[sour][0] = [];
              }
              if (!output[sour][1]) {
                output[sour][1] = [];
              }
              output[sour] = [
                //将null元素过滤掉,arr.filter(Boolean)
                [...output[sour][0], left].filter(Boolean),
                [...output[sour][1], right].filter(Boolean),
              ];
            } else {
              output[sour] = [[left].filter(Boolean), [right].filter(Boolean)];
              console.log('1');
            }
          }
          //否则outputIds只有一个输出，为一维数组
          else {
            // if(output[sour]){
            //   output[sour].push(item.target.cell)
            // }else{
            //   output[sour] = [item.target.cell]
            // }
            output[sour] = (output[sour] || []).concat(item.target.cell);
          }
        }
      });
      let keys = Object.keys(output);
      const arr = data.cells.filter((item) => {
        if (item.shape !== 'edge') {
          if (item.id && [...keys, undefined].includes(item.id)) {
            item.outputIds = output[item.id];
          }
          return item;
        }
      });
      console.log(output, arr);
    });
    graph.on('cell:click', ({ cell }) => {
      const data = cell.toJSON();
      setType(cell.isNode() ? CONFIG_TYPE.NODE : CONFIG_TYPE.EDGE);
      setID(cell.id);
      setCategory(data?.category || data?.meta?.category || '');
      // console.log(cell.toJSON(),'cell')
    });

    const resizeFn = () => {
      const { width, height } = getContainerSize();
      graph.resize(width, height);
    };
    resizeFn();

    window.addEventListener('resize', resizeFn);
    return () => {
      window.removeEventListener('resize', resizeFn);
    };
  }, []);

  const onTabsChange = (key: string) => {
    const { graph } = FlowGraph;
    if (key === '1') {
      setTimeout(() => {
        initSystemStencil(graph);
      }, 10);
    } else {
      setTimeout(() => {
        setImgStencil(initImgStencil(graph));
      }, 10);
    }
  };

  const fetchData = (graph: Graph) => {
    fetch(`${apiUrl}/mockdata/data1.json`, {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        // const cells: Cell[] = [];
        // data.forEach((item: any) => {
        //   if (item.shape === "custom-edge" || item.shape === "edge") {
        //     cells.push(graph.createEdge(item));
        //   } else {
        //     cells.push(graph.createNode(item));
        //   }
        // });
        // graph.resetCells(cells);
        // graph.zoomToFit({ padding: 10, maxScale: 1 });

        const cells: Cell[] = [];
        data.nodes.forEach((item: any) => {
          if (item.outputIds?.length) {
            item.outputIds[0].forEach((out: any) => {
              cells.push(
                graph.createEdge({
                  shape: 'edge',
                  markup: [
                    {
                      tagName: 'path',
                      selector: 'wrap',
                      groupSelector: 'lines',
                    },
                    {
                      tagName: 'path',
                      selector: 'line1',
                      groupSelector: 'lines',
                    },
                    {
                      tagName: 'path',
                      selector: 'line2',
                      groupSelector: 'lines',
                    },
                  ],
                  attrs: {
                    lines: {
                      connection: true,
                      fill: 'none',
                      targetMarker: null,
                      strokeWidth: 2,
                      // strokeDasharray: '8',
                      // strokeLinejoin: 'round',
                    },
                    line1: {
                      stroke: '#ffffff',
                      targetMarker: null,
                      strokeWidth: 2,
                    },
                    line2: {
                      stroke: '#A2B1C3',
                      strokeWidth: 2,
                      strokeDashoffset: 8,
                      targetMarker: null,
                    },
                  },
                  tools: {
                    name: 'segments',
                    args: {
                      snapRadius: 20,
                      attrs: {
                        fill: '#444',
                      },
                    },
                  },
                  source: {
                    cell: `${item.id}`,
                    port: 'bottom-left',
                  },
                  target: {
                    cell: `${out}`,
                    connectionPoint: 'boundary',
                  },
                })
              );
            });
            item.outputIds[1]?.forEach((out: any) => {
              cells.push(
                graph.createEdge({
                  shape: 'edge',
                  markup: [
                    {
                      tagName: 'path',
                      selector: 'wrap',
                      groupSelector: 'lines',
                    },
                    {
                      tagName: 'path',
                      selector: 'line1',
                      groupSelector: 'lines',
                    },
                    {
                      tagName: 'path',
                      selector: 'line2',
                      groupSelector: 'lines',
                    },
                  ],
                  attrs: {
                    lines: {
                      connection: true,
                      fill: 'none',
                      targetMarker: null,
                      strokeWidth: 2,
                      // strokeDasharray: '8',
                      // strokeLinejoin: 'round',
                    },
                    line1: {
                      stroke: '#ffffff',
                      targetMarker: null,
                      strokeWidth: 2,
                    },
                    line2: {
                      stroke: '#A2B1C3',
                      strokeWidth: 2,
                      strokeDashoffset: 8,
                      targetMarker: null,
                    },
                  },
                  tools: {
                    name: 'segments',
                    args: {
                      snapRadius: 20,
                      attrs: {
                        fill: '#444',
                      },
                    },
                  },
                  source: {
                    cell: `${item.id}`,
                    port: 'bottom-right',
                  },
                  target: {
                    cell: `${out}`,
                    connectionPoint: 'boundary',
                  },
                })
              );
            });
          }
          const node = {
            id: item.id,
            label: item.meta.label,
            attrs: { ...item.meta.attrs },
            shape: item.type,
            category: item.meta.category,
            config: { ...item.config },
            outputIds: { ...item.outputIds },
            position: {
              x: item.meta.x,
              y: item.meta.y,
            },
          };
          cells.push(graph.createNode(node));
        });
        graph.resetCells(cells);
        graph.zoomToFit({ padding: 10, maxScale: 1 });
      });
  };

  return (
    <div className={'wrap'}>
      <div className={'header'}>
        {/* <span className={'text'}>AISENZ</span> */}
        <Header />
      </div>
      <div className={'content'}>
        <Tabs
          defaultActiveKey="1"
          centered
          className="left-tab"
          onChange={onTabsChange}
          items={[
            {
              label: '系统组件',
              key: '1',
              children: <div id="stencil" className="app-side"></div>,
            },
            {
              label: `图片组件`,
              key: '2',
              children: <ImgStencil stencil={imgStencil} />,
              // children: <SystemStencil />,
            },
          ]}
        />
        {/* <div id="stencil" className="app-side"></div> */}
        <div id="container" className="app-content" />
        {/* <div id="minimap" className={'minimap'}></div> */}
        <Config type={type} id={id} category={category} />

        <ContextMenu />
      </div>
    </div>
  );
}
