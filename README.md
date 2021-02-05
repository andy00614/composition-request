# composition-request
### What
composition-api request function;
*support*: interval request、auto debounce、manual fetch、stop fetching When hidden broswer tab、 and so on... 
### How
```
import { useRequest } from 'compositon-request'
...
    setup() {
        const { data, loading, run } = useRequest(serviceFn:Promise<any>,options);
    }
...
```
```
Options {
  manaul?: boolean;
  onSuccess?: (result: any, params?: any) => void;
  pollingInterval?: number;
  pollingWhenHidden?: boolean;
  debounceInterval?: number;
  throttleInterval?: number;
}
```
```
export interface PollingRequest {
  data: Ref<any>;
  run: () => void;
  cancel: () => void;
  loading: Ref<boolean>;
}
```