<template>
  <div>
    <KlantenDossier v-if="selectedOption.key === 'dossier'" />
    <KlantenAdviessignalen
      v-else-if="selectedOption.key  === 'adviessignalen'"
      :data="data"
      @number-of-advice-signals="$emit('number-of-advice-signals', $event)"/>
    <KlantenOverzicht v-else-if="selectedOption.key  === 'overzicht'"/>
  </div>
</template>

<script>
import KlantenDossier from './KlantenDossier'
import KlantenAdviessignalen from './KlantenAdviessignalen'
import KlantenOverzicht from './KlantenOverzicht'

export default {
  components: {
    KlantenDossier,
    KlantenAdviessignalen,
    KlantenOverzicht,
  },
  props: {
    selectedOption: {
      type: Object,
      required: true,
      default: () => {},
    },
    data: {
      type: Object,
      required: true,
      default: () => {},
    },
  },
}
</script>

<style scoped>
</style>