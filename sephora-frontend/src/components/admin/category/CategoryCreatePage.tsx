import {Button, TextField, Typography} from "@mui/material";
import {useNavigate} from "react-router-dom";
import {useFormik} from "formik";
import {ChangeEvent} from "react";
import defaultImage from "../../../assets/default.jpg";
import http_common from "../../../http_common.ts";
import onChangeFileHandler from "./fileHnd.ts";
import CreateCategoryDto from "../../../models/category/CreateCategoryDto.ts";

// TODO: Add yup validation
const CategoryCreatePage = () => {
    const navigate = useNavigate();

    const init: CreateCategoryDto = {
        nameEn: "",
        nameUa: "",
        picture: new File([""], "filename"),
        descriptionEn: "",
        descriptionUa: "",
    };

    const onFormikSubmit = async (values: CreateCategoryDto) => {
        try {
            const formData = new FormData();
            formData.append("nameEn", values.nameEn);
            formData.append("nameUa", values.nameUa);
            if (values.picture) {
                formData.append("picture", values.picture);
            }
            formData.append("descriptionEn", values.descriptionEn);
            formData.append("descriptionUa", values.descriptionUa);

            await http_common.post("/category", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            navigate("..");
        } catch (e) {
            console.error("Server error:", e);
        }
    };

    const formik = useFormik({
        initialValues: init,
        onSubmit: onFormikSubmit,
    });
    const {values, handleChange, handleSubmit, setFieldValue} = formik;
    const fileHnd = (e: ChangeEvent<HTMLInputElement>) => onChangeFileHandler(e, setFieldValue);

    return (
        <>
            <Typography variant="h1" align="center" gutterBottom>
                Додати категорію
            </Typography>
            <div className="container">
                <form className="col-md-8 offset-md-2" onSubmit={handleSubmit}>
                    <TextField
                        label="Назва англійською"
                        fullWidth
                        value={values.nameEn}
                        onChange={handleChange}
                        name="nameEn"
                        margin="normal"
                        variant="outlined"
                    />

                    <TextField
                        label="Назва українською"
                        fullWidth
                        value={values.nameUa}
                        onChange={handleChange}
                        name="nameUa"
                        margin="normal"
                        variant="outlined"
                    />

                    <div className="mb-3">
                        <label htmlFor="picture" className="form-label">
                            <img src={
                                values.picture === null
                                    ? defaultImage
                                    : URL.createObjectURL(values.picture)
                            }
                                 alt="фото"
                                 width={200}
                                 style={{cursor: "pointer"}}
                            />
                        </label>
                        <input
                            type="file"
                            className="form-control d-none"
                            id="picture"
                            onChange={fileHnd}
                            name="picture"
                        />
                    </div>

                    <TextField
                        label="Опис англійською"
                        fullWidth
                        value={values.descriptionEn}
                        onChange={handleChange}
                        name="descriptionEn"
                        margin="normal"
                        variant="outlined"
                    />

                    <TextField
                        label="Опис українською"
                        fullWidth
                        value={values.descriptionUa}
                        onChange={handleChange}
                        name="descriptionUa"
                        margin="normal"
                        variant="outlined"
                    />

                    <Button type="submit" variant="contained" color="primary">
                        Додати
                    </Button>
                </form>
            </div>
        </>
    );
};

export default CategoryCreatePage;
