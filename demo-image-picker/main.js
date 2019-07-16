var inputImage = document.getElementById('inputImage')
inputImage.onchange = function(){
    let formData = new FormData()
    formData.append(upload.inputName, e.target.files[0])
    this.willUpload(formData)
    this.upload(formData)
}