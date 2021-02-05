<template>
  <div>
    <div>
      <h1>Hidden request</h1>
      {{ data }}
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import Mock from "mockjs";
import { useRequest } from "@/hook";

async function getEmail(search: string): Promise<string[]> {
  console.log(search);
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(Mock.mock({ "data|5": ["@email"] }).data);
    }, 300);
  });
}

export default defineComponent({
  setup() {
    const { data, loading } = useRequest(getEmail, {
      pollingWhenHidden: true,
      pollingInterval: 1000
    });
    return {
      data,
      loading
    };
  }
});
</script>
