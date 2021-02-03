import { ref } from 'vue';
import { Options } from './type';
// ToDO: any -> generic
export function useRequest(requestFn: () => any, options?: Options) {
  const requestData = ref();
  const loading = ref(false);

  async function startRequest() {
    loading.value = true;
    const res = await requestFn();
    requestData.value = res;
    loading.value = false;
    return res;
  }

  async function run() {
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
  };
}
