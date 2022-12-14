import { PropType, ExtractPropTypes, SetupContext, InjectionKey } from 'vue';

export type Key = string | number;

// 外部用户传递的 props 类型，可以松散一些
export interface TreeOption {
  key?: Key;
  label?: Key;
  children?: TreeOption[];
  level?: number;
  isLeaf?: boolean;
  disabled?: boolean;
  [key: string]: unknown;
}
// ts 的类型都用大写开始
// js 的变量类型都使用 驼峰命名

// 这个类型是 tree data 内部必须要有的参数
export interface TreeNode extends Required<TreeOption> {
  rawNode: TreeOption;
  level: number;
  children: TreeNode[];
  parentKey: Key | undefined;
}

export const treeProps = {
  data: {
    type: Array as PropType<TreeOption[]>,
    required: true,
  },
  keyField: {
    type: String as PropType<string>,
    default: 'key',
  },
  labelField: {
    type: String as PropType<string>,
    default: 'label',
  },
  childrenField: {
    type: String as PropType<string>,
    default: 'children',
  },
  defaultExpandKeys: {
    type: Array as PropType<Key[]>,
    default: () => [],
  },
  // 提供一个加载函数，在用户点击的时候，往 children下面添加孩子。
  onLoad: Function as PropType<(node: TreeOption) => Promise<TreeOption[]>>,
  selectedKeys: {
    type: Array as PropType<Key[]>,
  },
  selectable: {
    type: Boolean as PropType<boolean>,
  },
  multiple: {
    type: Boolean as PropType<boolean>,
  },
  showCheckbox: Boolean as PropType<boolean>,
  defaultCheckedKeys: {
    type: Array as PropType<Key[]>,
  },
} as const;

export type TreeProps = ExtractPropTypes<typeof treeProps>;

export const treeEmits = {
  'update:selectedKeys': (keys: Key[]) => keys,
};

// treeNode
export const treeNodeProps = {
  key: String as PropType<Key>,
  node: {
    type: Object as PropType<TreeNode>,
    required: true,
  },
  expanded: {
    type: Boolean as PropType<boolean>,
    required: true,
  },
  loadingKeys: {
    type: Object as PropType<Set<Key>>,
    required: true,
  },
  selectedKeys: {
    type: Array as PropType<Key[]>,
    default: () => [],
  },
  showCheckbox: {
    type: Boolean as PropType<boolean>,
    default: false,
  },
  checked: Boolean,
  disabled: Boolean,
  indeterminate: Boolean,
} as const;

export type TreeNodeProps = ExtractPropTypes<typeof treeNodeProps>;

export const treeNodeEmits = {
  toggle: (node: TreeNode) => node,
  select: (node: TreeNode) => node,
  check: (node: TreeNode, val: boolean) => typeof val === 'boolean',
};

export interface TreeContent {
  slots: SetupContext['slots'];
}

// 用来给 provide 左 key 的
export const treeInjectKey: InjectionKey<TreeContent> = Symbol();
