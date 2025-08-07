<template>
  <div class="page-layout">
    <!-- <Header /> -->
    <div class="main-container">
      <RouterView />
    </div>
  </div>
</template>

<script setup lang="ts">
// import Header from "@/components/organisms/Header.vue";
</script>

<style scoped>
.page-layout {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: var(--white);
  width: 100%;
}

.main-container {
  flex: 1;
}

/* Tablet */
@media (min-width: 768px) and (max-width: 1023px) {
  /* .main-container {
    padding: var(--size-24);
  } */
}

/* Desktop */
@media (min-width: 1024px) {
  .page-layout {
    max-width: 1440px;
    margin: 0 auto;
  }

  /* .main-container {
    padding: var(--size-24);
  } */
}
</style>
