

function buildUrl({ url, data = null }) {
    const prefix = "/api";
    let rurl = prefix + url;
    if (data && Object.keys(data).length > 0) {
        const { page, offset, where, order } = data;
        const params = ["page=" + page, "offset=" + offset, "order=" + JSON.stringify(order), "where=" + JSON.stringify(where)];
        rurl = prefix + url + "?" + params.join("&");
    }
    return rurl;
}
function buildOptions({ method, data }) {
    const opts = {
        method, // *GET, POST, PUT, DELETE, etc.
        mode: "cors", // no-cors, *cors, same-origin
        cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
        credentials: "same-origin", // include, *same-origin, omit
        headers: {
            "Content-Type": "application/json",
            // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        //redirect: "follow", // manual, *follow, error
        referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url

    }

    if (data && method === "POST") {
        opts.body = JSON.stringify(data);
    }
    return opts;
}
const doGet = async ({ url, data }) => {
    try {
        const response = await fetch(buildUrl({ url, data }), buildOptions({ method: "GET" }));
        const result = await response.json();
        return result;
    } catch (error) {
        console.error(error);
    }


}
const doPost = async ({ url, data }) => {
    try {
        const response = await fetch(buildUrl({ url }), buildOptions({ method: "POST", data }));
        const result = await response.json();
        return result;
    } catch (error) {
        console.error(error);
    }
}
export { doGet, doPost }