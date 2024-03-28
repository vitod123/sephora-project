import http_common from "../../../http_common.ts";

const changeFavStatus = async (id: number, isAuthed: boolean) => {
    if (isAuthed) {
        await http_common.put(`favorites/${id}`);
    } else {
        const items = JSON.parse(localStorage.favorites ?? '[]');

        if (items.includes(id)) items.splice(items.indexOf(id), 1);
        else items.push(id);

        localStorage.favorites = JSON.stringify(items);
    }
}

export default changeFavStatus;
