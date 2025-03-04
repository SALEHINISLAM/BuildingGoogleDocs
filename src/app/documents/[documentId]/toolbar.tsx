'use client'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Separator } from '@/components/ui/separator'
import { cn } from '@/lib/utils'
import useEditorStore from '@/store/use-editor-store'
import { AlignCenter, AlignJustify, AlignLeft, AlignLeftIcon, AlignRight, BoldIcon, ChevronDown, HighlighterIcon, ImageIcon, ItalicIcon, Link2Icon, List, ListIcon, ListOrderedIcon, ListTodoIcon, LucideIcon, MessageCircleIcon, MinusIcon, PlusIcon, PrinterIcon, Redo2Icon, SearchIcon, SpellCheckIcon, UnderlineIcon, Undo2Icon, UploadIcon } from 'lucide-react'
import React, { useState } from 'react'
import { type Level } from "@tiptap/extension-heading"
import { SketchPicker, type ColorResult } from 'react-color'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'

const FontSizeButton = () => {
    const { editor } = useEditorStore();
    const currentFontSizeRaw = editor?.getAttributes("textStyle").fontSize;
    const currentFontSize = currentFontSizeRaw
        ? String(currentFontSizeRaw) // Convert to string, whether number or string
        : "16"; // Default to "16" if undefined
    const [fontSize, setFontSize] = useState(currentFontSize);
    const [inputValue, setInputValue] = useState(fontSize);
    const [editing, setEditing] = useState(false);

    const updatedFontSize = (newSize: string) => {
        const size = parseInt(newSize, 10);
        if (!isNaN(size) && size > 0) {
            editor?.chain().focus().setFontSize(size).run();
            setFontSize(String(size)); // Store as string
            setInputValue(String(size));
            setEditing(false);
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);
    };

    const handleInputBlur = () => {
        updatedFontSize(inputValue);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            e.preventDefault();
            updatedFontSize(inputValue);
            editor?.commands.focus();
        }
    };

    const increment = () => {
        const newSize = parseInt(fontSize, 10) + 1;
        updatedFontSize(newSize.toString());
    };

    const decrement = () => {
        const newSize = parseInt(fontSize, 10) - 1; // Fixed: was +1, should be -1
        if (newSize > 0) {
            updatedFontSize(newSize.toString());
        }
    };

    return (
        <div className="flex items-center gap-x-0.5">
            <button
                className={cn(
                    "h-7 w-7 shrink-0 flex items-center justify-center rounded-sm hover:bg-neutral-200/80"
                )}
                onClick={decrement}
            >
                <MinusIcon className="size-4" />
            </button>
            {editing ? (
                <Input
                    type="number"
                    value={inputValue}
                    onChange={handleInputChange}
                    onBlur={handleInputBlur}
                    onKeyDown={handleKeyDown}
                    className={cn(
                        "h-7 w-15 text-sm shrink-0 border-neutral-400 text-center rounded-sm bg-transparent focus:outline-none focus:ring-0"
                    )}
                />
            ) : (
                <button
                    className={cn(
                        "h-7 w-15 text-sm shrink-0 border border-neutral-400 text-center rounded-sm bg-transparent cursor-text"
                    )}
                    onClick={() => {
                        setEditing(true);
                        setFontSize(currentFontSize);
                    }}
                >
                    {currentFontSize}
                </button>
            )}
            <button
                className={cn(
                    "h-7 w-7 shrink-0 flex items-center justify-center rounded-sm hover:bg-neutral-200/80"
                )}
                onClick={increment}
            >
                <PlusIcon className="size-4" />
            </button>
        </div>
    );
};

