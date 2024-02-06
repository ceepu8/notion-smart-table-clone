import { memo } from 'react'
import DateCell from '../DateCell'
import SelectCell from '../SelectCell'
import TextCell from '../TextCell'

const BodyCell = ({ type, item, children, editable, dataIndex, record }) => {
  console.log('render')

  if (type === 'date') {
    return <DateCell item={item}>{children}</DateCell>
  }

  if (type === 'select') {
    return <SelectCell item={item}>{children}</SelectCell>
  }

  return (
    <TextCell item={item} editable={editable} dataIndex={dataIndex} record={record}>
      {children}
    </TextCell>
  )
}

export default BodyCell
