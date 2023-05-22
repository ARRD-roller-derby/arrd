import { Editor, Popin } from 'ui'
import { PageLayout } from '../../layout/page-layout/page-layout'
import { Message } from 'message'
import { tiptapJsonToMd } from 'utils'

//TODO on peux passer un whisper pour le type d'event
export const Index: React.FC = () => {
  return (
    <PageLayout>
      <h1>Index</h1>
      <Popin buttonTxt="Creer" modalTitle="Creer un nouveau projet">
        <p>Contenu de la popin</p>
      </Popin>
      <Editor
        // isEditable={false}
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
