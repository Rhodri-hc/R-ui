import { withInstall } from '@r-vue3-ui/utils/withInstall';
import _VirtualList from './src/virtual-list';

const VirtualList = withInstall(_VirtualList);

export default VirtualList;

declare module 'vue' {
  export interface GlobalComponents {
    RVirtualList: typeof VirtualList;
  }
}
