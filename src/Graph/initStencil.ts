import { Addon, Graph, Shape } from "@antv/x6"
import './shape'
import { ports } from "./shape"
import '@antv/x6-react-shape';

export const initStencil = (graph:Graph,groups?:any) => {
    const stencil = new Addon.Stencil({
        title: 'SCADA',
        target: graph,
        stencilGraphWidth: 180,
        stencilGraphHeight: document.body.offsetHeight - 105,
        collapsable: true,
        // 自适应
        // stencilGraphHeight: 0,
        groups: groups,
        layoutOptions: {
            columns: 1,
            // columnWidth: 95,
            columnWidth: 160,
            rowHeight: 55,
        },
        // 设置拖入画布时图片的大小
        getDropNode(node) {
            if(node.getProp('dragnode')){
              return graph.addNode({
                width: 300,
                height: 150,
                attrs: {
                  label: {
                    text:'标题',
                    refX: '10px',
                    refY: '-15px',
                  }
                },
                shape: 'react-shape',
                component: node.getProp('dragnode'),
                meta: {
                  category: 'chart'
                },
              })
            }
            const size = node.size()
            // return node.clone().size(size.width * 0.6, size.height * 1)
            return node.clone().size(size.width * 2, size.height * 2)
        }
    })
    return stencil;
}

