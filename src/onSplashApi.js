import { Messages } from "./messages"

const axios = require('axios').default;
axios.defaults.baseURL = 'https://pixabay.com/api/';

export async function getImages(q, page, lodeMoreBtnRef, submit) {
    const searchParams = new URLSearchParams({
        key: '29705426-bfa25e249bc10439228dcaa9b',
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: 'true',
        per_page: '40',
        page: `${page}`,
        q: `${q}`,
    });
 
    const response = await axios.get(`?${searchParams}`);
    const messages = new Messages(response.data.totalHits);
    console.log(response.data.totalHits );

    const totalPages = Math.ceil(response.data.totalHits / parseInt(searchParams.get('per_page')))
  
console.log( parseInt(searchParams.get('per_page')))
    if (totalPages <= page) {
        
        messages.onEnd();
         lodeMoreBtnRef.classList.add('is-hidden')
       
    } else if (response.data.hits.length === 0) {
        messages.onFail();
        console.log(totalPages)
    }

    else {
        lodeMoreBtnRef.classList.remove('is-hidden');
        if (submit) {
            messages.onSuccess();
        }
    }
    return response.data;

}









// import { Messages } from "./messages"

// const axios = require('axios').default;
// axios.defaults.baseURL = 'https://pixabay.com/api/';

// export async function getImages(q, page, lodeMoreBtnRef, submit) {
//     const searchParams = new URLSearchParams({
//         key: '29705426-bfa25e249bc10439228dcaa9b',
//         image_type: 'photo',
//         orientation: 'horizontal',
//         safesearch: 'true',
//         per_page: '40',
//         page: `${page}`,
//         q: `${q}`,
//     });
 
//     const response = await axios.get(`?${searchParams}`);
//     const messages = new Messages(response.data.totalHits);

//     const totalPages = Math.ceil(response.data.totalHits / parseInt(searchParams.get('per_page')))
  

//     if (totalPages <= page) {
        
//         messages.onEnd();
//          lodeMoreBtnRef.classList.add('is-hidden')
       
//     } else if (response.data.hits.length === 0) {
//         messages.onFail();
//         console.log(totalPages)
//     }

//     else {
//         lodeMoreBtnRef.classList.remove('is-hidden');
//         if (submit) {
//             messages.onSuccess();
//         }
//     }
//     return response.data;

// }
