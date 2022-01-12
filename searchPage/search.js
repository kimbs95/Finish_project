let URL = 'http://localhost:5000/searchKeyword';
//자바스크립트 비동기통신 ajax - fetch
const getQueryInURL = queryValue => {

    const reqObject = {
        method: "GET",
        headers: {
            'content-type': 'application/json',
            Authorization: `KakaoAK 71f78f513d7f543d37d983c84b74d34f`
        }
    }
    fetch(`https://dapi.kakao.com/v2/search/web?query=${queryValue}&size=20&page=1`, reqObject)
        .then(res => res.json())
        .then(result => {
            // console.log(result);
            get(result.documents);

        })
}

function get(res) {
    let tag = '';
    for (let i of res) {

        const {
            contents,
            datetime,
            title,
            url
        } = i;

        let delFrontSlash = url.slice(url.indexOf('/') + 2);
        let delBackSlash = delFrontSlash.slice(0, delFrontSlash.indexOf('/'));

        let delT = datetime.slice(0, datetime.indexOf('T'));

        tag += `
        <div class="searching-web">
            <div class="wrapper">
                <a href="${url}">
                    <div class="title">${title}</div>
                </a>
                <div class="contents">${contents}</div>
                <div class="datetime">작성일 ${delT}</div>
                <div class="url">${delBackSlash}</div>
            </div>
        </div>
        `;

        const $ul = document.querySelector('#searchUl');
        $ul.innerHTML = tag;
    }
    // document.querySelector('.wrap .wrapper a.bottomLink').appendChild(document.createElement('a').classList.add('bottomLink'));

    // tag = `
    //     <div>1</div>
    //     <div>2</div>
    //     <div>3</div>
    //     <div>4</div>
    //     <div>5</div>
    //     <div>6</div>
    //     <div>7</div>
    //     <div>8</div>
    //     <div>9</div>
    //     <div>10</div>
    //     `
    // document.querySelector('.wrap .wrapper a.bottomLink').innerHTML = tag;

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

        let delFrontSlash = url.slice(url.indexOf('/') + 2);
        let delBackSlash = delFrontSlash.slice(0, delFrontSlash.indexOf('/'));

        let delT = datetime.slice(0, datetime.indexOf('T'));

        tag += `
        <div class="searching-video clearfix">
            <div class="wrapper">
                <a href="${url}">
                    <div class="title">${title}</div>
                    <div class="img-box">
                        <img src="${thumbnail}" alt="미리보기">
                    </div>
                </a>
                <div class="url">${delBackSlash}</div>
                <div class="datetime">작성일 ${delT}</div>
                <div class="author">업로더:${author}</div>
            </div>
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
            // image_url,
            // collection,
            datetime,
            // display_sitename,
            doc_url,
            thumbnail_url
        } = i;

        let delT = datetime.slice(0, datetime.indexOf('T'));

        // 
        // <div class="datetime">작성일:${delT}</div>
        // <div class="display_sitename">출처:${display_sitename}</div>
        // 
        tag += `
        <div class="searching-img" data-number="${res.indexOf(i)}">
            <div class="wrapper">
                <a href="${doc_url}">
                    <div class="img-box">
                        <img src="${thumbnail_url}">
                    </div>
                </a>
            </div>
        </div>
        `;

        const $ul = document.querySelector('#searchUl');
        $ul.innerHTML = tag;
    }
    let les = res;
    //이미지 검색 결과 클릭시
    document.querySelector('#searchUl').onclick = e => {
        e.preventDefault();
        let $wrapper = document.querySelector('.wrap > .wrapper');
        let $wrapperInImg = document.querySelector('.wrap > .wrapper .aboutImg .img-box img');
        let eParentX4 = res[+e.target.parentElement.parentElement.parentElement.parentElement.dataset.number];

        if (!e.target.matches('#searchUl *')) return;
        if (![...$wrapper.children].includes(document.querySelector('.aboutImg'))) {
            makeAboutImg(e, res);
        } else {
            if ($wrapperInImg.getAttribute('src') === eParentX4.image_url) {
                $wrapper.removeChild(document.querySelector('.wrap > .wrapper .aboutImg'));
                document.querySelector('#searchUl').classList.toggle('onclickImgW50p');
            } else {
                $wrapperInImg.setAttribute('src', eParentX4.image_url);
            }
        }
    };

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
        <div class="searching-blog">
            <div class="wrapper">
                <a href="${url}">
                    <div class="title">${title}</div>
                    <img src="${thumbnail}" alt="미리보기">
                </a>
                <div class="contents">${contents}</div>
                <div class="blogname">블로그명:${blogname}</div>
                <div class="datetime">작성일:${datetime}</div>
            </div>
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
        <div class="searching-cafe">
            <div class="wrapper">
                <a href="${url}">
                <div class="title">${title}</div>
                <img src="${thumbnail}" alt="미리보기">
                </a>
                <div class="contents">${contents}</div>
                <div class="cafename">카페명:${cafename}</div>
                <div class="datetime">작성일:${datetime}</div>
            </div>
        </div>
        `;

        const $ul = document.querySelector('#searchUl');
        $ul.innerHTML = tag;
    }

}

