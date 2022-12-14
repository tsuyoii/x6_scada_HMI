// 目前只接受hex颜色值#000000或#00000000, 暂未实现rgb,rgba,hsl等方案，以后待补充
import React from 'react';
import Input from 'antd/lib/input';
import Button from 'antd/lib/button';
import Dropdown from 'antd/lib/dropdown';
import 'antd/dist/antd.css';
import './color-picker.css';
import { Slider } from 'antd';

const formatter = (value: number | undefined) => `不透明度:${value}%`;
export default function ColorPickerInput(props: any) {
  const { value, onChange } = props;

  const [internalColor, setInternalColor] = React.useState(props.value);
  const [opacity, setOpacity] = React.useState(100);

  React.useEffect(() => {
    setInternalColor(value?.slice(0, 7) || 'transparent');
    let alpha = hexToOpacity(value?.slice(7) || 100);
    setOpacity(alpha || alpha === 0 ? alpha : 100);
  }, [value]);

  const handleChange = (e: any) => {
    setInternalColor(e.target.value);

    if (onChange) {
      onChange(e.target.value + opacityToHex(opacity));
    }
  };

  const handleOpacityChange = (e: number) => {
    setOpacity(e);
    if (onChange) {
      onChange(internalColor + opacityToHex(e));
    }
  };

  const opacityToHex = (opacity: number) => {
    let alpha = Math.round(opacity * 2.55);
    let hex = (alpha + 0x10000).toString(16).substr(-2).toUpperCase();
    return hex;
  };

  const normalize = (val: number, max: number, min: number) => {
    return (val - min) / (max - min);
  };

  const hexToOpacity = (hex: string) => {
    return +Math.round(normalize(parseInt(hex, 16), 255, 0) * 100);
  };

  return (
    <div className="color-wraper">
      <Input
        className="color"
        value={internalColor || ''}
        onChange={handleChange}
        suffix={
          <Input
            type="color"
            value={internalColor}
            style={{
              padding: 0,
              width: 18,
              height: 21,
              border: 'none',
            }}
            onChange={handleChange}
          />
        }
      />
      <Slider
        min={0}
        max={100}
        step={1}
        className="slider"
        value={opacity}
        tooltip={{ formatter }}
        onChange={handleOpacityChange}
      />
    </div>
  );
}
