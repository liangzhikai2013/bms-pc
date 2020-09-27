
//引入


import BIC from '@/components/BIC'
import BMS from '@/components/BMS'
import BMSSet from '@/components/BMSSet'
import runParam from '@/components/runParam'
import rlset from '@/components/rlset'
import BICSet from '@/components/BICSet'
import totelAV from '@/components/totelAV'
import network from '@/components/network'

function plugins (Vue) {
  //注册
  Vue.component('bic',BIC); //第一个参数:组件名称,第二个参数:要注册的组件
  Vue.component('bms',BMS);
  Vue.component('bmsset',BMSSet); //第一个参数:组件名称,第二个参数:要注册的组件
  Vue.component('runparam',runParam);
  Vue.component('rlset',rlset); //第一个参数:组件名称,第二个参数:要注册的组件
  Vue.component('bicset',BICSet);
  Vue.component('totelav',totelAV);
  Vue.component('network',network);
}
export default plugins;

