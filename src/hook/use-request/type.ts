import { Ref } from 'vue';

export interface Options {
  manaul?: boolean;
  onSuccess?: (result: any, params?: any) => void;
  pollingInterval?: number;
  pollingWhenHidden?: boolean;
  debounceInterval?: number;
  throttleInterval?: number;
}

export interface PollingRequest {
  data: Ref<any>;
  run: () => void;
  cancel: () => void;
  loading: Ref<boolean>;
}
