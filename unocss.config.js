import {defineConfig,presetUno} from 'unocss'

const remRE = /(-?[\.\d]+)rem/g

function transformUniappPreset(){
  return {
    name: 'preset-transform-uniapp',
    postprocess: (util) => {
      util.entries.forEach((i) => {
        const [,value] = i
        if (typeof value === 'string' && remRE.test(value)){
          i[1] = value.replace(remRE, (_, p1) => `${+p1 * 4}rpx`)
        }
        if(typeof value === 'string' && ['rgba'].some(x=>value.startsWith(x))){
          i[1] = value.replace(/,var\(.+\)\)$/, ')').replace('rgba', 'rgb')
        }
      })
      util.entries = util.entries.filter((i)=> {
        const [key]= i
        return typeof key === 'string' && !['--un-text-opacity'].some(k=>k===key)
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
    presetUno({
      preflight: false
    }),
    transformUniappPreset(),
  ]
})