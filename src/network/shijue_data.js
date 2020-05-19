import {request} from "./request";
export function getShijueData() {
    return request({
        url:'/shijue'
    })
}