const ListButton = () => {
    const { editor } = useEditorStore()
    const lists: {
        label: string,
        icon: LucideIcon,
        isActive: () => boolean | undefined,
        onClick: () => void
    }[] = [
            {
                label: "Bullet List",
                icon: List,
                isActive: () => editor?.isActive("bulletList"),
                onClick: () => editor?.chain().focus().toggleBulletList().run()
            },
            {
                label: "Ordered List",
                icon: ListOrderedIcon,
                isActive: () => editor?.isActive("orderedList"),
                onClick: () => editor?.chain().focus().toggleOrderedList().run()
            },
        ]
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <button
                    className={cn(
                        'h-7 min-h-7 shrink-0 flex flex-col items-center justify-center rounded-sm hover:bg-neutral-200/80 px-1.5 overflow-hidden text-sm '
                    )}>
                    <ListIcon className='size-4' />
                </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className='p-1 flex flex-col gap-y-1'>
                {
                    lists.map(({ label, icon: Icon, onClick, isActive }) => (
                        <button
                            key={label}
                            onClick={onClick}
                            className={cn("flex items-center gap-x-2 rounded-sm hover:bg-neutral-200/80", isActive() && "bg-neutral-200/85")
                            }
                        >
                            <Icon className='size-4' />
                            <span className='text-sm'>{label}</span>
                        </button>
                    ))
                }
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

const AlignButton = () => {
    const { editor } = useEditorStore()
    //const value = editor?.getAttributes("highlight").color || "#FFFFFF";
    const alignments: { label: string, value: string, icon: LucideIcon }[] = [
        {
            label: "Align Left",
            value: "left",
            icon: AlignLeft
        },
        {
            label: "Align Center",
            value: "center",
            icon: AlignCenter
        },
        {
            label: "Align Right",
            value: "right",
            icon: AlignRight
        },
        {
            label: "Align Justify",
            value: "justify",
            icon: AlignJustify
        },
    ]
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <button
                    className={cn(
                        'h-7 min-h-7 shrink-0 flex flex-col items-center justify-center rounded-sm hover:bg-neutral-200/80 px-1.5 overflow-hidden text-sm '
                    )}>
                    <AlignLeftIcon className='size-4' />
                </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className='p-1 flex flex-col gap-y-1'>
                {
                    alignments.map(({ label, value, icon: Icon }) => (
                        <button
                            key={label}
                            onClick={() => editor?.chain().focus().setTextAlign(value).run()}
                            className={cn("flex items-center gap-x-2 rounded-sm hover:bg-neutral-200/80", editor?.isActive({ textAlign: value }) && "bg-neutral-200/85")
                            }
                        >
                            <Icon className='size-4' />
                            <span className='text-sm'>{label}</span>
                        </button>
                    ))
                }
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

const ImageButton = () => {
    const { editor } = useEditorStore()
    const [isDialogueOpen, setIsDialogueOpen] = useState(false)
    const [imageUrl, setImageUrl] = useState("")
    const onChange = (src: string) => {
        editor?.chain().focus().setImage({ src }).run()
        setImageUrl("")
    }
    const onUpload = () => {
        const input = document.createElement("input")
        input.type = "file"
        input.accept = "image/*"
        input.onchange = (e) => {
            const file = (e.target as HTMLInputElement).files?.[0];
            if (file) {
                const imageUrl = URL.createObjectURL(file)
                onChange(imageUrl)
            }
        }
        input.click()
    }
    const handleImageUrlSubmit = () => {
        if (imageUrl) {
            onChange(imageUrl)
            setImageUrl("")
            setIsDialogueOpen(false)
        }
    }
    return (
        <>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <button
                        className={cn(
                            'h-7 min-h-7 shrink-0 flex flex-col items-center justify-center rounded-sm hover:bg-neutral-200/80 px-1.5 overflow-hidden text-sm '
                        )}
                    >
                        <ImageIcon />
                    </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className='p-2.5 flex items-center justify-center gap-x-2'>
                    <DropdownMenuItem onClick={onUpload}>
                        <UploadIcon className='size-4 mr-2' />
                        Upload
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setIsDialogueOpen(true)}>
                        <SearchIcon className='size-4 mr-2' />
                        Paste your image link here
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
            <Dialog open={isDialogueOpen} onOpenChange={setIsDialogueOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>
                            Insert Image URL
                        </DialogTitle>
                    </DialogHeader>
                    <Input
                        placeholder='insert image url'
                        value={imageUrl}
                        onChange={(e) => setImageUrl(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === "Enter") {
                                handleImageUrlSubmit()
                            }
                        }}
                    />
                    <DialogFooter>
                        <Button onClick={handleImageUrlSubmit}>
                            Insert
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    )
}

const LinkButton = () => {
    const { editor } = useEditorStore()
    const [value, setValue] = useState(editor?.getAttributes("link").href || "")
    const onChange = (href: string) => {
        editor?.chain().focus().extendMarkRange("link").setLink({ href }).run()
        setValue("")
    }
    return (
        <DropdownMenu
            onOpenChange={(open) => {
                if (open) {
                    setValue(editor?.getAttributes('link').href)
                }
            }
            }
        >
            <DropdownMenuTrigger asChild>
                <button
                    className={cn(
                        'h-7 min-h-7 shrink-0 flex flex-col items-center justify-center rounded-sm hover:bg-neutral-200/80 px-1.5 overflow-hidden text-sm '
                    )}
                >
                    <Link2Icon />
                </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className='p-2.5 flex items-center justify-center gap-x-2'>
                <Input
                    placeholder='https://eample.com'
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                />
                <Button onClick={() => onChange(value)}>Apply</Button>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

const HighlightColorButton = () => {
    const { editor } = useEditorStore()
    const value = editor?.getAttributes("highlight").color || "#FFFFFF";
    const onChange = (color: ColorResult) => {
        editor?.chain().focus().setHighlight({ color: color.hex }).run()
    }
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <button
                    className={cn(
                        'h-7 min-h-7 shrink-0 flex flex-col items-center justify-center rounded-sm hover:bg-neutral-200/80 px-1.5 overflow-hidden text-sm '
                    )}>
                    <HighlighterIcon />
                </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <SketchPicker color={value} onChange={onChange} />
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

const TextColorButton = () => {
    const { editor } = useEditorStore()
    const value = editor?.getAttributes("textStyle").color || "#000000";
    const onChange = (color: ColorResult) => {
        editor?.chain().focus().setColor(color.hex).run()
    }
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <button
                    className={cn(
                        'h-7 min-h-7 shrink-0 flex flex-col items-center justify-center rounded-sm hover:bg-neutral-200/80 px-1.5 overflow-hidden text-sm '
                    )}>
                    <span className='text-xs'>A</span>
                    <div className="h-0.5 w-full" style={{ backgroundColor: `${value}` }}></div>
                </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <SketchPicker color={value} onChange={onChange} />
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

const HeadingLevelButton = () => {
    const { editor } = useEditorStore()
    const headings: { label: string, value: number, fontSize: string }[] = [
        {
            label: 'Normal Text',
            value: 0,
            fontSize: '16px',
        },
        {
            label: 'Heading 1',
            value: 1,
            fontSize: '32px',
        },
        {
            label: 'Heading 2',
            value: 2,
            fontSize: '24px',
        },
        {
            label: 'Heading 3',
            value: 3,
            fontSize: '20px',
        },
        {
            label: 'Heading 4',
            value: 4,
            fontSize: '18px',
        },
        {
            label: 'Heading 5',
            value: 5,
            fontSize: '16px',
        },
        {
            label: 'Heading 6',
            value: 6,
            fontSize: '12px',
        },
    ]

    const getCurrentHeading = () => {
        for (let level = 0; level <= 6; level++) {
            if (editor?.isActive("heading", { level })) {
                return `Heading ${level}`
            }
        }
        return 'Normal Text'
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <button className={cn(
                    'h-7 min-h-7 shrink-0 flex items-center justify-center rounded-sm hover:bg-neutral-200/80 px-1.5 overflow-hidden text-sm '
                )}>
                    <span className='truncate'>
                        {getCurrentHeading()}
                    </span>
                    <ChevronDown className='ml-2 size-4 shrink-0' />
                </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                {headings.map(({ label, value, fontSize }) =>
                    <button
                        key={label}
                        style={{ fontSize: fontSize }}
                        className={cn("flex justify-center items-center gap-x-2 px-2 py-1 rounded-sm hover:bg-neutral-200/80",
                            (value === 0 && !editor?.isActive("heading")) || editor?.isActive("heading", { label: value }) && 'bg-neutral-200/85'
                        )}
                        onClick={() => {
                            if (value === 0) {
                                editor?.chain().focus().setParagraph().run()
                            } else {
                                editor?.chain().focus().toggleHeading({ level: value as Level }).run()
                            }
                        }}
                    >
                        {label}
                    </button>
                )}
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

const FontFamilyButton = () => {
    const { editor } = useEditorStore()
    const fonts: { label: string; value: string }[] = [
        {
            label: 'Arial',
            value: 'Arial',
        },
        {
            label: 'Times New Roman',
            value: 'Times New Roman',
        },
        {
            label: 'Courier New',
            value: 'Courier New',
        },
        {
            label: 'Verdana',
            value: 'Verdana',
        },
        {
            label: 'Georgia',
            value: 'Georgia',
        },
        {
            label: 'Comic Sans MS',
            value: 'Comic Sans MS',
        },
        {
            label: 'Impact',
            value: 'Impact',
        },
        {
            label: 'Trebuchet MS',
            value: 'Trebuchet MS',
        },
        {
            label: 'Lucida Sans Unicode',
            value: 'Lucida Sans Unicode',
        },
        {
            label: 'Tahoma',
            value: 'Tahoma',
        },
        {
            label: 'Palatino Linotype',
            value: 'Palatino Linotype',
        },
        {
            label: 'Garamond',
            value: 'Garamond',
        },
        {
            label: 'Book Antiqua',
            value: 'Book Antiqua',
        },
        {
            label: 'Courier',
            value: 'Courier',
        },
        {
            label: 'Lucida Console',
            value: 'Lucida Console',
        },
    ];
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <button className={cn(
                    'h-7 w-[120px] shrink-0 flex items-center justify-between rounded-sm hover:bg-neutral-200/80 px-1.5 overflow-hidden text-sm '
                )}>
                    <span className='truncate'>
                        {editor?.getAttributes("textStyle").fontFamily || "Arial"}
                    </span>
                    <ChevronDown className='ml-2 size-4 shrink-0' />
                </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className='p-1 flex flex-col gap-y-1'>
                {
                    fonts.map(({ label, value }) =>
                        <button
                            key={label}
                            className={cn("flex justify-center items-center gap-x-2 px-2 py-1 rounded-sm hover:bg-neutral-200/80",
                                editor?.getAttributes("textStyle").fontFamily === value && 'bg-neutral-200/85'
                            )}
                            style={{ fontFamily: value }}
                            onClick={() => editor?.chain().focus().setFontFamily(value).run()}
                        >
                            <span className='text-sm'>{label}</span>
                        </button>
                    )
                }
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

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
            label: "Comment",
            icon: MessageCircleIcon,
            onClick: () => console.log("comment"),
            isActive: false // TODO: make this functional
        },
        {
            label: "TODO List",
            icon: ListTodoIcon,
            onClick: () => editor?.chain().focus().toggleTaskList().run(),
            isActive: editor?.isActive("taskList")
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
            <FontFamilyButton />
            <FontSizeButton />
            <Separator orientation='vertical' className='h-6 bg-neutral-300' />
            <HeadingLevelButton />
            <Separator orientation='vertical' className='h-6 bg-neutral-300' />

            {
                sections[1].map(item =>
                    <ToolbarButton key={item.label} onclick={item.onClick} icon={item.icon} isActive={item.isActive} />
                )
            }
            <Separator orientation='vertical' className='h-6 bg-neutral-900' />
            {
                sections[2].map(item =>
                    <ToolbarButton key={item.label} onclick={item.onClick} icon={item.icon} isActive={item.isActive} />
                )
            }
            <Separator orientation='vertical' className='h-6 bg-neutral-900' />
            <TextColorButton />
            <Separator orientation='vertical' className='h-6 bg-neutral-900' />
            <HighlightColorButton />
            <Separator orientation='vertical' className='h-6 bg-neutral-900' />
            <LinkButton />
            <ImageButton />
            <AlignButton />
            <ListButton />
            <Separator orientation='vertical' className='h-6 bg-neutral-900' />
        </div>
    )
}
