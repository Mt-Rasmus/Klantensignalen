<template>
    <div class="flex">
      <KlantenSideBar
        :data="adviceData"
        :options="klantenPageOptions"
        :number-of-advice-signals="numberOfAdviceSignals"
        @select-option="option = klantenPageOptions.find(o => o.key === $event)"/>
      <KlantenDetails
        :data="adviceData"
        :selectedOption="option"
        :options="klantenPageOptions"
        @number-of-advice-signals="numberOfAdviceSignals = $event"/>
    </div>
</template>

<script>
import KlantenSideBar from './KlantenSideBar'
import KlantenDetails from './KlantenDetails'
import adviceData from '../data/advice_testdata.json';

export default {
  components: {
    KlantenSideBar,
    KlantenDetails
  },
  data() {
    return {
      adviceData,
      numberOfAdviceSignals: 0,
      option: {},
      klantenPageOptions: [
        {
          title: 'Dossier',
          key: 'dossier',
        },
        {
          title: 'Adviessignalen',
          key: 'adviessignalen',
        },
        {
          title: 'Overzicht',
          key: 'overzicht',
        },
      ],
    };
  },
  computed: {
    formattedData() {
      return this.adviceData;
    },
  },
  created() {
    this.option = this.klantenPageOptions[0];
  },
}
</script>

<style scoped>
</style>