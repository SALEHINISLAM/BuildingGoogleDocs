"use client"
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import DocumentInput from './document-input'
import { Menubar, MenubarContent, MenubarItem, MenubarMenu, MenubarSeparator, MenubarShortcut, MenubarSub, MenubarSubContent, MenubarSubTrigger, MenubarTrigger } from '@/components/ui/menubar'
import { FileIcon, FileJsonIcon, FilePlusIcon, FileText, FileType, FolderPen, GlobeIcon, Printer, TrashIcon } from 'lucide-react'

export default function DocNavbar() {
  return (
    <nav className='flex items-center'>
      <Link href={'/'}>
        <Image src={'/logo.svg'} alt='my docs' width={72} height={24} />
      </Link>
      <div className="flex flex-col">
        <DocumentInput />
        <div className="flex">
          <Menubar className='border-none bg-transparent shadow-none h-auto p-0 print:hidden'>
<MenubarMenu>
  <MenubarTrigger className='print:hidden'>
    File
  </MenubarTrigger>
  <MenubarContent className='print:hidden'>
    <MenubarSub>
      <MenubarSubTrigger>
      <FileIcon className='size-4 mr-2'/>
      Save
      </MenubarSubTrigger>
      <MenubarSubContent>
        <MenubarItem>
          <FileJsonIcon className='size-4 mr-2'/>
          JSON
        </MenubarItem>
        <MenubarItem>
          <GlobeIcon className='size-4 mr-2'/>
          HTML
        </MenubarItem>
        <MenubarItem>
          <FileText className='size-4 mr-2'/>
          PDF
        </MenubarItem>
        <MenubarItem>
          <FileType className='size-4 mr-2'/>
          TEXT
        </MenubarItem>
      </MenubarSubContent>
    </MenubarSub>
    <MenubarItem>
      <FilePlusIcon className='mr-2 size-4'/>
      New Document
    </MenubarItem>
    <MenubarSeparator/>
    <MenubarItem>
      <FolderPen className='size-4 mr-2'/>
      Rename
    </MenubarItem>
    <MenubarItem>
      <TrashIcon className='size-4 mr-2'/>
      Remove
    </MenubarItem>
    <MenubarItem onClick={()=>window.print()}>
      <Printer className='size-4 mr-2'/>
      Print <MenubarShortcut>ctrl + p</MenubarShortcut>
    </MenubarItem>
  </MenubarContent>
</MenubarMenu>
<MenubarMenu>
  <MenubarTrigger className='text-sm font-normal py-0.5 px-[7px] rounded-sm hover:bg-muted h-auto'>
    Edit
  </MenubarTrigger>
</MenubarMenu>
<MenubarMenu>
  <MenubarTrigger className='text-sm font-normal py-0.5 px-[7px] rounded-sm hover:bg-muted h-auto'>
    Insert
  </MenubarTrigger>
</MenubarMenu>
<MenubarMenu>
  <MenubarTrigger className='text-sm font-normal py-0.5 px-[7px] rounded-sm hover:bg-muted h-auto'>
    Format
  </MenubarTrigger>
</MenubarMenu>
          </Menubar>
        </div>
      </div>
    </nav>
  )
}
