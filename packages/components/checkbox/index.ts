import _Checkbox from './src/checkbox.vue';
import { withInstall } from '@r-vue3-ui/utils/withInstall';

const Checkbox = withInstall(_Checkbox);

export default Checkbox;

declare module 'vue' {
  export interface GlobalComponents {
    RCheckbox: typeof Checkbox;
  }
}
