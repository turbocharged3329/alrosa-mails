export const fileLoader = {
    methods: {
        uploadFiles() {
          // Using the default uploader. You may use another uploader instead.
          this.$refs.vueFileAgent.upload(
            this.uploadUrl,
            this.uploadHeaders,
            this.fileRecordsForUpload
          );
          this.fileRecordsForUpload = [];
        },
        deleteUploadedFile(fileRecord) {
          // Using the default uploader. You may use another uploader instead.
          this.$refs.vueFileAgent.deleteUpload(
            this.uploadUrl,
            this.uploadHeaders,
            fileRecord
          );
        },
        filesSelected(fileRecordsNewlySelected) {
          let validFileRecords = fileRecordsNewlySelected.filter(
            (fileRecord) => !fileRecord.error
          );
          this.fileRecordsForUpload =
            this.fileRecordsForUpload.concat(validFileRecords);
    
          let reader = new FileReader();
            reader.readAsDataURL(this.fileRecords[0].file);
            reader.onload = () => {
            this.$emit('image', reader.result)
          };
        },
        onBeforeDelete(fileRecord) {
          let i = this.fileRecordsForUpload.indexOf(fileRecord);
          if (i !== -1) {
            // queued file, not yet uploaded. Just remove from the arrays
            this.fileRecordsForUpload.splice(i, 1);
            let k = this.fileRecords.indexOf(fileRecord);
            if (k !== -1) this.fileRecords.splice(k, 1);
          } else {
            if (confirm("Are you sure you want to delete?")) {
              this.$refs.vueFileAgent.deleteFileRecord(fileRecord); // will trigger 'delete' event
            }
          }

          this.helpText = null;
        },
        fileDeleted(fileRecord) {
          let i = this.fileRecordsForUpload.indexOf(fileRecord);
          if (i !== -1) {
            this.fileRecordsForUpload.splice(i, 1);
          } else {
            this.deleteUploadedFile(fileRecord);
          }
        },
      },
}