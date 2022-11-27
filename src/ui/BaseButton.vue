<template>
    <button v-if="!link" :class="mode">
        <slot></slot>
    </button>
    <router-link v-else :to="to" :class="mode">
        <slot></slot>
    </router-link>
</template>

<script setup>
// eslint-disable-next-line
const props = defineProps({
        mode: {
            type: String,
            required: false,
            default: null
        },
        link: {
            type: Boolean,
            required: false,
            default: false
        },
        to: {
            type: String,
            required: false,
            default: '/'
        }
    })
</script>

<style scoped>
button,
a {
  font-family: 'Nerko One', cursive;
  text-decoration: none;
  padding: 0.75rem 1.5rem;
  font: inherit;
  background-color: #22A39F;
  border: 1px solid #22A39F;
  color: white;
  cursor: pointer;
  border-radius: 10px;
  margin-right: 0.5rem;
  display: inline-block;
  transition: all .2s ease-out;
  font-size: 1.5rem;
}

a:hover,
a:active,
button:hover,
button:active {
  background-color: #1b827f;
  border-color: #1b827f;
}

.flat {
  background-color: transparent;
  color: #166967;
  border: none;
}

.outline {
  background-color: transparent;
  border-color: #1b827f;
  color: #1b827f;
}

.flat:hover,
.flat:active,
.outline:hover,
.outline:active {
  background-color: #F3EFE0;
}
</style>