import { Graph } from '@antv/x6';
import * as React from 'react';
import '@antv/x6-react-shape';
// import { register } from '@antv/x6-react-shape';
import LineChart from '../chart-components/line-chart';
import { LineChartOutlined } from '@ant-design/icons';

export const ports = {
  groups: {
    top: {
      position: 'top',
      attrs: {
        circle: {
          r: 4,
          magnet: true,
          stroke: '#5F95FF',
          strokeWidth: 1,
          fill: '#fff',
          style: {
            visibility: 'hidden',
          },
        },
      },
    },
    right: {
      position: 'right',
      attrs: {
        circle: {
          r: 4,
          magnet: true,
          stroke: '#5F95FF',
          strokeWidth: 1,
          fill: '#fff',
          style: {
            visibility: 'hidden',
          },
        },
      },
    },
    bottom: {
      position: 'bottom',
      attrs: {
        circle: {
          r: 4,
          magnet: true,
          stroke: '#5F95FF',
          strokeWidth: 1,
          fill: '#fff',
          style: {
            visibility: 'hidden',
          },
        },
      },
    },
    left: {
      position: 'left',
      attrs: {
        circle: {
          r: 4,
          magnet: true,
          stroke: '#5F95FF',
          strokeWidth: 1,
          fill: '#fff',
          style: {
            visibility: 'hidden',
          },
        },
      },
    },
  },
  items: [
    {
      id: 'top',
      group: 'top',
    },
    {
      id: 'right',
      group: 'right',
    },
    {
      id: 'bottom',
      group: 'bottom',
    },
    {
      id: 'left',
      group: 'left',
    },
  ],
};