export const initSystemStencil = (graph:Graph) => {
  // 基础形状
  // 矩形
  const r0_1 = new Shape.Rect({
    width: 30,
    height: 30,
    attrs: {
      body: {
        fill: 'transparent',
        strokeWidth: 1,
        stroke: '#222222'
      },
    },
    ports: { ...ports },
  })
    // 圆角矩形
    const r0_2 = new Shape.Rect({
      width: 40,
      height: 20,
      attrs: {
        body: {
          fill: 'transparent',
          strokeWidth: 1,
          stroke: '#222222',
          rx: 5,
          ry: 5,
        },
      },
      ports: { ...ports },
    })
    // 圆形
    const r0_3 = new Shape.Circle({
      width: 30,
      height: 30,
      attrs: {
        body: {
          fill: 'transparent',
          strokeWidth: 1,
          stroke: '#222222'
        },
      },
      ports: { ...ports },
    });
    // 椭圆型
    const r0_4 = new Shape.Ellipse ({
      width: 40,
      height: 20,
      attrs: {
        body: {
          fill: 'transparent',
          strokeWidth: 1,
          stroke: '#222222'
        },
      },
      ports: { ...ports },
    })

    // 文本框
    const r0_5 = new Shape.Rect({
      width: 60,
      height: 10,
      label:'文本',
      attrs: {
        body: {
          fill: 'transparent',
          strokeWidth: 0,
          stroke: '#222222',
        },
      },
      ports: { ...ports },
    })
    // 五角星
    // const r0_6 = new Shape.Polygon ({
    //   width: 30,
    //   height: 30,
    //   points:
    //     '26.934,1.318 35.256,18.182 53.867,20.887 40.4,34.013 43.579,52.549 26.934,43.798 10.288,52.549 13.467,34.013 0,20.887 18.611,18.182',
    //   attrs: {
    //     body: {
    //       fill: 'transparent',
    //       strokeWidth: 1,
    //     },
    //   },
    //   ports: { ...ports },
    // })
    // 圆柱
    const r0_6 = new Shape.Cylinder ({
      width: 30,
      height: 40,
      attrs: {
        top: {
          fill: 'transparent',
          strokeWidth: 1,
          stroke: '#222222'
        },
        body: {
          fill: 'transparent',
          strokeWidth: 1,
          stroke: '#222222'
        },
      },
      ports: { ...ports },
    })
    const r0_7 = new Shape.Polygon ({
      width: 30,
      height: 30,
      // 使用 points 属性指定多边形的顶点，相当于指定多边形的 refPoints 属性
      // https://x6.antv.vision/zh/docs/api/registry/attr#refpointsresetoffset
      points: '0,10 10,0 20,10',
      attrs: {
        body: {
          fill: 'transparent',
          strokeWidth: 1,
          stroke: '#222222'
        },
      },
      ports: { ...ports },
    })

// 图表
const rt = graph.createNode({
  shape: 'ais-chart',
  width:40,
  height:40,
  label:'ais-chart',
  // attrs: {
  //   body: {
  //     fill: 'red'
  //   }
  // }
})

  // 开始
  const r1 = graph.createNode({
    shape: 'custom-start',
    label: '开始',
    attrs: {
      body: {
        rx: 20,
        ry: 26,
      },
    },
    category: 'choose',
    config: 'hhh',
  });
  // timer
  const r1_1 = graph.createNode({
    shape: 'custom-start',
    label: '⏱️ Timer',
    attrs: {
      body: {
        rx: 6,
        ry: 6,
        // fill: '#283a5b',
        // stroke: '#283a5b',
      },
      // label: {
      //     // fill: '#e9a2b9',
      //     refX: 10, // x 轴偏移，类似 css 中的 margin-left
      //     textAnchor: 'left', // 左对齐
      // }
    },
    config: {
      seconds: 60,
    },
    meta: {
      category: 'timer',
      timeAt: '',
      timerTypeSelect: 'seconds',
      weekdays: [],
    },
  });
  // virtual-button
  const r1_2 = graph.createNode({
    shape: 'custom-start',
    label: 'Virtual',
    attrs: {
      body: {
        rx: 6,
        ry: 6,
      },
    },
    meta: {
      payload: '',
    },
  });
  // trigger_mqtt
  const r1_3 = graph.createNode({
    shape: 'custom-start',
    label: 'MQTT',
    attrs: {
      body: {
        rx: 6,
        ry: 6,
      },
    },
    meta: {
      category: 'trigger_mqtt',
      payload: '',
    },
  });
  // serial
  const r1_4 = graph.createNode({
    shape: 'custom-start',
    label: 'Serial',
    attrs: {
      body: {
        rx: 6,
        ry: 6,
      },
    },
    meta: {
      category: 'serial',
      payload: '',
    },
  });

  // function
  const r2_1 = graph.createNode({
    shape: 'custom-logic',
    label: 'Function',
    attrs: {
      body: {
        rx: 6,
        ry: 6,
      },
    },
    meta: {
      category: 'function',
      payload: '',
    },
  });

  // data
  // runExec
  const r3_1 = graph.createNode({
    shape: 'custom-data',
    label: 'Run Executable',
    meta: {
      category: 'runExec',
      payload: '',
    },
  });
  // tensorFlow
  const r3_2 = graph.createNode({
    shape: 'custom-data',
    label: 'TensorFlow: Predict',
    meta: {
      category: 'tensorFlow',
      payload: '',
    },
  });
  // serial_write
  const r3_3 = graph.createNode({
    shape: 'custom-data',
    label: 'Serial: Write',
    meta: {
      category: 'serial_write',
    },
  });
  // aws_lambda
  const r3_4 = graph.createNode({
    shape: 'custom-data',
    label: 'AWS Lambda',
    meta: {
      category: 'aws_lambda',
    },
  });
  // modbus_read
  const r3_5 = graph.createNode({
    shape: 'custom-data',
    label: 'Modbus: Read',
    meta: {
      category: 'modbus_read',
    },
  });

  // output_mqtt
  const r4_1 = graph.createNode({
    shape: 'custom-end',
    label: 'MQTT',
    meta: {
      category: 'output_mqtt',
    },
  });
  const r4_2 = graph.createNode({
    shape: 'custom-end',
    label: 'HTTP',
    meta: {
      category: 'http',
    },
  });
  const r4_3 = graph.createNode({
    shape: 'custom-end',
    label: 'Debug',
    meta: {
      category: 'debug',
    },
  });

  // 过程
  const r2 = graph.createNode({
    shape: 'custom-rect',
    label: '过程',
  });
  // 可选过程
  const r3 = graph.createNode({
    shape: 'custom-choose',
    attrs: {
      body: {
        rx: 6,
        ry: 6,
      },
    },
    label: '可选过程',
  });
  // 决策
  const r4 = graph.createNode({
    shape: 'custom-polygon',
    attrs: {
      body: {
        refPoints: '0,10 10,0 20,10 10,20',
      },
    },
    label: '决策',
  });
  // 数据
  const r5 = graph.createNode({
    shape: 'custom-polygon',
    attrs: {
      body: {
        refPoints: '10,0 40,0 30,20 0,20',
      },
    },
    label: '数据',
  });
  // 连接
  const r6 = graph.createNode({
    shape: 'custom-circle',
    label: '连接',
  });
  // stencil.load([r1, r1_1, r1_2, r1_3, r1_4],'group1')

  const imageShapes = [
    {
      label: 'Client',
      image:
        'https://gw.alipayobjects.com/zos/bmw-prod/687b6cb9-4b97-42a6-96d0-34b3099133ac.svg',
    },
    {
      label: 'Http',
      image:
        'https://gw.alipayobjects.com/zos/bmw-prod/dc1ced06-417d-466f-927b-b4a4d3265791.svg',
    },
    {
      label: 'Api',
      image:
        'https://gw.alipayobjects.com/zos/bmw-prod/c55d7ae1-8d20-4585-bd8f-ca23653a4489.svg',
    },
    {
      label: 'Sql',
      image:
        'https://gw.alipayobjects.com/zos/bmw-prod/6eb71764-18ed-4149-b868-53ad1542c405.svg',
    },
    {
      label: 'Clound',
      image:
        'https://gw.alipayobjects.com/zos/bmw-prod/c36fe7cb-dc24-4854-aeb5-88d8dc36d52e.svg',
    },
    {
      label: 'Mq',
      image:
        'https://gw.alipayobjects.com/zos/bmw-prod/2010ac9f-40e7-49d4-8c4a-4fcf2f83033b.svg',
    },
  ];
  const imageNodes = imageShapes.map((item) =>
    graph.createNode({
      shape: 'custom-image',
      label: item.label,
      attrs: {
        image: {
          'xlink:href': item.image,
        },
      },
    })
  );

  const groups = [
    {
      title: 'COMMON',
      name: 'group0',
      graphHeight: 150,
      layoutOptions: {
          rowHeight: 40,
          columns: 3,
          columnWidth: 50,
      },
  },
    {
        title: 'TRIGGERS',
        name: 'group1',
        graphHeight: 220,
        layoutOptions: {
        rowHeight: 50,
        },
    },
    {
        title: 'LOGIC',
        name: 'group2',
        graphHeight: 70,
        layoutOptions: {
        rowHeight: 50,
        },
    },
    {
        title: 'DATA',
        name: 'group3',
        graphHeight: 320,
        layoutOptions: {
        rowHeight: 50,
        },
    },
    {
        title: 'OUTPUTS',
        name: 'group4',
        graphHeight: 170,
        layoutOptions: {
        rowHeight: 50,
        },
    },
    {
        title: '基础流程图',
        name: 'group5',
        graphHeight: 250,
        layoutOptions: {
            rowHeight: 70,
            columns: 2,
            columnWidth: 80,
        },
    },
    {
        title: '系统设计图',
        name: 'group6',
        graphHeight: 250,
        layoutOptions: {
            rowHeight: 70,
            columns: 2,
            columnWidth: 80,
        },
    },
]
  const stencil = initStencil(graph,groups);
  console.log(stencil.findAttr('groups'))
  
  const stencilContainer = document.querySelector('#stencil');
  if (stencilContainer && !stencilContainer.hasChildNodes()) {
    stencil.load([r0_1, r0_2,r0_3,r0_4,r0_5,r0_7,r0_6, rt], 'group0');
    stencil.load([r1_1, r1_2, r1_3, r1_4], 'group1');
    stencil.load([r2_1], 'group2');
    stencil.load([r3_1, r3_2, r3_3, r3_4, r3_5], 'group3');
    stencil.load([r4_1, r4_2, r4_3], 'group4');
    stencil.load([r2, r3, r4, r5, r6], 'group5');
    stencil.load(imageNodes, 'group6');
    stencilContainer.appendChild(stencil.container);
  }
}

export const initImgStencil = (graph:Graph) => {
    const imgStencilContainer = document.querySelector('#imgstencil');
    const groups = [
        {        
            title: 'IMAGES',
            name: 'imgGroup',
            graphHeight: 300,
            layoutOptions: {
                rowHeight: 70,
                columns: 3,
                columnWidth: 60,
            }
        }
    ]
    const stencil = initStencil(graph,groups);
    if (imgStencilContainer && !imgStencilContainer.hasChildNodes()) {
      imgStencilContainer.appendChild(stencil.container);
    }
    return stencil;
}