// Usage
const apiKey = '50c68da9ee6d1b67a306e8f45061b676'; // Replace with your Flickr API Key
// const albumId = '72177720313082467'; // Replace with the specific album ID

export const ALBUM_IDS = {
    landscapes: '72177720313513857',
    portraits: '72177720313518986',
}

export function getPhotosFromAlbum(albumId) {
    const url = `https://api.flickr.com/services/rest/?method=flickr.photosets.getPhotos&api_key=${apiKey}&photoset_id=${albumId}&format=json&nojsoncallback=1`;

    return fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data.stat === "ok") {
                console.log("Photos:", data.photoset.photo);
                return data.photoset.photo;
            } else {
                console.error("Error fetching photos:", data.message);
            }
        })
        .catch(error => console.error("Error in API request:", error));
}

export function constructImageUrl(photo) {
    // Constructing the URL based on Flickr's URL format
    return `https://live.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}_c.jpg`;
}


// // Replace 'YOUR_FLICKR_API_KEY' with your actual Flickr API key
// const apiKey = '50c68da9ee6d1b67a306e8f45061b676';
//
// // Set the number of photos you want to fetch (optional)
// const photoCount = 50;
//
// // Function to make API request and fetch photos
// export async function fetchPhotos() {
//     try {
//         const params = {
//             method: 'flickr.photosets.getPhotos',
//             api_key: apiKey,
//             user_id: '145541986@N03',
//             photoset_id: '72177720313082467',
//             format: 'json',
//             // nojsoncallback: 1,
//             // per_page: photoCount,
//             // min_upload_date: 1690862400,
//         };
//         let urlStr = '';
//         Object.keys(params).forEach(key => {
//             urlStr += `${key}=${params[key]}&`
//         });
//         const url = `https://api.flickr.com/services/rest/?${urlStr}`;
//
//         fetch(url).then(response => {
//             if (!response.ok) {
//                 return response.json()
//                     .catch(() => {
//                         // Couldn't parse the JSON
//                         throw new Error(response.status);
//                     })
//                     .then(({message}) => {
//                         // Got valid JSON with error response, use it
//                         throw new Error(message || response.status);
//                     });
//             }
//             // Successful response, parse the JSON and return the data
//             return response.json();
//         });
//     } catch (error) {
//         console.log('Error fetching photos:', error);
//     }
// }
