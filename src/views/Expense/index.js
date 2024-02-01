'use client'

import { HeadingTitle } from '@/components/common'
import { FilterSortProvider } from '@/contexts/customs'
import ExpenseTab from './ExpenseTab'

const ExpenseView = () => {
  const onChangeTitle = () => {}

  return (
    <div className="mx-auto max-w-[1200px] overflow-hidden px-4 pt-12">
      <HeadingTitle label="Expense" editable onChange={onChangeTitle} />
      <FilterSortProvider>
        <ExpenseTab />
      </FilterSortProvider>
    </div>
  )
}

export default ExpenseView
