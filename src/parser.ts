/* eslint-disable dot-notation */
import { Template } from 'ejs'
import * as SqlString from 'sqlstring'

const ejsScanLine = Template.prototype['scanLine']
const ejsCreateRegex = Template.prototype['createRegex']

Template.modes['FORMATTED'] = 'formatted'

Template.prototype['createRegex'] = function onInjectedCreateRegex() {
  const regexString = ejsCreateRegex.apply(this, []).toString()
  const regexLength = regexString.length
  const newRegexString = `${regexString.substr(1, 15)}|\\{%:${regexString.substr(16, regexLength - 17)}`

  return new RegExp(newRegexString)
}

Template.prototype['scanLine'] = function onInjectedScanLine(line) {
  const { delimiter: d, openDelimiter: o, closeDelimiter: c } = this.opts

  switch (line) {
    case `${o + d}:`:
      this.mode = Template.modes['FORMATTED']
      break
    case `${d + c}`:
      if (this.mode === Template.modes['FORMATTED']) {
        this.mode = null
      } else {
        ejsScanLine.apply(this, [line])
      }
      break
    default:
      if (this.mode) {
        switch (this.mode) {
          case Template.modes['FORMATTED']:
            this.source += `    ; __append(this.format(${line}))\n`
            break
          case Template.modes.ESCAPED:
            this.source += `    ; __append(this.escape(${line}))\n`
            break
          default:
            ejsScanLine.apply(this, [line])
        }
      } else {
        ejsScanLine.apply(this, [line])
      }
      break
  }
}

export default function parse(
  template: string,
  options: ejs.Options = {}
): ejs.AsyncTemplateFunction | ejs.TemplateFunction {
  const templ = new Template(template, {
    ...options,
    ...{
      openDelimiter: '{',
      closeDelimiter: '}',
      client: true
    }
  })

  const ejsTemplate = templ.compile()

  return (data = {}) => {
    return ejsTemplate.apply(SqlString, [data])
  }
}
