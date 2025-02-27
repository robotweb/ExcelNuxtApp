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

const props = defineProps({
  company: String,
  order: String
});

// Handle File Upload
const server = {
  process: async (fieldName, file, metadata, load, error, progress, abort) => {
    try {
      const formData = new FormData();
      console.log(fieldName, file)
      formData.append(fieldName, file);

      const response = await useApi().post(`/order/${props.company}/proof/${props.order}`,formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                  });
      console.log(response)
      if (response) {
        load(response.fileUrl); // Notify FilePond that the upload was successful

      } else {
        error("Upload failed");
      }
    } catch (err) {
      console.error("Upload error:", err);
      error("Upload error");
    }
  },
  revert: (uniqueFileId, load) => {
    // Handle file removal (if needed)
    load();
  },
};

async function handleProcessFile(error, file) {
    // After file processing (upload), if there was no error
    if (!error) {
      console.log(`File uploaded: ${file.filename}`);
      
      // Remove file from the FilePond dialog

      // Alternatively, if you want to remove the file by index, use:
      // this.$refs.pond.removeFile(file.index); 
    }
}

async function loadPreviousFiles() {
    console.log("file pond initiated")
    const response = await useApi().get(`/order/${props.company}/proof/${props.order}`)
    const files = response.proof

    console.log(files);

    // Format the files array to match FilePond's required format
    myFiles.value = files.map(file => ({
      source: file.download_url,  // Use the URL of the file
      options: {
        type: 'local',  // Local file type for previously uploaded files
        file: {
          name: file.proof_file_name,  // File name
          size: parseInt(file.proof_file_size),  // File size
          type: file.proof_file_type,  // File MIME type
        },
        download: file.download_url
      },
    }));

    console.log(myFiles);

}
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
      :server="server" 
      @init="loadPreviousFiles"
      @processfile="handleProcessFile"
    />
  </div>
</template>