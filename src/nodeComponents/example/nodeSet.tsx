import * as React from 'react';

interface Params {
  builder: string;
  cell?: any;
}
export const FakeData: React.FC<Params> = (props) => {
  // const [ builder ] = React.useState(props.builder);
  const builder = React.useState(JSON.parse(props.builder));
  const cell = React.useState(props.cell);
  console.log(builder[0], cell[0].toJSON());
  const prop = builder[0];
  // 渲染
  return (
    <div>
      12345
      {prop.name}
      {/* {builder} */}
    </div>
  );
};

// export default function(){
//     console.log('sett')
//     return (
//         <div>12345</div>
//     )
// }

// export default class NodeSet extends React.Component{
//     render(){
//         return(
//             <div>
//                 12345
//             </div>
//         )
//     }
// }
// module.exports = NodeSet
