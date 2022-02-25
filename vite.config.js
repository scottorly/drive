export default {
  css: {
    modules: {
      generateScopedName: (name) => name
    }
  },
  base: '/drive/',
  build: {
    outDir: 'docs'
  },
  esbuild: {
    jsxFactory: 'h',
    jsxFragment: 'f',
    jsxInject: `import {h, f} from 'jsx-pragma'`
  }
}