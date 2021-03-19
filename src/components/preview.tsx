import { useRef, useEffect } from 'react'

interface PreviewProps {
  code: string
}

const html = `
    <html>
    <head></head>
    <body>
      <div id="root"></div>
      <script>
        window.addEventListener('message', event => {
          try{
            eval(event.data)
          }catch(err){
            const root = document.querySelector('#root')
            root.innerHTML = '<div style="color: red"> <h4>Runtime Error</h4>'+ err +'</div>';
            console.error(err); 
          }
        }, false )
      </script>
    </body>
    </html>
  `

const Preview: React.FC<PreviewProps> = ({ code }) => {
  const iframe = useRef<any>()

  useEffect(() => {
    // reset the conents of the iframe before bundling
    iframe.current.srcdoc = html
    iframe.current.contentWindow.postMessage(code, '*')
  }, [code])

  return (
    <iframe ref={iframe} src='/test.html' sandbox='allow-scripts' srcDoc={html} title='Preview' />
  )
}

export default Preview
