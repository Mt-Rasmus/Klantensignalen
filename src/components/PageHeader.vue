<template>
  <div>
    <el-tabs v-model="selectedPage" class="ml-3">
      <el-tab-pane
        v-for="page in pages"
        :key="page.key"
        :label="page.title"
        :name="page.key">
        <span slot="label">
          <router-link :to="page.key">
            {{ page.title }}
          </router-link>
        </span>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
export default {
  created() {
    const route = this.$router.history.current.path;
    this.selectedPage = route.split('/')[1] || 'klanten';
  },
  data() {
    return {
      selectedPage: 'klanten',
      pages: [
        {
          title: 'Klanten',
          key: 'klanten',
        },
        {
          title: 'Aangiften',
          key: 'aangiften',
        },
        {
          title: 'Serviceberichten',
          key: 'serviceberichten',
        },
      ],
    }
  }
}
</script>

<style scoped>
.demo-tabs > .el-tabs__content {
  padding: 32px;
  color: #6b778c;
  font-size: 32px;
  font-weight: 600;
}
</style>