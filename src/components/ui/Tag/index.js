import { Pressable } from '@react-aria/interactions'
import { memo } from 'react'
import { XMarkIcon } from '@/components/icons'
import { cn } from '@/utils'

const Tag = ({ id, label, size = 'small', onRemove, style, className, ...props }) => {
  const sizeClassName = {
    small: 'h-[18px] leading-[18px] text-xs',
    medium: 'h-5 leading-5 text-sm',
  }

  return (
    <div
      style={style}
      className={cn(
        'flex w-max items-center truncate rounded pl-1',
        !onRemove && 'pr-1',
        sizeClassName[size],
        className
      )}
      {...props}
    >
      <span>{label}</span>
      {onRemove && (
        <Pressable onPress={() => onRemove?.(id)}>
          <div className="flex-center size-[18px] cursor-pointer opacity-60 transition-[opacity] hover:opacity-40">
            <XMarkIcon className="size-[11px] stroke-[3px]" />
          </div>
        </Pressable>
      )}
    </div>
  )
}

export default memo(Tag)
