import { visit } from 'unist-util-visit'

/**
 * Rehype plugin to transform ||text|| into <Spoiler> components
 * This runs AFTER MDX processing, so we work with the HTML AST
 */
export function rehypeSpoiler() {
  return (tree: any) => {
    visit(tree, 'text', (node: any, index: number | undefined, parent: any) => {
      if (!node.value || typeof node.value !== 'string') return

      const spoilerRegex = /\|\|([^\|]+)\|\|/g
      let match
      const matches: Array<{ start: number; end: number; text: string }> = []

      // Find all matches
      while ((match = spoilerRegex.exec(node.value)) !== null) {
        matches.push({
          start: match.index,
          end: match.index + match[0].length,
          text: match[1],
        })
      }

      if (matches.length === 0) return

      // Create new nodes
      const newNodes: any[] = []
      let lastIndex = 0

      matches.forEach(({ start, end, text }) => {
        // Add text before spoiler
        if (start > lastIndex) {
          newNodes.push({
            type: 'text',
            value: node.value.substring(lastIndex, start),
          })
        }

        // Create Spoiler element node
        const spoilerNode = {
          type: 'element',
          tagName: 'Spoiler',
          properties: {},
          children: [{ type: 'text', value: text }],
        }

        newNodes.push(spoilerNode)
        lastIndex = end
      })

      // Add remaining text
      if (lastIndex < node.value.length) {
        newNodes.push({
          type: 'text',
          value: node.value.substring(lastIndex),
        })
      }

      // Replace in parent
      if (parent && Array.isArray(parent.children) && index !== undefined) {
        parent.children.splice(index, 1, ...newNodes)
      }
    })
  }
}


