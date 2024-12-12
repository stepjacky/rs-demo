import { defineConfig } from '@rsbuild/core';
import { pluginVue } from '@rsbuild/plugin-vue';
import { pluginBabel } from '@rsbuild/plugin-babel';
import { pluginLess } from '@rsbuild/plugin-less';
import { pluginVueJsx } from '@rsbuild/plugin-vue-jsx';
import { pluginSass } from '@rsbuild/plugin-sass';
export default defineConfig({
  source: {
    entry: {
      index: './src/index.ts',
    },
    alias: {
      '@mobile': './src/mobile',
    },
    define: {
      //'process.env': { ...process.env }
    },

  },
  output: {
    polyfill: 'entry',
  },
  html: {
    title: '特能集团人才测评投票系统',
  },
  dev: {
    hmr: true,
    liveReload: true,
  },
  server: {
    open: {
      target: "/#/",
    },
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:88',
        pathRewrite: { '^/api': '' },
      },
    },
  },
  plugins: [
    pluginBabel({
      include: /\.(?:jsx)$/,
    }),
    pluginVue(),
    pluginVueJsx(),
    pluginLess(),
    pluginSass({
      sassLoaderOptions: {
        sassOptions: {
          silenceDeprecations: ['import'],
        },
      },
    }),
  ],
});
