import * as esbuild from 'esbuild-wasm'
import axios from 'axios'

export const unpkgPathPlugin = () => {
  return {
    // identifier for debugging
    name: 'unpkg-path-plugin',
    // build represents the bundling process, finding a file, loading it up, parsing it,
    // transpiling it and joining a bunch a files together
    setup(build: esbuild.PluginBuild) {
      // Determine where the file is stored
      build.onResolve({ filter: /.*/ }, async (args: any) => {
        console.log('onResolve', args)
        if (args.path === 'index.js') return { path: args.path, namespace: 'a' }
        // if a path is other than index.js it means it's a module hosted on unpkg
        if (args.path.includes('./') || args.path.includes('../')) {
          return {
            path: new URL(args.path, `https://unpkg.com${args.resolveDir}/`).href,
            namespace: 'a',
          }
        }
        return { path: `https://unpkg.com/${args.path}`, namespace: 'a' }
      })

      // to override esbuild's process of loading a file ( which is accesing the file system)
      build.onLoad({ filter: /.*/ }, async (args: any) => {
        console.log('onLoad', args)
        //parse the file, find any import/require/exports and figure out
        //where the requested file is (goes thru the onResolve step once again)
        // once found goes thru the onLoad process once again
        if (args.path === 'index.js') {
          return {
            loader: 'jsx',
            contents: `
              const message = require('nested-test-pkg')
              console.log(message);
            `,
          }
        }

        const { data, request } = await axios.get(args.path)
        return {
          loader: 'jsx',
          contents: data,
          resolveDir: new URL('./', request.responseURL).pathname,
        }
      })
    },
  }
}
