<template>
  <el-dialog :visible.sync="visibleHook">
    <div class="text-xl text-black">
      Belastingbesparing bij gedeeltelijk aflossen eigenwoningschuld
    </div>
    <div class="text-xs my-3">{{ get(selectedSignal, 'CreateDate') }}</div>
    <div class="break-normal mt-2">
      <div class="text-start sub-header">
        <div class="text-black font-bold text-lg text-start sub-header__title">{{ 'Klantgegevens' }}</div>
        <div class="gegevens__params">
          <div
            v-for="(param, index) in get(selectedSignal, 'Klantgegevens.Paramters')"
            :key="index"
            class="flex justify-between text-black text-xs">
            <div class="font-bold">{{ get(param, 'ParmName') }}</div>
            <div class="mx-4">
              {{ `${isCurrency(get(param, 'ParmValue')) ? '€ ' : ''}${get(param, 'ParmValue')}` }}
            </div>
          </div>
        </div>
      </div>
      <div class="flex gegevens__uit text-xs mt-2">
        <div>Gegevens uit:</div>
        <div class="text-blue-600/100 ml-1">
          {{ get(selectedSignal, 'Klantgegevens.Origin') }}
        </div>
      </div>
      <hr class="my-4">
    </div>
    <div class="sub-header break-normal">
      <div class="text-black font-bold text-lg mt-2 sub-header__title">{{ 'Beschrijving' }}</div>
      <div>{{ get(selectedSignal, 'Description') }}</div>
    </div>
    <hr class="my-6">
    <div class="flex justify-end">
      <el-button
        @click="visibleHook = false">
        Venster sluiten
      </el-button>
    </div>

  </el-dialog>
</template>

<script>
import { get } from 'lodash';
export default {
  props: {
    visible: {
      type: Boolean,
      required: true,
    },
    selectedSignal: {
      type: Object,
      required: true,
      default: () => {},
    },
  },
  data() {
    return {
      visibleHook: false,
    };
  },
  watch: {
    visible: {
      immediate: true,
      handler(bool) {
        this.visibleHook = bool;
      },
    },
    visibleHook(bool) {
      this.$emit('update:visible', bool);
    },
  },
  methods: {
    get,
    isCurrency(value = '') {
      return /^\d+$/.test(value);
    },
  },
}
</script>

<style scoped>
  .el-dialog__wrapper >>> .el-dialog__header {
    padding-top: 0px;
  }
  .title {
    font-size: 26px
  }
  .gegevens {
    display: block;
  }
  .gegevens__params {
    column-count: 1;
  }
  @media screen and (min-width: 1200px) {
    .sub-header {
      display: flex;
    }
    .sub-header__title {
      min-width: 150px;
    }
    .gegevens__uit {
      margin-left: 150px;
    }
    .gegevens__params {
      column-count: 2;
    }
  }

</style>