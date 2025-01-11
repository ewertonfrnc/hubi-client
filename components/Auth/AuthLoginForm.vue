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

const toast = useToast();

const initialValues = reactive({
  email: "",
  password: "",
});

const resolver = zodResolver(
  z.object({
    email: z.string().min(1, { message: "Informe um email." }),
    password: z.string().min(6, { message: "Informe uma senha." }),
  }),
);

const onFormSubmit = ({ valid, values }: FormSubmitEvent) => {
  if (valid) {
    console.log("valid form!", { values });
    toast.add({
      severity: "info",
      summary: "Info",
      detail: "Message Content",
      life: 3000,
    });
  }
};
</script>

<style scoped lang="scss">
.form {
  display: flex;
  flex-direction: column;
  gap: 16px;
}
</style>
