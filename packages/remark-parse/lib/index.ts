import type { Root } from '../node_modules/@types/mdast/index.d.ts'
import type { Options } from '../node_modules/mdast-util-from-markdown/index.d.ts'
import type { Plugin, ParserFunction } from '../node_modules/unified/index.d.ts'

// import {fromMarkdown} from 'mdast-util-from-markdown'
import {fromMarkdown} from '../node_modules/mdast-util-from-markdown/index.js'

/** @type {import('unified').Plugin<[Options?] | void[], string, Root>} */
export const remarkParse: Plugin< Options[] | void[], string, Root> = (function (options: Options[]) {

  const parser:ParserFunction<Root> = (doc) => {
    // Assume options.
    const settings = (this.data('settings')) as Options

    return fromMarkdown(
      doc,
      Object.assign({}, settings, options, {
        // Note: these options are not in the readme.
        // The goal is for them to be set by plugins on `data` instead of being
        // passed by users.
        extensions: this.data('micromarkExtensions') || [],
        mdastExtensions: this.data('fromMarkdownExtensions') || []
      })
    )
  }

  Object.assign(this, {Parser: parser})
}) as Plugin<Options[] | void[], string, Root>

export default remarkParse
