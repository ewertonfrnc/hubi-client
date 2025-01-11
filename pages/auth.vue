<template>
  <div class="auth">
    <div class="auth__group">
      <h2>Criar conta</h2>

      <Panel>
        <AuthRegisterForm />
      </Panel>
    </div>

    <div class="auth__group">
      <h2>Acessar sua conta</h2>

      <Panel>
        <AuthLoginForm />
      </Panel>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
.auth {
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 32px;

  &__group {
    display: flex;
    flex-direction: column;
    gap: 8px;

    h2 {
      font-size: 18px;
      font-weight: 500;
    }
  }
}
</style>
