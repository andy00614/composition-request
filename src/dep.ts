import * as Vue3Module from 'vue';
import * as CompositionModule from '@vue/composition-api';

let module = null;
if (Vue3Module && Vue3Module.version && Number.parseInt(V.version) === 3) {
  module = Vue3Module;
} else {
  module = CompositionModule;
}

export default module;
