export const scrollToBottom = (container: HTMLElement | null) => {
    if (!container) {
        return;
    }
    container.scrollTop = container.scrollHeight - container.clientHeight;
};

export function fetchFunc (url:string,method:string,body:string) {
    return fetch(url, {
        method: method,
        body: body,
    })
}

export function debounce(fn, ms) {
    let timeout
    return function() {
        const fnCall = () => { // @ts-ignore
            fn.apply(this,arguments) }
        clearTimeout(timeout)
        timeout = setTimeout(fnCall, ms)
    };
}
