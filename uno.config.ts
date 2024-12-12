import { defineConfig, presetUno } from 'unocss';

export default defineConfig({
    content: {
        filesystem: ['./src/**/*.{html,js,ts,jsx,vue}'],
    },
    presets: [presetUno()],
    rules: [
        ['color-arm', { color: 'rgb(51.2, 126.4, 204)' },],
        ['bg-arm', { 'background-color': 'rgb(51.2, 126.4, 204)' }],
        ['border-arm', { 'border-color': 'rgb(51.2, 126.4, 204)' }],
        ['mw-800px', { 'max-width': '800px' }],
    ]
});