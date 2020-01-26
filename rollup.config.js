import babel from 'rollup-plugin-babel'
import resolve from 'rollup-plugin-node-resolve'
import { terser } from 'rollup-plugin-terser'

const dist = 'dist'
const bundle = 'bundle'

const production = !process.env.ROLLUP_WATCH

export default {
  input: 'src/index.js',
  external: ['react'],
  output: [
    {
      file: `${dist}/${bundle}.cjs.js`,
      format: 'cjs'
    },
    {
      file: `${dist}/${bundle}.esm.js`,
      format: 'esm'
    },
    {
      name: 'ReactCssSpinners', // To reference in the window object
      file: `${dist}/${bundle}.umd.js`,
      globals: {
        react: 'React'
        /* 'react-dom': 'ReactDOM' */
      },
      format: 'umd'
    }
  ],
  plugins: [
    resolve(),

    babel({
      /*  exclude: 'node_modules/**' */
      babelrc: false, // to ignore @babel/transform-runtime
      exclude: 'node_modules/**',
      presets: ['@babel/env', '@babel/react']
    }),
    production && terser()
  ]
}
