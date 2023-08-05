import {defineConfig,presetUno} from 'unocss'

const remRE = /(-?[\.\d]+)rem/g

function remToRpxPreset(options = {}){
  const {
    baseFontSize = 4,
  } = options

  return {
    name: 'preset-rem-to-rpx',
    postprocess: (util) => {
      util.entries.forEach((i) => {
        const value = i[1]
        if (typeof value === 'string' && remRE.test(value))
          i[1] = value.replace(remRE, (_, p1) => `${p1 * baseFontSize}rpx`)
      })
    },
  }
}

export default defineConfig({
  cli:{
    entry:{
      patterns: './pages/**/*.{vue,nvue}',
      outFile:'./static/uno.css'
    },
  },
  presets: [
    presetUno(),
    remToRpxPreset(),
  ]
})