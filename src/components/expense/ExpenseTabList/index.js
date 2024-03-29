import { DndContext, PointerSensor, useSensor } from '@dnd-kit/core'
import { restrictToHorizontalAxis, restrictToParentElement } from '@dnd-kit/modifiers'
import {
  arrayMove,
  horizontalListSortingStrategy,
  SortableContext,
  useSortable,
} from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { Tabs } from 'antd'
import { v4 as uuidv4 } from 'uuid'
import { cloneElement } from 'react'
import { PlusIcon, TableCellsIcon } from '@/components/icons'
import { ButtonIcon } from '@/components/ui'
import { cn, useTabs } from '@/utils'
import ExpenseTabTable from './ExpenseTabTable'
import ExpenseTabTitle from './ExpenseTabTitle'

const DraggableTabNode = ({ className, ...props }) => {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({
    id: props['data-node-key'],
  })
  const style = {
    ...props.style,
    transform: CSS.Transform.toString(
      transform && {
        ...transform,
        scaleX: 1,
      }
    ),
    transition,
    cursor: 'move',
  }
  return cloneElement(props.children, {
    ref: setNodeRef,
    style,
    ...attributes,
    ...listeners,
  })
}

const defaultPanes = [
  {
    key: 'january',
    label: 'JANUARY',
    children: <ExpenseTabTable />,
    closable: false,
  },
  {
    key: 'february',
    label: 'FEBRUARY',
    children: <ExpenseTabTable />,
    closable: false,
  },
]

const AddTabButton = ({ onClick }) => {
  return (
    <ButtonIcon
      size="medium"
      icon={<PlusIcon className="size-4 text-gray-500" />}
      onClick={onClick}
    />
  )
}

const { TabPane } = Tabs

const ExpenseTabList = ({ hasExtra }) => {
  const { items, setItems, activeKey, onAdd, onEdit, onChange } = useTabs(defaultPanes)

  const onAddNewTab = () => {
    const newItem = {
      label: 'New View',
      children: 'New View Pane',
      key: uuidv4(),
      closable: false,
    }
    onAdd(newItem)
  }

  const sensor = useSensor(PointerSensor, { activationConstraint: { distance: 10 } })

  const onDragEnd = ({ active, over }) => {
    if (active.id !== over?.id) {
      setItems((prev) => {
        const activeIndex = prev.findIndex((i) => i.key === active.id)
        const overIndex = prev.findIndex((i) => i.key === over?.id)
        return arrayMove(prev, activeIndex, overIndex)
      })
    }
  }
  const renderTabBar = (tabBarProps, DefaultTabBar) => (
    <DndContext
      sensors={[sensor]}
      modifiers={[restrictToParentElement, restrictToHorizontalAxis]}
      onDragEnd={onDragEnd}
    >
      <SortableContext items={items.map((i) => i.key)} strategy={horizontalListSortingStrategy}>
        <DefaultTabBar {...tabBarProps}>
          {(node) => {
            return (
              <DraggableTabNode {...node.props} key={node.key}>
                {node}
              </DraggableTabNode>
            )
          }}
        </DefaultTabBar>
      </SortableContext>
    </DndContext>
  )

  const renderItem = (item) => {
    const { key, children, label, closable } = item || {}
    return (
      <TabPane
        tab={<ExpenseTabTitle icon={TableCellsIcon}>{label}</ExpenseTabTitle>}
        closable={closable}
        key={key}
      >
        <TabContent className={cn(hasExtra ? 'pt-10' : 'pt-0')}>{children}</TabContent>
      </TabPane>
    )
  }
  return (
    <Tabs
      id="expense-tabs"
      activeKey={activeKey}
      onChange={onChange}
      onEdit={onEdit}
      renderTabBar={renderTabBar}
    >
      {items.map(renderItem)}
      <TabPane disabled className="p-0" tab={<AddTabButton onClick={onAddNewTab} />} key="button" />
    </Tabs>
  )
}

export default ExpenseTabList

function TabContent({ children, className }) {
  return <div className={cn('', className)}>{children}</div>
}
