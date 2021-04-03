import { useState, useEffect } from 'react'

//components
import CodeEditor from './code-editor'
import Preview from './preview'
import Resizable from './resizable'

import bundle from '../bundler/'

const CodeCell = () => {
  const [code, setCode] = useState('')
  const [error, setError] = useState('')
  const [input, setInput] = useState('')

  useEffect(() => {
    //debounce function to prevent bundling from happening on every code change
    const bundleTimer = setTimeout(async () => {
      const output = await bundle(input)
      setCode(output.code)
      setError(output.err)
    }, 1000)

    return () => {
      clearTimeout(bundleTimer)
    }
  }, [input])

  return (
    <Resizable direction='vertical'>
      <div style={{ height: '100%', display: 'flex', flexDirection: 'row' }}>
        <Resizable direction='horizontal'>
          <CodeEditor initialValue='const a = 1' onChange={value => setInput(value)} />
        </Resizable>

        <Preview code={code} err={error} />
      </div>
    </Resizable>
  )
}

export default CodeCell
