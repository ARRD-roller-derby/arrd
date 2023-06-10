import styles from './editor.module.css'
import { useEditor, EditorContent, BubbleMenu } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Underline from '@tiptap/extension-underline'
import { useEffect } from 'react'
import { Divider } from 'rsuite'
import { Flex } from '../flex/flex'
import {
  faBold,
  faH1,
  faH2,
  faH3,
  faItalic,
  faList,
  faStrikethrough,
  faUnderline,
} from '@fortawesome/sharp-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

interface EditorProps {
  content: string | Object
  setContent: (value: Object) => void
  isEditable?: boolean
}

export const Editor: React.FC<EditorProps> = ({
  content,
  setContent,
  isEditable = true,
}) => {
  const editor = useEditor({
    extensions: [StarterKit, Underline],
    content,
    onUpdate(props) {
      setContent(props.editor.getJSON())
    },
  })

  useEffect(() => {
    if (editor) {
      editor.setEditable(isEditable)
    }
  }, [isEditable, editor])

  return (
    <div className={styles.container} data-editable={isEditable}>
      {editor && isEditable && (
        <div className={styles.menu}>
          <div className={styles.group}>
            <FontAwesomeIcon
              icon={faH1}
              onClick={() =>
                editor.chain().focus().toggleHeading({ level: 1 }).run()
              }
              className={
                editor.isActive('heading', { level: 1 })
                  ? styles.active
                  : styles.icon
              }
            />
            <FontAwesomeIcon
              icon={faH2}
              onClick={() =>
                editor.chain().focus().toggleHeading({ level: 2 }).run()
              }
              className={
                editor.isActive('heading', { level: 2 })
                  ? styles.active
                  : styles.icon
              }
            />
            <FontAwesomeIcon
              icon={faH3}
              onClick={() =>
                editor.chain().focus().toggleHeading({ level: 3 }).run()
              }
              className={
                editor.isActive('heading', { level: 3 })
                  ? styles.active
                  : styles.icon
              }
            />
          </div>
          <Divider vertical />
          <div className={styles.group}>
            <FontAwesomeIcon
              icon={faBold}
              onClick={() => editor.chain().focus().toggleBold().run()}
              className={editor.isActive('bold') ? styles.active : styles.icon}
            />
            <FontAwesomeIcon
              icon={faItalic}
              onClick={() => editor.chain().focus().toggleItalic().run()}
              className={
                editor.isActive('italic') ? styles.active : styles.icon
              }
            />

            <FontAwesomeIcon
              icon={faStrikethrough}
              onClick={() => editor.chain().focus().toggleStrike().run()}
              className={
                editor.isActive('strike') ? styles.active : styles.icon
              }
            />
            <FontAwesomeIcon
              icon={faUnderline}
              onClick={() => editor.chain().focus().toggleUnderline().run()}
              className={
                editor.isActive('underline') ? styles.active : styles.icon
              }
            />
          </div>
          <Divider vertical />
          <div className={styles.group}>
            <FontAwesomeIcon
              icon={faList}
              onClick={() => editor.chain().focus().toggleBulletList().run()}
              className={
                editor.isActive('bullet-list') ? styles.active : styles.icon
              }
            />
          </div>
        </div>
      )}
      <EditorContent editor={editor} className={styles.editor} />
    </div>
  )
}
