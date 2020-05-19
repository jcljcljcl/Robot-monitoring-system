import {request} from "./request";
export function getChujueData() {
    return request({
        url:'/chujue'
    })
}