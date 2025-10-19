import { Editor } from "@/components/blocks/editor-00/editor"

interface EditorWrapperProps {
  content: any;
  setContent: any;
}

const EditorWrapper = ({ content, setContent }: EditorWrapperProps) => {
  return (
    <div>
      <Editor
        editorSerializedState={content}
        onSerializedChange={(value) => setContent(value)}
      />
    </div>
  )
}

export default EditorWrapper;
