import DefaultTheme from 'vitepress/theme';
import '@r-vue3-ui/theme-chalk/src/index.scss';
import RIcon from '@r-vue3-ui/components/icon';

export default {
  ...DefaultTheme,
  enhanceApp({ app }) {
    app.use(RIcon); // 注册组件
  },
};
