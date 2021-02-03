export interface Options {
  manaul?: boolean;
  onSuccess?: (result: any, params?: any) => void;
  pollingInterval?: boolean;
  pollingWhenHidden?: boolean;
}

export interface PollingRequest {
  // ? 这里是否需要拿到结果呢
  run: () => Promise<any>;
  cancel: () => void;
}
