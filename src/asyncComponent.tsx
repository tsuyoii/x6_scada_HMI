import { Cell } from '@antv/x6';
import * as React from 'react';
import { useParams } from 'react-router-dom';
export const useAsyncComponent = (
  path: string,
  id: string,
  param?: object,
  cell?: Cell
) => {
  const routerParams: any = useParams();
  const [dynamic_Components, set_Dynamic_Components] =
    React.useState<React.FC>();
  React.useEffect(() => {
    if (path) {
      import(`./nodeComponents/${path}`).then((module) => {
        let Component = module.FakeData;
        const formatModule: React.FC = () => {
          // return <div><Component builder={routerParams.type}/></div>;
          return (
            <div>
              <Component
                builder={JSON.stringify(param)}
                cell={cell}
                cellId={id}
              />
            </div>
          );
        };
        set_Dynamic_Components(formatModule);
      });
    } else {
      set_Dynamic_Components(() => <div>加载失败咯...</div>);
    }
  }, [path, cell]);
  return dynamic_Components;
};

// export const useAsyncComponent = (importComponent) => {
//   const [component, setComponent] = useState()
//   useEffect(()=> {
//     // let component = ()=>{
//     //   return null
//     // }
//     importComponent().then((cmp) => {
//       // component = cmp.default;
//       setComponent(cmp.default);
//       console.log(cmp,cmp.default,'cmp')
//     });
//   },[])
//   return component
// };

// import React, { Component } from 'react';
// import ReactDOM from 'react-dom';
// import './index.css';
// import nodeSet from './ConfigPanel/ConfigNode/nodeSet';

// export class AsyncComponent extends Component {
//   constructor(props) {
//     super(props);
//     this.state = { module: null };
//   }
//   componentDidMount() {
//     console.log('in comp mount');
//     //alert("in comp mount")
//     const { path } = this.props;
//     import(`${path}`).then((module) =>
//       this.setState({ module: module.default })
//     );
//   }
//   render() {
//     console.log('in render');
//     // alert("in render")
//     const { module: Component } = this.state; // Assigning to new variable names @see: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment
//     return <div>{Component && <Component />}</div>;
//   }
// }

// export class AsyncComponent extends Component {
//   constructor(props) {
//     super(props);
//     this.state = { module: null };
//   }
//   componentDidMount() {
//     console.log('in comp mount');
//     //alert("in comp mount")
//     const { path } = this.props;
//     import(`${path}`).then((module) =>
//       this.setState({ module: module.default })
//     );
//   }
//   renderDetail(mode, pageType) {
//     // let dynamicDetail = require(`./ConfigPanel/ConfigNode/nodeSet.js`);
//     // return dynamicDetail;
//   }
//   render() {
//     console.log('in render');
//     // alert("in render")
//     const { module: Component } = this.state; // Assigning to new variable names @see: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment
//     let DynamicDetail = this.renderDetail('', '');
//     return <div>{DynamicDetail && <DynamicDetail />}</div>;
//   }
// }
