import { Pressable } from '@react-aria/interactions'
import { Form } from 'antd'
import dayjs from 'dayjs'
import { memo, useState } from 'react'
import { MiniCalendar } from '@/components/calendar'
import { Button, Divider, Input, Popover, Switch } from '@/components/ui'
import { FORMAT_STRING } from '@/constants'
import DateFormatTimezoneSelect from './DateFormatTimezoneSelect'
import RemindSelect from './RemindSelect'

const BaseSwitch = ({ id, name, children, value, onChange }) => {
  const toggleSwitch = () => {
    onChange((prev) => !prev)
  }

  return (
    <Pressable onPress={toggleSwitch}>
      <div className="flex-between h-6 cursor-pointer rounded px-2 transition-colors hover:bg-[rgba(55,_53,_47_,0.08)]">
        <span className="cursor-pointer text-sm">{children}</span>
        <Switch id={id} name={name} size="small" value={value} />
      </div>
    </Pressable>
  )
}

const DateSelect = ({ value, setValue }) => {
  return (
    <div>
      <Form.Item style={{ marginBottom: 0 }}>
        <Input value={value.format(FORMAT_STRING.day_month_year)} size="small" placeholder="" />
      </Form.Item>
      <MiniCalendar date={value} onChangeDate={setValue} />
    </div>
  )
}

const DateCellSetting = memo(({ item }) => {
  const { date } = item || {}

  const [endDateChecked, setEndDateChecked] = useState(false)
  const [includeTimeChecked, setIncludeTimeChecked] = useState(false)
  const [value, setValue] = useState(dayjs(date))

  return (
    <div
      id="filter-date-cell"
      className="flex flex-col divide-x-0 divide-y divide-[#ededed] [&>*]:py-1"
    >
      <DateSelect value={value} setValue={setValue} />
      <RemindSelect isIncludeTime={includeTimeChecked} />
      <div>
        <BaseSwitch id="endDate" value={endDateChecked} onChange={setEndDateChecked}>
          End Date
        </BaseSwitch>
        <BaseSwitch id="includeTime" value={includeTimeChecked} onChange={setIncludeTimeChecked}>
          Include Time
        </BaseSwitch>
      </div>
      <DateFormatTimezoneSelect />
      <div>
        <Button block size="small" type="text" className="!justify-start">
          Clear
        </Button>
      </div>
    </div>
  )
})

const DateCell = ({ record, children }) => {
  const [open, setOpen] = useState(false)

  return (
    <td height="32" className="ant-table-cell">
      <Popover
        open={open}
        rootClassName="w-[270px]"
        placement="bottomLeft"
        onOpenChange={setOpen}
        content={<DateCellSetting item={record} />}
      >
        <div className="truncate px-2 text-sm leading-[41px]">{children}</div>
      </Popover>
    </td>
  )
}

export default memo(DateCell)