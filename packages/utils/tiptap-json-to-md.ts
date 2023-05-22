interface Content {
  type: string
  text?: string
  attrs?: { level: number }
  marks?: Content[]
  content?: Content[]
}

export function tiptapJsonToMd(contentArray: Content[]) {
  let markdown = ''
  if (!contentArray) return markdown
  contentArray.forEach((content) => {
    if (content.type === 'text') {
      let txt = content.text || ''

      if (content.marks) {
        content.marks.forEach((mark) => {
          if (mark.type === 'bold') txt = `**${txt.trim()}**`
          if (mark.type === 'italic') txt = `*${txt.trim()}*`
          if (mark.type === 'strike') txt = `~~${txt.trim()}~~`
          if (mark.type === 'underline') txt = `__${txt.trim()}__`
        })
      }

      markdown += txt + ' '
    } else if (content.type === 'heading') {
      markdown += '\n'
      markdown += `${'#'.repeat(content.attrs?.level || 0)} ${
        content.content ? tiptapJsonToMd(content.content) : ''
      }\n`
    } else if (content.type === 'paragraph') {
      markdown += `${content.content ? tiptapJsonToMd(content.content) : ''}\n`
    } else if (content.type === 'bulletList') {
      content?.content.forEach((listItem) => {
        markdown += `- ${
          listItem.content ? tiptapJsonToMd(listItem.content) : ''
        }\n`
      })
    }

    if (content.content) {
      markdown += tiptapJsonToMd(content.content)
    }
  })

  return markdown.trim()
}
