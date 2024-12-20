<template>
  <div>
    <h1>Stack and Queue Implementation</h1>

    <section>
      <h2>Stack</h2>
      <input v-model="stackInput" placeholder="Enter value" />
      <button @click="pushToStack">Push</button>
      <button @click="popFromStack">Pop</button>
      <p>Stack: {{ stack }}</p>
    </section>

    <section>
      <h2>Queue</h2>
      <input v-model="queueInput" placeholder="Enter value" />
      <button @click="enqueueToQueue">Enqueue</button>
      <button @click="dequeueFromQueue">Dequeue</button>
      <p>Queue: {{ queue }}</p>
    </section>
  </div>
</template>

<script>
export default {
  data() {
    return {
      stack: [],
      stackInput: '',
      queue: [],
      queueInput: '',
    };
  },
  methods: {
    // Stack methods
    pushToStack() {
      if (this.stackInput) {
        this.stack.push(this.stackInput);
        this.stackInput = '';
      }
    },
    popFromStack() {
      if (this.stack.length > 0) {
        this.stack.pop();
      }
    },

    // Queue methods
    enqueueToQueue() {
      if (this.queueInput) {
        this.queue.push(this.queueInput);
        this.queueInput = '';
      }
    },
    dequeueFromQueue() {
      if (this.queue.length > 0) {
        this.queue.shift();
      }
    },
  },
};
</script>

<style>
section {
  margin-bottom: 20px;
}
input {
  margin-right: 10px;
}
</style>
