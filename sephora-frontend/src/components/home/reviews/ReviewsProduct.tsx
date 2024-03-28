import { Avatar, Button, Container, Pagination, Stack, Typography } from "@mui/material";
import "./reviews.scss";
import StarIcon from "@mui/icons-material/Star";
import { Formik, Form, Field } from 'formik';
import { TextField } from "@mui/material";
import Rating from '@mui/material/Rating';
import { useTranslation } from "react-i18next";
import React, { useState } from "react";
import RatingDto from "../../../models/rating/RatingDto.ts";
import textFieldStyle from '../../../common/textFieldStyle.ts';

const Reviews: React.FC<{ title: string, reviews: RatingDto[] }> = ({ title, reviews }) => {
    const { t } = useTranslation();
    const [currentPage, setCurrentPage] = useState(1);

    const handlePageChange = (_event: React.ChangeEvent<unknown>, page: number) => {
        setCurrentPage(page);
    };

    const itemsPerPage = 2; // Кількість елементів на сторінці
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentReviews = reviews.slice(startIndex, endIndex);

    return (
        <Container className="reviews" style={{ maxWidth: "90%" }} sx={{ marginX: '50%' }}>
            <Typography className="title">{title}</Typography>

            <Container sx={{ py: 8 }}>
                <Formik
                    initialValues={{
                        name: '',
                        rate: null,
                        comment: '',
                    }}
                    onSubmit={(_values, { resetForm }) => {
                        resetForm();
                    }}
                >
                    {({ values, handleChange }) => (
                        <Form>
                            <Stack spacing={2}>
                                <Stack direction="row" spacing={4} alignItems="center">
                                    <Field
                                        as={TextField}
                                        fullWidth
                                        sx={{ ...textFieldStyle }}
                                        placeholder={t('details.reviews.name')}
                                        name="name"
                                        value={values.name}
                                        onChange={handleChange}
                                    />
                                    <Field
                                        as={Rating}
                                        name="rate"
                                        precision={0.5}
                                        value={values.rate}
                                        onChange={handleChange}
                                        icon={<StarIcon style={{ color: '#000000', fontSize: '29px' }} />}
                                        emptyIcon={<StarIcon style={{ color: '#9D9D9D', fontSize: '29px' }} />}
                                    />
                                </Stack>
                                <Field
                                    as={TextField}
                                    fullWidth
                                    sx={{ ...textFieldStyle }}
                                    placeholder={t('details.reviews.comment')}
                                    multiline
                                    rows={4}
                                    name="comment"
                                    value={values.comment}
                                    onChange={handleChange}
                                />
                                <Stack alignItems="center">
                                    <Button type="submit" className="addComment">
                                        {t('details.reviews.addComment')}
                                    </Button>
                                </Stack>
                            </Stack>
                        </Form>
                    )}
                </Formik>
                <Stack spacing={5}>
                    {currentReviews.map((review, index) => (
                        <Stack key={index} spacing={3.5}>
                            <Stack justifyContent='space-between' direction="row">
                                <Stack spacing={4} direction="row">
                                    {review.userPfp != null ?
                                        <Avatar alt={review.userName} src={review.userPfp} />
                                        : <Avatar sx={{ width: '96px', height: '96px', bgcolor: '#D9D9D9' }}> </Avatar>
                                    }
                                    <Stack spacing={1} justifyContent='center'>
                                        <div className="userName">{review.userName}</div>
                                        <Rating
                                            name="hover-feedback"
                                            value={review.rate}
                                            precision={0.5}
                                            readOnly
                                            icon={<StarIcon style={{ color: '#000000', fontSize: '29px' }} />}
                                            emptyIcon={<StarIcon style={{ color: '#9D9D9D', fontSize: '29px' }} fontSize="inherit" />}
                                        />
                                    </Stack>
                                </Stack>
                                <Typography className="review" style={{ display: 'flex', alignItems: 'center' }}>
                                    {review.updatedAt.toLocaleString()}
                                </Typography>
                            </Stack>
                            <div className="review">
                                {review.comment}
                            </div>
                        </Stack>
                    ))}
                </Stack>
                <Stack sx={{ margin: '40px', alignItems: 'center' }}>
                    <Pagination
                        sx={{ display: 'flex' }}
                        count={Math.ceil(reviews.length / itemsPerPage)}
                        page={currentPage}
                        onChange={handlePageChange}
                    />
                </Stack>
            </Container>
        </Container>
    );
}

export default Reviews;
