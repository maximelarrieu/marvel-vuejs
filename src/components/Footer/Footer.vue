<template>
  <div class="footer">
    <p>
      © 2022 <span class="separator">|</span> Maxime Larrieu
      <span class="separator">|</span>
      Théo Delas
    </p>
  </div>
</template>

<script>
export default {
  name: "FooterComponent",
};
</script>

<style scoped>
.footer {
  margin-top: 2rem;
  padding: 3rem 0;
  background-color: whitesmoke;
}

.separator {
  padding: 0 0.8rem;
}
</style>
