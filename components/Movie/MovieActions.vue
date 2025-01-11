<template>
  <section class="actions">
    <Button icon="pi pi-star" label="Avaliar" severity="secondary" />
    <Button
      icon="pi pi-comment"
      label="Comentar"
      severity="secondary"
      @click="handleAuth"
    />
    <Button icon="pi pi-list" severity="secondary" />
  </section>

  <Dialog
    v-model:visible="state.isCommentModalVisible"
    header="Criar conta"
    modal
    block-scroll
    dismissable-mask
  >
    <div>Para comentar você precisa criar uma conta.</div>

    <template #footer>
      <div class="actions__footer">
        <Button
          label="Fechar"
          severity="secondary"
          variant="outlined"
          @click="state.isCommentModalVisible = !state.isCommentModalVisible"
        />

        <RouterLink to="/auth">
          <Button label="Criar conta" />
        </RouterLink>
      </div>
    </template>
  </Dialog>

  <Drawer
    v-model:visible="state.isDrawerVisible"
    position="bottom"
    style="height: 320px"
  >
    <template #header>
      <p class="actions__comment">
        💭
        <span>Novo comentário</span>
      </p>
    </template>

    <Form v-slot="$form" :resolver :initial-values @submit="onFormSubmit">
      <div>
        <Textarea
          name="review"
          fluid
          rows="5"
          variant="filled"
          style="resize: none"
        />
        <Message
          v-if="$form.review?.invalid"
          severity="error"
          size="small"
          variant="simple"
          >{{ $form.review.error?.message }}</Message
        >
      </div>

      <div class="actions__footer">
        <div class="actions__switch">
          <label for="hasSpoilers">Contém spoilers?</label>
          <ToggleSwitch v-model="state.hasSpoilers" input-id="hasSpoilers" />
        </div>
        <Button type="submit" label="Comentar" />
      </div>
    </Form>
  </Drawer>
  <Toast />
</template>

<script setup lang="ts">
import type { FormSubmitEvent } from "@primevue/forms";
import type { Movie } from "~/interfaces/movies/movies.interface";
import { zodResolver } from "@primevue/forms/resolvers/zod";
import { z } from "zod";

type Props = { movie: Movie };
const props = defineProps<Props>();

const authStore = useAuthStore();
const movieStore = useMoviesStore();
const store = useMoviesStore();

const state = reactive({
  loading: false,
  isCommentModalVisible: false,
  isDrawerVisible: false,
  hasSpoilers: false,
});

const initialValues = reactive({
  review: "",
});

const resolver = ref(
  zodResolver(
    z.object({
      review: z.string().min(1, { message: "Insira seu comentário." }),
    }),
  ),
);

async function onFormSubmit({ valid, values }: FormSubmitEvent) {
  if (valid && authStore?.user) {
    await store.registerMovieReview({
      userId: authStore.user.id,
      movieId: props.movie.id,
      review: values.review,
      spoilers: state.hasSpoilers,
    });

    await movieStore.loadMovieComments(props.movie.id);
    state.isDrawerVisible = false;
  }
}

function handleAuth() {
  if (!authStore.user) {
    state.isCommentModalVisible = true;
  } else {
    state.isDrawerVisible = true;
  }
}
</script>

<style scoped lang="scss">
.actions {
  display: flex;
  gap: 16px;
  padding: 20px;

  &__comment {
    display: flex;
    align-items: center;
    gap: 8px;
  }

  &__switch {
    display: flex;
    align-items: center;
    gap: 8px;
  }

  &__footer {
    display: flex;
    justify-content: space-between;
    gap: 16px;
  }
}
</style>
