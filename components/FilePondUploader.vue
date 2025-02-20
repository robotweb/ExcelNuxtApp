<script setup>
import { ref, onMounted } from "vue";
import vueFilePond from "vue-filepond";

// Import FilePond core and plugin styles
import "filepond/dist/filepond.min.css";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.min.css";

// Import FilePond plugins
import FilePondPluginFileValidateType from "filepond-plugin-file-validate-type";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";

// Create the FilePond component with plugins
const FilePond = vueFilePond(FilePondPluginFileValidateType, FilePondPluginImagePreview);

// Reactive file list
const myFiles = ref([]);

onMounted(() => {
  console.log("FilePond component mounted");
});
</script>

<template>
  <div>
    <FilePond
      name="file"
      label-idle="Drop files here..."
      allow-multiple
      accepted-file-types="image/jpeg, image/png"
      :files="myFiles"
      :credits="false"
      server="/api" 
      @init="() => console.log('FilePond initialized')"
    />
  </div>
</template>