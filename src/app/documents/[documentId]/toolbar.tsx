'use client'
import { Separator } from '@/components/ui/separator'
import { cn } from '@/lib/utils'
import useEditorStore from '@/store/use-editor-store'
import { BoldIcon, ItalicIcon, LucideIcon, MessageCircleIcon, PrinterIcon, Redo2Icon, SpellCheckIcon, UnderlineIcon, Undo2Icon } from 'lucide-react'
import React from 'react'

interface IToolbarButtonProps {
    onclick?: () => void,
    isActive?: boolean,
    icon: LucideIcon
}
const ToolbarButton = ({ onclick, isActive, icon: Icon }: IToolbarButtonProps) => {
    return (
        <button
            onClick={onclick}
            className={cn(
                'text-sm h-7 min-w-7 flex items-center rounded-sm hover:bg-neutral-200/80', isActive && 'bg-neutral-200/85'
            )}
        >
            <Icon className='size-4' />
        </button>
    )
}

export default function Toolbar() {
    const { editor } = useEditorStore()
    console.log(editor)
    const sections: { label: string, icon: LucideIcon, onClick: () => void, isActive?: boolean }[][] = [[
        {
            label: "Undo",
            icon: Undo2Icon,
            onClick: () => editor?.chain().focus().undo().run(),
        },
        {
            label: "Redo",
            icon: Redo2Icon,
            onClick: () => editor?.chain().focus().redo().run(),
        },
        {
            label: "Print",
            icon: PrinterIcon,
            onClick: () => window.print(),
        },
        {
            label: "Spell Check",
            icon: SpellCheckIcon,
            onClick: () => {
                const current = editor?.view.dom.getAttribute("spellcheck")
                editor?.view.dom.setAttribute("spellcheck", current === "false" ? "true" : "false")
            },
        },
    ],
    [
        {
            label: "Bold",
            icon: BoldIcon,
            onClick: () => editor?.chain().focus().toggleBold().run(),
            isActive: editor?.isActive("bold")
        },
        {
            label: "Italic",
            icon: ItalicIcon,
            onClick: () => editor?.chain().focus().toggleItalic().run(),
            isActive: editor?.isActive("italic")
        },
        {
            label: "Underline",
            icon: UnderlineIcon,
            onClick: () => editor?.chain().focus().toggleUnderline().run(),
            isActive: editor?.isActive("underline")
        },
    ],
    [
        {
            label:"Comment",
            icon:MessageCircleIcon,
            onClick:()=>console.log("comment"),
            isActive:false // TODO: make this functional
        }
    ]
    ]
    return (
        <div className='bg-[#F1F4F9] px-2.5 py-0.5 rounded-[24px] min-h-[40px] flex items-center gap-x-0.5 overflow-x-auto'>
            {
                sections[0].map(item =>
                    <ToolbarButton key={item.label} onclick={item.onClick} icon={item.icon} isActive={item.isActive} />
                )
            }
            <Separator orientation='vertical' className='h-6 bg-neutral-300' />
            {
                sections[1].map(item =>
                    <ToolbarButton key={item.label} onclick={item.onClick} icon={item.icon} isActive={item.isActive} />
                )
            }
            <Separator orientation='vertical' className='h-6 bg-neutral-900' />
            <Separator orientation='vertical' />
            <Separator orientation='vertical' />
            <Separator orientation='vertical' />
            {
                sections[2].map(item =>
                    <ToolbarButton key={item.label} onclick={item.onClick} icon={item.icon} isActive={item.isActive} />
                )
            }
        </div>
    )
}
