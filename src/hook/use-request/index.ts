// import { ref } from "@vue/composition-api";
import { ref } from 'vue';
import { Options, PollingRequest } from './type';
import { isOnCurPage } from './utils';
import throttle from 'lodash.throttle';
import debounce from 'lodash.debounce';
import '../../dep';

// ToDO: any -> generic
export default function useRequest<T extends unknown[], R>(
  requestFn: (...params: T) => R,
  options?: Options,
) {
  const requestData = ref<R>();
  const loading = ref(false);
  async function startRequest(...params: T) {
    loading.value = true;
    const res = await requestFn(...params);
    requestData.value = res;
    loading.value = false;
    return res;
  }

  function RequestInPolling(time = 1000): PollingRequest {
    let timer = null as any;
    const run = async (...params: T) => {
      const data = await startRequest(...params);
      options?.onSuccess && options.onSuccess(data, null);
      timer = setInterval(async () => {
        if (!options?.pollingWhenHidden || isOnCurPage()) {
          const data = await startRequest(...params);
          options?.onSuccess && options.onSuccess(data, null);
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
  const requestInPolling = RequestInPolling(options?.pollingInterval || 1000);

  async function run(...params: T): Promise<R> {
    if (options?.pollingInterval) {
      return requestInPolling.run(params);
    }
    const data = await startRequest(...params);
    options && options.onSuccess && options.onSuccess(data, null);
    return data;
  }

  function runFactory() {
    if (options?.debounceInterval) {
      return debounce(run, options.debounceInterval);
    }
    if (options?.throttleInterval) {
      return throttle(run, options.throttleInterval);
    }
    return run;
  }

  if (!options?.manaul) {
    // @ts-ignore
    startRequest();
  }

  return {
    data: requestData,
    loading,
    run: runFactory(),
    cancel: requestInPolling.cancel,
  };
}
