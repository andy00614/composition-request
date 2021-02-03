import { ref } from 'vue';
import { Options, PollingRequest } from './type';
import { isOnCurPage } from './utils';
// ToDO: any -> generic
export function useRequest<T>(requestFn: () => Promise<T>, options?: Options) {
  const requestData = ref();
  const loading = ref(false);

  async function startRequest() {
    loading.value = true;
    const res = await requestFn();
    requestData.value = res;
    loading.value = false;
    return res;
  }

  function RequestInPolling(time = 1000): PollingRequest {
    let timer = null;
    const run = async () => {
      const data = await startRequest();
      options?.onSuccess(data, null);
      timer = setInterval(async () => {
        if (!options.pollingWhenHidden || isOnCurPage()) {
          const data = await startRequest();
          options.onSuccess(data, null);
        }
      }, time);
      return data;
    };
    const cancel = () => {
      if (!timer) {
        throw ReferenceError(`can't stop before running`);
      }
      loading.value = false;
      clearInterval(timer);
    };
    return {
      run,
      cancel,
    };
  }
  const requestInPolling = RequestInPolling();

  async function run() {
    if (options?.pollingInterval) {
      return requestInPolling.run();
    }
    const data = await startRequest();
    options && options.onSuccess && options.onSuccess(data, null);
    return data;
  }

  if (!options?.manaul) {
    startRequest();
  }

  return {
    data: requestData,
    loading,
    run,
    cancel: requestInPolling.cancel,
  };
}
