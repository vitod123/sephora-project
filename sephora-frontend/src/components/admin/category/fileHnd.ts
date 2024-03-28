import {ChangeEvent} from "react";

const onChangeFileHandler = (e: ChangeEvent<HTMLInputElement>, setter: (field: string, file: File) => void) => {
    const files = e.target.files;
    if (files) {
        const file = files[0];
        if (file) {
            const allowedTypes = ["image/jpeg", "image/jpg", "image/png", "image/gif"];
            if (!allowedTypes.includes(file.type)) {
                alert("Не допустимий тип файлу");
                return;
            }
            setter(e.target.name, file);
        }
    }
};

export default onChangeFileHandler;