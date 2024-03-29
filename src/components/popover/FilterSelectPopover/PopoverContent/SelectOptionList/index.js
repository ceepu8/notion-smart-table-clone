import { Checkbox } from 'antd'
import { Tag } from '@/components/ui'
import { getFilterSelectStyle } from '@/utils'

const SelectOptionList = ({ setValue, list, checkedList, setCheckedList }) => {
  const onChange = (e) => {
    const { value } = e.target

    if (!value) return
    const found = checkedList.find((item) => item.id === value.id)

    if (found) {
      setCheckedList((prev) => prev.filter((item) => item.id !== value.id))
    } else {
      setCheckedList((prev) => [...prev, value])
    }
    setValue('')
  }

  const renderCheckboxItem = (item) => {
    const { id, label, color } = item || {}

    const style = getFilterSelectStyle(color)

    return (
      <Checkbox
        key={id}
        name={label}
        value={item}
        onChange={onChange}
        className="flex min-h-7 cursor-pointer items-center gap-x-1 rounded px-2 transition-colors hover:bg-[rgba(55,_53,_47,_0.08)]"
      >
        <Tag size="medium" style={style} id={id} label={label} />
      </Checkbox>
    )
  }

  return (
    <Checkbox.Group value={checkedList} className="flex flex-col">
      {!list.length ? <p className="text-xs">No result.</p> : list.map(renderCheckboxItem)}
    </Checkbox.Group>
  )
}

export default SelectOptionList
