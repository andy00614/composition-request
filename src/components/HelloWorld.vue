<template>
  <div class="hello">
    test-request-utils
    <div>
      {{ loading ? 'loading...' : data }}
      <button @click="startRequest">request</button>
    </div>
  </div>
</template>

<script lang="ts">
import { useRequest } from '@/hook/use-request';
import { defineComponent } from 'vue';
import { getUser } from '../request';

export default defineComponent({
  name: 'HelloWorld',
  props: {
    msg: String,
  },
  setup() {
    const { data, loading, run } = useRequest(() => getUser('andy'), {
      manaul: true,
      onSuccess(data) {
        console.log('onSuccess', data);
      },
    });
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

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