const makeAboutImg = (e, res) => {
    //변수 선언부
    let $searchUl = document.querySelector('#searchUl');
    let aboutImg = document.createElement('div');
    let eParentX4 = res[+e.target.parentElement.parentElement.parentElement.parentElement.dataset.number];

    $searchUl.classList.toggle('onclickImgW50p');
    aboutImg.classList.add('aboutImg');
    document.querySelector('.wrap > .wrapper').appendChild(aboutImg);

    tag = `
        <a class="url" href="${eParentX4.doc_url}">
            <div class="img-box">
                <img src="${eParentX4.image_url}" onerror="this.src='https://via.placeholder.com/500/202125/d0d0d0?text=loading+failed+Click+me!'" alt="클릭이미지상세">
            </div>
        </a>
    `;

    document.querySelector('.wrap > .wrapper .aboutImg').innerHTML = tag;


    // let aboutImg = document.createElement('div');
    // aboutImg.classList.add('aboutImg');
    // let sssssss = document.createElement('img');
    // sssssss.setAttribute('src', `${res[+e.target.parentElement.parentElement.parentElement.parentElement.dataset.number].image_url}`);
    // let eTargetImgbox = document.createElement('div');
    // eTargetImgbox.classList.add('img-box');

    // document.querySelector('.wrap > .wrapper').appendChild(aboutImg);
    // document.querySelector('.wrap > .wrapper .aboutImg').appendChild(eTargetLink);
    // document.querySelector('.wrap > .wrapper .aboutImg .url').appendChild(eTargetImgbox);
    // document.querySelector('.wrap > .wrapper .aboutImg .url .img-box').appendChild(sssssss);


    // let eTargetLink = document.createElement('a');
    // eTargetLink.classList.add('url');
    // eTargetLink.setAttribute('href', `${res[+e.target.parentElement.parentElement.parentElement.parentElement.dataset.number].doc_url}`);
}

// 도서 클릭 만드는중
// function book(res) {

//     let tag = '';
//     for (let i of res) {

//         const {
//             title,
//             contents,
//             datetime,
//             url,
//             authors,
//             publisher,
//             price,
//             sale_price,
//             thumbnail,
//             status
//         } = i;

//         tag += `
//         <div class="serching">
//             <a href="${url}">
//                 <img src="${thumbnail}" alt="미리보기">
//                 <div class="title">${title}</div>
//                 <div class="price">정가:${price}</div>    
//                 <div class="sale_price">할인가:${sale_price}</div>    
//             </a>
//             <div class="contents">${contents}</div>
//             <div class="authors">저자:${authors}</div>    
//             <div class="publisher">출판사:${publisher}</div>    
//             <div class="status">판매상태:${status}</div>    
//             <div class="datetime">작성일:${datetime}</div>
//         </div>
//         `;

//         const $ul = document.querySelector('#searchUl');
//         $ul.innerHTML = tag;
//     }

// }

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
            Authorization: `KakaoAK 71f78f513d7f543d37d983c84b74d34f`,
            referer: "search.naver.com"
        }
    }
    fetch(`https://dapi.kakao.com/v2/search/image?query=${queryValue}&`, reqObject)
        .then(res => res.json())
        .then(result => {
            console.log(result);
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
            console.log(result);
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
            console.log(result);
            cafe(result.documents);
        })

}
// 도서 조회
const bookURL = queryValue => {
    const reqObject = {
        method: "GET",
        headers: {
            'content-type': 'application/json',
            Authorization: `KakaoAK 71f78f513d7f543d37d983c84b74d34f`
        }
    }
    fetch(`https://dapi.kakao.com/v3/search/book?query=${queryValue}`, reqObject)
        .then(res => res.json())
        .then(result => {
            console.log(result);
            book(result.documents);
        })
}

const imgDeleteW100p = (e) => {
    if ([...document.querySelector('.wrap > .wrapper').children].includes(document.querySelector('.wrap > .wrapper .aboutImg'))) {
        document.querySelector('.wrap > .wrapper').removeChild(document.querySelector('.wrap > .wrapper .aboutImg'));
        document.querySelector('#searchUl').classList.remove('onclickImgW50p');
    }
}

(() => {

    const usp = new URLSearchParams(location.search);
    console.log('쿼리:', usp.get('query'));
    document.querySelector('.wrap header form input').value = usp.get('query');

    if (![...document.querySelector('#searchUl').children].includes(document.querySelector('.searching-web'))) {
        getQueryInURL(usp.get('query'));
    }

    // 통합검색
    document.querySelector('.naviUl').addEventListener('click', e => {
        if (!e.target.matches('.naviUl .total-search')) return;
        e.preventDefault();
        getQueryInURL(usp.get('query'));
        imgDeleteW100p(e);

    })
    // 비디오 
    document.querySelector('.naviUl').addEventListener('click', e => {
        if (!e.target.matches('.naviUl .video')) return;
        e.preventDefault();
        navURL(usp.get('query'));
        imgDeleteW100p(e);

    })
    // 이미지
    document.querySelector('.naviUl').onclick = e => {
        if (!e.target.matches('.naviUl .img ')) return;
        e.preventDefault();
        imgURL(usp.get('query'));
        imgDeleteW100p(e);
    };

    // 블로그
    document.querySelector('.naviUl').addEventListener('click', e => {
        if (!e.target.matches('.naviUl .blog')) return;
        e.preventDefault();
        blogURL(usp.get('query'));
        imgDeleteW100p(e);
    })

    // 카페
    document.querySelector('.naviUl').addEventListener('click', e => {
        if (!e.target.matches('.naviUl .cafe')) return;
        e.preventDefault();
        cafeURL(usp.get('query'));
        imgDeleteW100p(e);
    })
    // 도서
    document.querySelector('.naviUl').addEventListener('click', e => {
        if (!e.target.matches('.naviUl .book')) return;
        e.preventDefault();
        bookURL(usp.get('query'));
        imgDeleteW100p(e);
    })
})();