import { useState } from 'react'

//components
import CodeEditor from './code-editor'
import Preview from './preview'

import bundle from '../bundler/'

const CodeCell = () => {
  const [code, setCode] = useState('')
  const [input, setInput] = useState('')

  const onClick = async () => {
    const result = await bundle(input)
    setCode(result)
  }

  return (
    <div>
      <CodeEditor initialValue='const a = 1' onChange={value => setInput(value)} />
      <div>
        <button onClick={onClick}>Submit</button>
      </div>
      <Preview code={code} />
    </div>
  )
}

export default CodeCell
