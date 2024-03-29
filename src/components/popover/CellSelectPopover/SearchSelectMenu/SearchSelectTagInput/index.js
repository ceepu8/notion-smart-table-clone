import { Input, Tag } from '@/components/ui'
import { cn, getFilterSelectStyle } from '@/utils'

const SearchSelectTagInput = ({ item, value, onChange }) => {
  const { id, label, color } = item || {}

  const style = getFilterSelectStyle(color)

  return (
    <div
      id="single-select-input"
      className={cn(
        'relative flex min-h-[30px] flex-wrap gap-1 border-b border-[#ededed] px-2 pb-1.5 pt-2',
        'bg-[rgba(242,_241,_238,_0.6)]'
      )}
    >
      <Tag size="medium" style={style} id={id} label={label} onRemove={() => {}} />
      <div className="flex-center h-[18px] min-w-[60px] flex-1">
        <Input size="small" value={value} onChange={onChange} placeholder="" />
      </div>
    </div>
  )
}

export default SearchSelectTagInput
