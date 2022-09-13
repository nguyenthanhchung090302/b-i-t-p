// Xây dựng một Auto Suggestion Box hoạt động như bên dưới:
//  Mỗi lần user gõ vào thanh tìm kiếm, một list danh sách gợi ý tìm kiếm liên quan sẽ hiện ở dưới
//  Khi user click vào mỗi item, một tab mới sẽ hiện ra với link mới với thông tin item đã click vào

let userInput = document.getElementById('userInput');
// console.log(userInput);
let divData = document.getElementById('divData');
// console.log(divData);


//Render url
userInput.addEventListener("input", (text) => getUrl(text.target.value));

function getUrl(key) {
    let resultUrl = `https://en.wikipedia.org/w/api.php?origin=*&action=opensearch&limit=10&format=json&search=${key}`;

    // return resultUrl;
    let proSeach = new Promise((resolve, reject) => {
        getData(resultUrl, (errSeach, resSeach) => {
            if (errSeach) {
                reject(errSeach)
            } else {
                resolve(resSeach);
            }
        })
    })
    // proSeach.then((resSeach) => console.log(resSeach[1][1])).catch((errSeach) => console.log(errSeach));
    proSeach.then((resSeach) => {
        let resultThumb = `https://en.wikipedia.org/w/api.php?origin=*&action=query&prop=pageprops|pageimages&format=json&titles=${resSeach[0]}`;
        let proThumb = new Promise((resolve, reject) => {
            getData(resultThumb, (errThumb, resThumb) => {
                if (errThumb) {
                    reject(errThumb)
                } else {
                    resolve(resThumb);
                }
            })
        })
        proThumb.then((resultThumb) => {
            let tempArr = resultThumb.query.pages;
            let tempArr2 = Object.values(tempArr);

            let tempKey = "wikibase-shortdesc";
            let linkTitle = tempArr2[0].pageprops[tempKey];

            let linkImg = tempArr2[0].thumbnail.source;

            //--------
            divData.innerHTML = '';
            for (let i = 0; i < 5; i++) {
                divData.innerHTML +=`
            <div class="divData_index" id="onclick">
            <div class="img">
                <img src=${linkImg} alt="">
            </div>
            <div class="contain">
                <h4>${resSeach[1][i]}</h4>
                <p>${linkTitle} </p>
            </div>
            </div>`;
            }
            //------

            // //Event on click
            // let onClick = document.getElementById('onclick');
            // console.log(onClick);

        }).catch((errThumb) => console.log(errThumb));

    })
        .catch((errSeach) => console.log(errSeach));


}


//API get key function:
function getData(url, fn) {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (xhr.readyState == XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                fn(undefined, JSON.parse(xhr.responseText));
            } else {
                fn(new Error(xhr.statusText), undefined);
            }
        }
    };
    xhr.open('GET', url, true);
    xhr.send();
}

























































































































