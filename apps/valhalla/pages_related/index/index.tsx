import { Editor } from 'ui'
import { PageLayout } from '../../layout/page-layout/page-layout'
import { Message } from 'message'
import { tiptapJsonToMd } from 'utils'

export const Index: React.FC = () => {
  return (
    <PageLayout>
      <h1>Index</h1>
      <Editor
        isEditable={false}
        content={{
          type: 'doc',
          content: [
            {
              type: 'paragraph',
              content: [
                {
                  type: 'text',
                  text: 'Wow, this editor instance exports its content as JSON.',
                },
              ],
            },
          ],
        }}
        setContent={(val: any) => {
          //  console.log(JSON.stringify(val))
          console.log(tiptapJsonToMd([val]))
        }}
      />
      <Message />
    </PageLayout>
  )
}
