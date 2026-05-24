import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap outline-none transition-all disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        primary: 'btn-primary',
        ghost: 'btn-ghost',
        link: 'text-text-secondary hover:text-warm-white underline-draw font-sans bg-transparent border-none p-0',
        default: 'btn-primary', // fallback for shadcn default
        outline: 'btn-ghost',
        secondary: 'btn-ghost',
        destructive: 'btn-primary bg-maroon', // minimal fallback
      },
      size: {
        default: '',
        sm: '',
        lg: '',
        icon: 'p-3',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'default',
    },
  },
)

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<'button'> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot : 'button'

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
