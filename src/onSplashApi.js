
import { Messages } from "./messages"

const axios = require('axios').default;

axios.defaults.baseURL = 'https://pixabay.com/api/';

export async function getImages(q, page, lodeMoreBtnRef, submit) {
    const searchParams = new URLSearchParams({
        key: '29665517-503a19893477763dfc63054fb',
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: 'true',
        per_page: '40',
        page: `${page}`,
        q: `${q}`,
    });
    lodeMoreBtnRef.classList.add('hide')
    const response = await axios.get(`?${searchParams}`);
    const messages = new Messages(response.data.totalHits);
    const totalPages = Math.ceil(response.data.totalHits / parseInt(searchParams.get('per_page')))

    if (page > totalPages) {
        messages.onEnd();
    } else if (response.data.hits.length == 0) {
        messages.onFail();
        console.log(totalPages)
    } else {
        lodeMoreBtnRef.classList.remove('is-hidden');
        if (submit) {
            messages.onSuccess();
        }
    }
    return response.data;

}