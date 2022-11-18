export const scrollToBottom = (container: HTMLElement | null) => {
    if (!container) {
        return;
    }
    container.scrollTop = container.scrollHeight - container.clientHeight;
};

export function fetchFunc (url:string,method:string,body:string) {
    fetch(url, {
        method: method,
        body: body,
    })
        .then(res => {
            if (!res.ok) throw Error(res.statusText);
            return res.json();
        })
        .then(data => console.log(data))
        .catch(error => console.log(error));
}
