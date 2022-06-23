<template>
  <div class="text-left px-8">
    <div class="text-start text-xl">Adviessignalen</div>
    <hr class="my-4">
    <div class="flex align-center">
      <div class="self-center mr-3">Filter op Jaar</div>
      <el-select v-model="selectedYears" multiple placeholder="Select">
        <el-option
          v-for="year in years"
          :key="year"
          :label="year"
          :value="year">
        </el-option>
      </el-select>
    </div>
    <hr class="mt-4 mb-8">
    <div v-for="(signals, year) in currentAdviceSignals" :key="year" class="mt-3">
      <div class="text-blue-600/100 mb-2">{{ year }}</div>
      <div class="text-zinc-400 text-xs mb-8">{{ signals.length }} adviessignalen</div>
      <div
        v-for="(signal, index) in signals"
        :key="index"
        class="mt-3">
        <div class="text-zinc-400 text-xs">{{ get(signal, 'CreateDate') }}</div>
        <div
          :class="['adviessignal-content__title cursor-pointer mt-1', !adviceSignalHasBeenOpened(signal) && 'font-bold']"
          @click="selectedSignal = signal; klantenDetailsDialogVisible = true">
          {{ get(signal, 'Title') }}
        </div>
        <hr class="my-3">
      </div>
    </div>
    <KlantenDetailsDialog
      title="Tips"
      :visible.sync="klantenDetailsDialogVisible"
      :selected-signal="selectedSignal"
    />
  </div>
</template>

<script>
import { get } from 'lodash';
import KlantenDetailsDialog from './KlantenDetailsDialog'

export default {
  components: {
    KlantenDetailsDialog,
  },
  props: {
    data: {
      type: Object,
      required: true,
      default: () => {},
    },
  },
  data() {
    return {
      klantenDetailsDialogVisible: false,
      selectedSignal: {},
      adviceSignalsPerYear: {},
      selectedYears: [2020],
      years: [2020, 2019, 2018, 2017]
    }
  },
  created() {
    this.setAdviceSignalsPerYear();
    this.$emit('number-of-advice-signals', this.nrOfAdviceSignals);
  },
  watch: {
    data: {
      deep: true,
      handler() {
        this.setAdviceSignalsPerYear();
      }
    },
    selectedYears() {
      this.$emit('number-of-advice-signals', this.nrOfAdviceSignals);
    },
  },
  computed: {
    currentAdviceSignals() {
      const currentAdviceSignals = {};
      Object.entries(this.adviceSignalsPerYear).forEach(([year, signal]) => {
        if (this.selectedYears.includes(Number(year))) currentAdviceSignals[year] = signal;
      });
      return currentAdviceSignals;
    },
    nrOfAdviceSignals() {
      let numberOfAdviceSignals = 0;
      Object.values(this.currentAdviceSignals).forEach(signal => numberOfAdviceSignals += signal.length);
      return numberOfAdviceSignals;
    },
  },
  methods: {
    get,
    adviceSignalHasBeenOpened(signal) {
      return get(signal, 'Status') === 200;
    },
    setAdviceSignalsPerYear() {
      this.years.forEach((y) => this.adviceSignalsPerYear[y] = this.getAdviceSignals(y));
    },
    getAdviceSignals(year) {
      const signals = [];
      get(this.data, 'AdviceSignals', []).forEach((signal) => {
        if (Number(get(signal, 'Klantgegevens.Origin', '').split(' ')[1]) === year) signals.push(signal);
      });
      return signals;
    },
  },
}
</script>

<style scoped>
</style>