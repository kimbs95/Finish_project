let URL = 'http://localhost:5000/searchKeyword';


// 웹
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
    fetch(`https://dapi.kakao.com/v2/search/vclip?query=${queryValue}`, reqObject)
        .then(res => res.json())
        .then(result => {
            // console.log(result.documents);
            nav(result.documents);
        })
}

// 비디오
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
            console.log(result.status);
            // nav(result.documents);
        })

}

// 서버에서 통합검색 데이터 받아 렌더링
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
            <a href="#">
                <div class="title">${title}</div>
                <div class="contents">${contents}</div>
                <div class="url">도메인주소:${url}</div>
                <div class="datetime">작성일:${datetime}</div>
            </a>
        </div>
        `;

        const $ul = document.querySelector('#searchUl');
        $ul.innerHTML = tag;
    }

}

// nav 만드는중
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
            <a href="#">
                <div class="title">${title}</div>
                <div class="url">도메인주소:${url}</div>
                <div class="thumbnail">미리보기:${thumbnail}</div>
                <div class="play_time">재생시간:${play_time}</div>
                <div class="datetime">작성일:${datetime}</div>
                <div class="author">업로더:${author}</div>
            </a>
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

    document.querySelector('.naviUl').addEventListener('click', e => {
        if (!e.target.matches('.naviUl .video a')) return;
        // console.log(e.target);
        // nav(usp.nav('query'));

    })
})();