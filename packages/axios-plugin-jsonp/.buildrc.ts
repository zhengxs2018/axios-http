export default {
  target: 'node12',
  entryPoints: ['./src/index.ts'],
  tsconfig: 'tsconfig.json',
  formats: [
    {
      type: 'cjs',
      tsconfig: 'tsconfig.cjs.json'
    },
    {
      type: 'esm',
      outExtension: {
        '.js': '.mjs'
      }
    }
  ]
}
