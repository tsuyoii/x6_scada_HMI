import * as React from 'react';
import { Line } from '@ant-design/charts';

const data = [
  { year: '1991', value: 3 },
  { year: '1992', value: 4 },
  { year: '1993', value: 3.5 },
  { year: '1994', value: 5 },
  { year: '1995', value: 4.9 },
  { year: '1996', value: 6 },
  { year: '1997', value: 7 },
  { year: '1998', value: 9 },
  { year: '1999', value: 13 },
];
const LineChart: React.FC = (props: any) => {
  const { node } = props;
  const [config, setConfig] = React.useState<any>({
    data,
    height: 400,
    xField: 'year',
    yField: 'value',
    point: {
      size: 5,
      shape: 'diamond',
    },
  });

  React.useEffect(() => {
    const nodedata = node.getData();
    console.log(nodedata, 'chartdata');
    setConfig({
      // ...nodedata?.config,
      ...{
        data: [
          { age: 8, tall: 110 },
          { age: 6, tall: 120 },
          { age: 10, tall: 150 },
          { age: 11, tall: 160 },
          { age: 15, tall: 160 },
          { age: 15, tall: 170 },
          { age: 16, tall: 175 },
          { age: 18, tall: 180 },
          { age: 19, tall: 170 },
        ],
        xField: 'age',
        yField: 'tall',
      },
    });
  }, []);

  node.on('change:data', () => {
    const nodedata = node.getData();
    console.log(nodedata, 'chartdata');
    setConfig({
      ...config,
      ...{
        data: [
          { age: 8, tall: 110 },
          { age: 6, tall: 120 },
          { age: 10, tall: 150 },
          { age: 11, tall: 160 },
          { age: 15, tall: 160 },
          { age: 15, tall: 170 },
          { age: 16, tall: 175 },
          { age: 18, tall: 180 },
          { age: 19, tall: 170 },
        ],
        xField: 'age',
        yField: 'tall',
      },
      ...nodedata?.config,
    });
  });

  return <Line {...config} title="www" />;
};
export default LineChart;
