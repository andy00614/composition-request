export interface Options {
  manaul?: boolean;
  onSuccess?: (result: any, params?: any) => void;
  pollingInterval?: number;
  pollingWhenHidden?: boolean;
  debounceInterval?: number;
  throttleInterval?: number;
}

export interface PollingRequest {
  // ? 这里是否需要拿到结果呢
  run: (...params: any) => Promise<any>;
  cancel: () => void;
}
