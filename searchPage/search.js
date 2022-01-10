let URL = 'http://localhost:5000/searchKeyword';


// 검색 조회
const getQueryInURL = queryValue => {

    const reqObject = {
        method: "GET",
        headers: {
            'content-type': 'application/json',
            Authorization: `KakaoAK 71f78f513d7f543d37d983c84b74d34f`
        }
    }
    fetch(`https://dapi.kakao.com/v2/search/web?query=${queryValue}`, reqObject)
        .then(res => res.json())
        .then(result => {
            // console.log(result);
            get(result.documents);

        })
    // 비디오 response
    // fetch(`https://dapi.kakao.com/v2/search/vclip?query=${queryValue}`, reqObject)
    //     .then(res => res.json())
    //     .then(result => {
    //         // console.log(result);
    //         nav(result.documents);
    //     })
}

// 비디오 조회
const navURL = queryValue => {
    const reqObject = {
        method: "GET",
        headers: {
            'content-type': 'application/json',
            Authorization: `KakaoAK 71f78f513d7f543d37d983c84b74d34f`
        }
    }
    fetch(`https://dapi.kakao.com/v2/search/vclip?query=${queryValue}`, reqObject)
        .then(res => res.json())
        .then(result => {
            console.log(result);
            nav(result.documents);
        })

}

// 이미지 조회
const imgURL = queryValue => {
    const reqObject = {
        method: "GET",
        headers: {
            'content-type': 'application/json',
            Authorization: `KakaoAK 71f78f513d7f543d37d983c84b74d34f`
        }
    }
    fetch(`https://dapi.kakao.com/v2/search/image?query=${queryValue}`, reqObject)
        .then(res => res.json())
        .then(result => {
            // console.log(result);
            img(result.documents);
        })

}

// 블로그 조회
const blogURL = queryValue => {
    const reqObject = {
        method: "GET",
        headers: {
            'content-type': 'application/json',
            Authorization: `KakaoAK 71f78f513d7f543d37d983c84b74d34f`
        }
    }
    fetch(`https://dapi.kakao.com/v2/search/blog?query=${queryValue}`, reqObject)
        .then(res => res.json())
        .then(result => {
            // console.log(result);
            blog(result.documents);
        })

}

// 카페 조회
const cafeURL = queryValue => {
    const reqObject = {
        method: "GET",
        headers: {
            'content-type': 'application/json',
            Authorization: `KakaoAK 71f78f513d7f543d37d983c84b74d34f`
        }
    }
    fetch(`https://dapi.kakao.com/v2/search/cafe?query=${queryValue}`, reqObject)
        .then(res => res.json())
        .then(result => {
            // console.log(result);
            cafe(result.documents);
        })

}

// 통합검색 만드는중
function get(res) {
    let tag = '';
    for (let i of res) {

        const {
            contents,
            datetime,
            title,
            url
        } = i;

        tag += `
        <div class="serching">
            <a href="${url}">
                <div class="title">${title}</div>
                <div class="contents">${contents}</div>
            </a>
            <div class="datetime">작성일:${datetime}</div>
        </div>
        `;

        const $ul = document.querySelector('#searchUl');
        $ul.innerHTML = tag;
    }

}

// nav비디오클릭 만드는중
function nav(res) {

    let tag = '';
    for (let i of res) {

        const {
            play_time,
            datetime,
            title,
            url,
            author,
            thumbnail
        } = i;

        tag += `
        <div class="serching">
            <a href="${url}">
                <div class="title">${title}</div>
                <img src="${thumbnail}" alt="미리보기">
            </a>
            <div class="datetime">작성일:${datetime}</div>
            <div class="author">업로더:${author}</div>
        </div>
        `;

        const $ul = document.querySelector('#searchUl');
        $ul.innerHTML = tag;
    }

}

// 이미지 클릭 만드는중
function img(res) {

    
    let tag = '';
    for (let i of res) {

        const {
            collection,
            datetime,
            display_sitename,
            doc_url,
            thumbnail_url
        } = i;

        tag += `
        <div class="searching">
            <a href="${doc_url}">
                <div class="collection">컬렉션:${collection}</div>
                <img class="thumbnail_url" src="${thumbnail_url}">
            </a>
            <div class="datetime">작성일:${datetime}</div>
            <div class="display_sitename">출처:${display_sitename}</div>
        </div>
        `;

        const $ul = document.querySelector('#searchUl');
        $ul.innerHTML = tag;
    }

}

// 블로그 클릭만드는중
function blog(res) {

    let tag = '';
    for (let i of res) {

        const {
            blogname,
            contents,
            datetime,
            title,
            url,
            thumbnail
        } = i;

        tag += `
        <div class="serching">
            <a href="${url}">
                <div class="title">${title}</div>
                <div class="contents">${contents}</div>
                <img src="${thumbnail}" alt="미리보기">
                <div class="blogname">블로그명:${blogname}</div>
            </a>
            <div class="datetime">작성일:${datetime}</div>
                
        </div>
        `;

        const $ul = document.querySelector('#searchUl');
        $ul.innerHTML = tag;
    }

}

// 카페 클릭만드는중
function cafe(res) {

    let tag = '';
    for (let i of res) {

        const {
            cafename,
            contents,
            datetime,
            url,
            title,
            thumbnail
        } = i;

        tag += `
        <div class="serching">
            <a href="${url}">
                <div class="cafename">카페명:${cafename}</div>
                <div class="title">${title}</div>
                <div class="contents">${contents}</div>
                <img src="${thumbnail}" alt="미리보기">
            </a>
            <div class="datetime">작성일:${datetime}</div>
        </div>
        `;

        const $ul = document.querySelector('#searchUl');
        $ul.innerHTML = tag;
    }

}

//===================================== 메인 실행부 ======================================
(() => {

    const usp = new URLSearchParams(location.search);
    console.log('쿼리:', usp.get('query'));
    getQueryInURL(usp.get('query'));

    // 통합검색 
    document.querySelector('.naviUl').addEventListener('click', e => {
        if (!e.target.matches('.naviUl .search')) return;
        // console.log(e.target);
        getQueryInURL(usp.get('query'));

    })

    // 비디오 
    document.querySelector('.naviUl').addEventListener('click', e => {
        if (!e.target.matches('.naviUl .video')) return;
        // console.log(e.target);
        navURL(usp.get('query'));

    })
    // 이미지
    document.querySelector('.naviUl').addEventListener('click', e => {
        if (!e.target.matches('.naviUl .img')) return;
        // console.log(e.target);
        imgURL(usp.get('query'));

    })

    // 블로그
    document.querySelector('.naviUl').addEventListener('click', e => {
        if (!e.target.matches('.naviUl .blog')) return;
        // console.log(e.target);
        blogURL(usp.get('query'));

    })

    // 카페
    document.querySelector('.naviUl').addEventListener('click', e => {
        if (!e.target.matches('.naviUl .cafe')) return;
        // console.log(e.target);
        cafeURL(usp.get('query'));

    })
})();