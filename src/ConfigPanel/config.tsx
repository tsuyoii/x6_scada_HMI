import * as React from 'react';
import { useGridAttr } from '../models/global';
import ConfigNode from './ConfigNode/configNode';
import ConfigGrid from './ConfigGrid/configGrid';
import ConfigEdge from './ConfigEdge/configEdge';
import { CONFIG_TYPE } from '../constant/enums';

interface IProps {
  type: number;
  id: string;
  category: string;
}

export default function (props: IProps) {
  const { type, id, category } = props;
  const { gridAttrs, setGridAttr } = useGridAttr();

  return (
    <div className={'config'}>
      {type === CONFIG_TYPE.GRID && (
        <ConfigGrid attrs={gridAttrs} setAttr={setGridAttr} />
      )}
      {type === CONFIG_TYPE.NODE && <ConfigNode id={id} category={category} />}
      {type === CONFIG_TYPE.EDGE && <ConfigEdge id={id} />}
    </div>
  );
}
