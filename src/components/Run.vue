<template>
  <div>
    <div>
      <h1>Base request</h1>
      <button @click="startRequest">startRequest</button>
      <div v-if="loading">Loading...</div>
      <div v-else>{{ data }}</div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import Mock from 'mockjs';
import { useRequest } from '@/hook';
function getUsername(): Promise<string> {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(Mock.mock('@name'));
    }, 1000);
  });
}

export default defineComponent({
  setup() {
    const { data, loading, run } = useRequest(getUsername, { manaul: true });
    const startRequest = () => {
      run();
    };
    return {
      startRequest,
      data,
      loading,
    };
  },
});
</script>
