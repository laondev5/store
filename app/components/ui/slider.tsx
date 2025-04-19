import * as React from 'react'
import * as SliderPrimitive from '@radix-ui/react-slider'

interface SliderProps {
  defaultValue: number[]
  max: number
  step: number
  onValueChange: (value: number[]) => void
}

export function Slider({ defaultValue, max, step, onValueChange }: SliderProps) {
  return (
    <SliderPrimitive.Root
      defaultValue={defaultValue}
      max={max}
      step={step}
      onValueChange={onValueChange}
      className="relative flex items-center select-none touch-none w-full h-5"
    >
      <SliderPrimitive.Track className="bg-gray-200 relative grow rounded-full h-2">
        <SliderPrimitive.Range className="absolute bg-black rounded-full h-full" />
      </SliderPrimitive.Track>
      <SliderPrimitive.Thumb className="block w-5 h-5 bg-black rounded-full hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2" />
      <SliderPrimitive.Thumb className="block w-5 h-5 bg-black rounded-full hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2" />
    </SliderPrimitive.Root>
  )
} 