import kebabize from '@renderer/utils/kebabize'
import * as CSS from 'csstype'

/**
 * Will take all props and parse them into css.
 * NOTE: This will take ALL props and WILL pollute the DOM
 * NOT FOR WEB (without creating more logic to limit prop forwarding)
 */
const propsToCss = (props: CSS.Properties): string =>
  Object.entries(props)?.reduce(
    (prev, [key, value]) => `
  ${prev}
  ${kebabize(key)}: ${value};
  `,
    ''
  )

export default propsToCss
