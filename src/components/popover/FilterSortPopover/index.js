'use client'

import { Pressable } from '@react-aria/interactions'
import { Input as AntdInput } from 'antd'
import { forwardRef, memo, useDeferredValue, useMemo, useState } from 'react'
import Divider from '@/components/ui/Divider'
import Popover from '@/components/ui/Popover'
import { PROPERTY_TYPE_ICONS } from '@/constants/icons'

const Input = forwardRef((props, ref) => {
  return (
    <AntdInput
      ref={ref}
      size="large"
      placeholder={props?.placeholder || '入力してください。'}
      id="_input_"
      {...props}
    />
  )
})

const ExpenseFilterItem = memo(({ item, onClick }) => {
  const { title, type } = item || {}
  const Icon = PROPERTY_TYPE_ICONS[type]

  return (
    <Pressable onPress={onClick}>
      <li className="-mx-2 flex h-8 cursor-pointer items-center gap-x-2 rounded-md pl-4 hover:bg-[#ededed]">
        {Icon && <Icon className="size-4" />}
        <span>{title}</span>
      </li>
    </Pressable>
  )
})

const ExpenseFilterList = ({ list, addItem }) => {
  if (!list?.length) {
    return <span className="text-xs">No result</span>
  }

  const renderItem = (item) => {
    return <ExpenseFilterItem key={item.id} item={item} onClick={() => addItem(item)} />
  }

  return <ul>{list.map(renderItem)}</ul>
}

const PopoverContent = ({ list, extraContent, inputPlaceholder, addItem }) => {
  const [value, setValue] = useState('')
  const deferredValue = useDeferredValue(value)

  const onChange = (e) => {
    setValue(e.target.value)
  }

  const filterList = useMemo(
    () =>
      list.filter(({ title }) => {
        return title.toLowerCase().includes(value.toLowerCase())
      }),
    [list, deferredValue]
  )

  return (
    <div className="flex flex-col gap-y-2">
      <Input value={value} onChange={onChange} placeholder={inputPlaceholder} size="small" />
      <ExpenseFilterList list={filterList} addItem={addItem} />
      {extraContent && (
        <>
          <Divider className="!my-0" />
          {extraContent}
        </>
      )}
    </div>
  )
}

const FilterSortPopover = ({
  inputPlaceholder,
  rootClassName,
  extraContent,
  onOpenChange,
  children,
  addItem,
  open,
  list,
  // items,
}) => {
  const content = (
    <PopoverContent
      extraContent={extraContent}
      inputPlaceholder={inputPlaceholder}
      addItem={addItem}
      list={list}
    />
  )

  return (
    <Popover
      rootClassName={rootClassName}
      onOpenChange={onOpenChange}
      content={content}
      trigger="click"
      open={open}
    >
      {children}
    </Popover>
  )
}

export default FilterSortPopover
