import * as esbuild from 'esbuild-wasm'
import { useState, useRef, useEffect } from 'react'
import ReactDOM from 'react-dom'

const App = () => {
  const [code, setCode] = useState('')
  const textAreaRef = useRef<HTMLTextAreaElement | null>(null)
  const ref = useRef<any>()

  //start ESBuild
  const startService = async () => {
    ref.current = await esbuild.startService({
      worker: true,
      wasmURL: '/esbuild.wasm',
    })
  }

  useEffect(() => {
    startService()
  }, [])

  const onClick = async () => {
    if (!ref.current) return
    const result = await ref.current.transform(textAreaRef?.current?.value, {
      loader: 'jsx',
      target: 'es2015',
    })

    setCode(result.code)
  }
  return (
    <div>
      <textarea ref={textAreaRef}></textarea>
      <div>
        <button onClick={onClick}>Submit</button>
      </div>
      <pre>{code}</pre>
    </div>
  )
}

ReactDOM.render(<App />, document.querySelector('#root'))
