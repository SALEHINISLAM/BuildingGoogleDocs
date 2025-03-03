import React from 'react'
import Editor from './editor';
import Toolbar from './toolbar';

interface IDocumentIdPageProps {
  params: Promise<{ documentId: string }>
}

export default async function DocumentIdPage({ params }: IDocumentIdPageProps) {
  const { documentId } = await params;

  return (
    <div className='min-h-screen bg-[#FAFBFD]'>
      DocumentIdPage: {documentId}
      <div className="">
        <Toolbar />
      </div>
      <div className="">
        <Editor />
      </div>
    </div>
  )
}
