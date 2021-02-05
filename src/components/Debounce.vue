<template>
  <div>
    <div>
      <h1>Base request</h1>
      <input type="text" @input="handleInput" />
      <div>{{ data }}</div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import Mock from 'mockjs';
import { useRequest } from '@/hook';

async function getEmail(search: string): Promise<string[]> {
  console.log(search);
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(Mock.mock({ 'data|5': ['@email'] }).data);
    }, 300);
  });
}

export default defineComponent({
  setup() {
    const { data, loading, run } = useRequest(getEmail, { debounceInterval: 400 });
    const handleInput = () => {
      run('test');
    };
    return {
      handleInput,
      data,
      loading,
    };
  },
});
</script>
