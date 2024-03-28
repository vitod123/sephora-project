import {SetStateAction, useEffect, useState} from "react";
import {Link} from "react-router-dom";
import {
    Avatar,
    Button,
    IconButton,
    MenuItem,
    Popover,
    Stack,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
} from "@mui/material";
import http_common from "../../../http_common.ts";
import CategoryDto from "../../../models/category/CategoryDto.ts";
import i18n from "i18next";
import EditIcon from "@mui/icons-material/Edit";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import DeleteIcon from "@mui/icons-material/Delete";

const CategoryListPage = () => {
    const [list, setList] = useState<CategoryDto[]>([]);

    const [open, setOpen] = useState(null);

    const handleOpenMenu = (event: SetStateAction<any>) => {
        setOpen(event.currentTarget);
    };

    const handleCloseMenu = () => {
        setOpen(null);
    };

    useEffect(() => {
        http_common.get<CategoryDto[]>("/Category/all")
            .then(resp => setList(resp.data));
    }, []);

    const onClickDelete = async (id: number) => {
        try {
            await http_common.delete(`/category/${id}`);
            setList(list.filter((x) => x.id !== id));
        } catch {
            console.error("Помилка видалення");
        }
    };

    return (
        <>
            <div className="container">
                <Typography variant="h1" align="center" gutterBottom>
                    Список категорій
                </Typography>
                <Link to="create">
                    <Button variant="contained" color="success">
                        Додати
                    </Button>
                </Link>
                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>#</TableCell>
                                <TableCell>Назва</TableCell>
                                <TableCell>Фото</TableCell>
                                <TableCell>Опис</TableCell>
                                <TableCell>Фото</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {Array.isArray(list) &&
                                list.map((c) => (
                                    <TableRow key={c.id}>
                                        <TableCell>{c.id}</TableCell>
                                        <TableCell>
                                            {i18n.language === "en" ? c.nameEn : c.nameUa}
                                        </TableCell>
                                        <TableCell component="th" scope="row" padding="none">
                                            <Stack direction="row" alignItems="center" spacing={2}>
                                                <Avatar
                                                    alt={c.nameEn + " picture"}
                                                    src={c.picture.url}
                                                />
                                                <Typography variant="subtitle2" noWrap>
                                                    {c.nameEn + " picture"}
                                                </Typography>
                                            </Stack>
                                        </TableCell>
                                        <TableCell>
                                            {i18n.language === "en"
                                                ? c.descriptionEn
                                                : c.descriptionUa}
                                        </TableCell>

                                        <TableCell align="right">
                                            <IconButton onClick={handleOpenMenu}>
                                                <MoreVertIcon/>
                                            </IconButton>
                                        </TableCell>
                                        <Popover
                                            open={!!open}
                                            anchorEl={open}
                                            onClose={handleCloseMenu}
                                            anchorOrigin={{vertical: "top", horizontal: "left"}}
                                            transformOrigin={{vertical: "top", horizontal: "right"}}
                                            slotProps={{
                                                paper: {
                                                    sx: {width: 140},
                                                },
                                            }}>
                                            <MenuItem href={`edit/${c.id}`} onClick={handleCloseMenu}>

                                                <EditIcon/>
                                                Edit

                                            </MenuItem>

                                            <MenuItem
                                                onClick={() => {
                                                    handleCloseMenu();
                                                    onClickDelete(c.id)
                                                        .catch(console.error);
                                                }}
                                                sx={{color: "error.main"}}>
                                                <DeleteIcon/>
                                                Delete
                                            </MenuItem>
                                        </Popover>
                                    </TableRow>
                                ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        </>
    );
};

export default CategoryListPage;
