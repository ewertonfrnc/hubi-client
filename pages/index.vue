<template>
  <Home />
</template>

<script setup lang="ts">
import supabase from "~/services/config/supabase.service";

const { data, error } = await supabase.auth.signInWithPassword({
  email: "teste@teste.com",
  password: "12345678",
});

if (data.user) localStorage.setItem("user", JSON.stringify(data.user));
</script>

<style scoped></style>
