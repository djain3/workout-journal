interface saveFileProp {
    url: string,
    file: Blob,
    name: string
}
export default async function saveFile({url, file, name}: saveFileProp) {
    return new Promise(function (resolve, reject) {
        const xhr = new XMLHttpRequest();
        xhr.open('POST', 'http://localhost:8080'+url, true);
        xhr.onload = resolve;
        xhr.onerror = reject;
        const formData = new FormData();
        formData.append(name, file);
        xhr.send(formData);
    });
};