<template>
  <Form
    v-slot="$form"
    :initial-values
    :resolver
    @submit="onFormSubmit"
    class="form"
  >
    <div class="form__group">
      <InputText
        name="username"
        type="text"
        placeholder="Nome de usuário"
        fluid
      />
      <Message
        v-if="$form.username?.invalid"
        severity="error"
        size="small"
        variant="simple"
        >{{ $form.username.error?.message }}</Message
      >
    </div>

    <div class="form__group">
      <InputText name="name" type="text" placeholder="Nome completo" fluid />
      <Message
        v-if="$form.name?.invalid"
        severity="error"
        size="small"
        variant="simple"
        >{{ $form.name.error?.message }}</Message
      >
    </div>

    <div class="form__group">
      <InputText
        name="email"
        type="email"
        placeholder="Seu melhor e-mail"
        fluid
      />
      <Message
        v-if="$form.email?.invalid"
        severity="error"
        size="small"
        variant="simple"
        >{{ $form.email.error?.message }}</Message
      >
    </div>

    <div class="form__group">
      <Password
        :feedback="false"
        name="password"
        placeholder="Insira sua senha"
        fluid
      />
      <Message
        v-if="$form.password?.invalid"
        severity="error"
        size="small"
        variant="simple"
        >{{ $form.password.error?.message }}</Message
      >
    </div>

    <Button type="submit" severity="secondary" label="Criar conta" />
  </Form>
  <Toast />
</template>

<script setup lang="ts">
import type { FormSubmitEvent } from "@primevue/forms";
import { zodResolver } from "@primevue/forms/resolvers/zod";
import { z } from "zod";

const store = useAuthStore();
const router = useRouter();

const initialValues = reactive({
  username: "",
  name: "",
  email: "",
  password: "",
});

const resolver = zodResolver(
  z.object({
    name: z.string().min(1, { message: "Informe um nome." }),
    email: z.string().min(1, { message: "Informe um email." }),
    password: z.string().min(6, { message: "Informe uma senha." }),
    username: z.string().min(1, { message: "Informe um nome de usuário." }),
  }),
);

async function onFormSubmit({ valid, values }: FormSubmitEvent) {
  if (valid) {
    await store.registerNewUser({
      name: values.name,
      email: values.email,
      password: values.password,
      username: values.username,
    });

    router.back();
  }
}
</script>

<style scoped lang="scss">
.form {
  display: flex;
  flex-direction: column;
  gap: 16px;
}
</style>