//custom-rect
Graph.registerNode(
  'custom-rect',
  {
    inherit: 'rect',
    width: 66,
    height: 36,
    attrs: {
      body: {
        strokeWidth: 1,
        // stroke: "#5F95FF",
        // fill: "#EFF4FF"
        // fill: '#9b9ad8',
        // stroke: '#9b9ad8',
        fill: '#e9a2b9',
        stroke: '#e9a2b9',
      },
      text: {
        fontSize: 12,
        fill: '#fff',
      },
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
      ],
    },
  },
  true
);
//custom-start
Graph.registerNode('custom-start', {
  inherit: 'rect',
  width: 110,
  height: 38,
  attrs: {
    body: {
      strokeWidth: 2,
      // fill: '#5755a1',
      // fill: '#283a5b',
      fill: '#9cc6db',
      stroke: '#9cc6db',
      rx: 6,
      ry: 6,
    },
    text: {
      fontSize: 13,
      // fill: '#e9a2b9',
      fill: '#ffffff',
    },
  },
  ports: {
    ...ports,
    items: [
      {
        id: 'bottom',
        group: 'bottom',
      },
    ],
  },
});
//custom-logic
Graph.registerNode('custom-logic', {
  inherit: 'rect',
  width: 110,
  height: 38,
  attrs: {
    body: {
      strokeWidth: 2,
      fill: '#fdad26',
      stroke: '#fdad26',
    },
    text: {
      fontSize: 13,
      // fill: '#e9a2b9',
      fill: '#ffffff',
    },
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
    ],
  },
});
//custom-data
Graph.registerNode('custom-data', {
  inherit: 'rect',
  width: 110,
  height: 38,
  attrs: {
    body: {
      strokeWidth: 2,
      fill: '#9b9ad8',
      stroke: '#9b9ad8',
      rx: 6,
      ry: 6,
    },
    text: {
      fontSize: 12,
      fill: '#ffffff',
    },
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
    ],
  },
});
//custom-end
Graph.registerNode('custom-end', {
  inherit: 'rect',
  // width: 87,
  width: 110,
  height: 38,
  attrs: {
    body: {
      strokeWidth: 1,
      // stroke: "#5F95FF",
      // fill: "#EFF4FF"
      // fill: '#9b9ad8',
      fill: '#6877a8',
      stroke: '#6877a8',
      rx: 6,
      ry: 6,
    },
    text: {
      fontSize: 12,
      fill: '#fff',
    },
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
    ],
  },
});
//custom-choose
Graph.registerNode(
  'custom-choose',
  {
    inherit: 'rect',
    width: 66,
    height: 36,
    // attrs: {
    //   body: {
    //     strokeWidth: 1,
    //     stroke: "#5F95FF",
    //     fill: "#EFF4FF"
    //   },
    //   text: {
    //     fontSize: 12,
    //     fill: "#262626"
    //   }
    // },
    attrs: {
      body: {
        strokeWidth: 1,
        // fill: '#5755a1',
        // fill: '#e9a2b9',
        fill: '#9b9ad8',
        stroke: '#9b9ad8',
      },
      text: {
        fontSize: 12,
        fill: '#fff',
      },
    },
    ports: {
      ...ports,
      items: [
        {
          id: 'top',
          group: 'top',
        },
        {
          id: 'bottom-left',
          group: 'bottom',
        },
        {
          id: 'bottom-right',
          group: 'bottom',
        },
      ],
    },
  },
  true
);
//custom-polygon
Graph.registerNode(
  'custom-polygon',
  {
    inherit: 'polygon',
    width: 66,
    height: 36,
    attrs: {
      body: {
        strokeWidth: 1,
        fill: '#9b9ad8',
        stroke: '#9b9ad8',
      },
      text: {
        fontSize: 12,
        fill: '#fff',
      },
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
      ],
    },
  },
  true
);
//custom-circle
Graph.registerNode(
  'custom-circle',
  {
    inherit: 'circle',
    width: 45,
    height: 45,
    attrs: {
      body: {
        strokeWidth: 1,
        // stroke: "#5F95FF",
        // fill: "#EFF4FF"
        // fill: '#9b9ad8',
        fill: '#6877a8',
        stroke: '#6877a8',
      },
      text: {
        fontSize: 12,
        fill: '#fff',
      },
    },
    ports: { ...ports },
  },
  true
);
//custom-edge
Graph.registerEdge(
  'custom-edge',
  {
    inherit: 'edge',
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
  },
  true
);
//custom-image
Graph.registerNode(
  'custom-image',
  {
    inherit: 'rect',
    width: 52,
    height: 52,
    markup: [
      {
        tagName: 'rect',
        selector: 'body',
      },
      {
        tagName: 'image',
      },
      {
        tagName: 'text',
        selector: 'label',
      },
    ],
    attrs: {
      body: {
        // stroke: '#6a77a9',
        stroke: '#6877a8',
        fill: '#6877a8',
        // fill: '#5F95FF',
      },
      image: {
        width: 26,
        height: 26,
        refX: 13,
        refY: 16,
      },
      label: {
        refX: 3,
        refY: 2,
        textAnchor: 'left',
        textVerticalAnchor: 'top',
        fontSize: 12,
        fill: '#fff',
      },
    },
    ports: { ...ports },
  },
  true
);

// // my-image
Graph.registerNode(
  'ais-image',
  {
    inherit: 'image',
    width: 52,
    height: 52,
    ports: {
      ...ports,
      items: [
        {
          id: 'top',
          group: 'top',
        },
        {
          id: 'top-left',
          group: 'top',
        },
        {
          id: 'top-right',
          group: 'top',
        },
        {
          id: 'right',
          group: 'right',
        },
        {
          id: 'right-top',
          group: 'right',
        },
        {
          id: 'right-bottom',
          group: 'right',
        },
        {
          id: 'bottom',
          group: 'bottom',
        },
        {
          id: 'bottom-left',
          group: 'bottom',
        },
        {
          id: 'bottom-right',
          group: 'bottom',
        },
        {
          id: 'left',
          group: 'left',
        },
        {
          id: 'left-top',
          group: 'left',
        },
        {
          id: 'left-bottom',
          group: 'left',
        },
      ],
    },
  },
  true
);

// chart
Graph.registerNode(
  'ais-chart',
  {
    inherit: 'react-shape',
    width: 40,
    height: 40,
    component: (
      <div>
        <LineChartOutlined style={{ fontSize: '40px' }} />
      </div>
    ),
    dragnode: <LineChart />,
  },
  true
);

// register({
//   shape: 'ais-chart',
//   width: 40,
//   height: 40,
//   component: SystemStencil,
// });
