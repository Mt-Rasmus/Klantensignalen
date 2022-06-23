<template>
  <div class="sidebar-container">
    <div class="text-left ml-6">
      <div class="text-xl">
        {{ get(data, 'ClientName') }}
      </div>
      <div class="text-xs text-zinc-400 mt-2">
        {{ `BSN ${get(data, 'BsnFi')}` }}
      </div>
    </div>
    <hr class="my-4">
    <el-tabs
      v-model="selectedOption"
      :tab-position="'right'"
      @tab-click="$emit('select-option', selectedOption)">
      <el-tab-pane
        v-for="option in options"
        :key="option.key"
        :label="
          `${option.title}
            ${option.key === 'adviessignalen' && selectedOption === 'adviessignalen'
            ? `(${numberOfAdviceSignals})` : option.key === 'adviessignalen' ? '(0)' : ''}`"
        :name="option.key">
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import { get } from 'lodash';
export default {
  props: {
    data: {
      type: Object,
      required: true,
      default: () => {},
    },
    options: {
      type: Array,
      required: true,
      default: () => [],
    },
    numberOfAdviceSignals: {
      type: Number,
      required: false,
      default: 0,
    },
  },
  data() {
    return {
      selectedOption: '',
    };
  },
  created() {
    if (!this.options.length) return
    this.selectedOption = get(this.options[0], 'key');
  },
  methods: {
    get,
  },
}
</script>

<style scoped>
.demo-tabs > .el-tabs__content {
  padding: 32px;
  color: #6b778c;
  font-size: 32px;
  font-weight: 600;
}
  /* .sidebar-container {
    max-width: 150px;
  } */
</style>