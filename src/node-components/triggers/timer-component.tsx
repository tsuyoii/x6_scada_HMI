import { Cell } from '@antv/x6';
import { Col, Input, InputNumber, Row, Select, Space } from 'antd';
import * as React from 'react';

interface Params {
  builder: string;
  cell?: any;
  cellId?: string;
}
const { Option } = Select;
const scheduleData = [{ key: 'seconds', value: 'Simple Interval' }];
const unit = ['seconds', 'minutes', 'hour', 'day'];

export const FakeData: React.FC<Params> = (props) => {
  const [schedule, setSchedule] = React.useState(scheduleData[0].value);
  const [unitType, setUnitType] = React.useState(unit[1]);
  const [timer, setTimer] = React.useState<number | null>(1);
  const Time: {
    [key: string]: number;
  } = {
    seconds: 1,
    minutes: 60,
    hour: 3600,
    day: 24 * 3600,
  };

  React.useEffect(() => {
    if (props) {
      const cells = props.cell?.toJSON();
      setSchedule(cells.meta?.timerTypeSelect || scheduleData[0].key);
      const { timer, unitType } = secToTime(cells.config?.seconds || 480);
      setTimer(timer);
      setUnitType(unitType);
    }
  }, [props.cellId]);

  React.useEffect(() => {
    props.cell?.prop('config', {
      seconds: transToSec(timer, unitType),
    });
    // console.log('time',timer,unitType,transToSec(timer,unitType))
  }, [props.cellId, timer, unitType]);

  const handleScheduleChange = (value: string) => {
    setSchedule(value);
  };
  const handleUnitChange = (value: string) => {
    setUnitType(value);
  };
  const handleTimerChange = (value: number | null) => {
    setTimer(value);
  };
  const transToSec = (timer: number | null, unitType: string) => {
    if (!timer && timer !== 0) return;
    return Number(Time[unitType]) * timer;
  };
  const secToTime = (sec: number | string) => {
    const unitType =
      Number(sec) >= 24 * 3600
        ? 'day'
        : Number(sec) >= 3600
        ? 'hour'
        : Number(sec) >= 60
        ? 'minutes'
        : 'seconds';
    const timer = Number(sec) / Time[unitType];
    return { timer, unitType };
  };

  const selectAfter = (
    <Select
      defaultValue={unit[0]}
      style={{ width: 100 }}
      value={unitType}
      onChange={handleUnitChange}>
      {unit.map((type) => (
        <Option key={type}>{type}</Option>
      ))}
    </Select>
  );
  return (
    <Space direction="vertical">
      <Row>日程类型</Row>
      <Row>
        <Select
          defaultValue={scheduleData[0].value}
          value={schedule}
          onChange={handleScheduleChange}
          style={{ width: '100%' }}>
          {scheduleData.map((type) => (
            <Option key={type.key}>{type.value}</Option>
          ))}
        </Select>
      </Row>
      <Row>间隔时间</Row>
      <Row align="middle">
        <Col span={2}>每</Col>
        <Col span={19}>
          <InputNumber
            addonAfter={selectAfter}
            defaultValue={1}
            value={timer}
            onChange={handleTimerChange}
          />
        </Col>
        <Col span={3}>一次</Col>
      </Row>
    </Space>
  );
};
