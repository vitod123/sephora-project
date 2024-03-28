import {Avatar, Container, Grid, Rating, Stack, Typography} from "@mui/material";
import {IMPReview} from "./types";
import "./reviews.scss"
import StarIcon from "@mui/icons-material/Star";


const Reviews: React.FC<{ title: string, reviews: IMPReview[] }>
    = ({title, reviews}) => {
    return (
        <Container className='reviews' style={{maxWidth: "100%"}}>
            <Typography className="title">{title}</Typography>

            <Container sx={{py: 8}} style={{maxWidth: "100%"}}>
                <Grid container spacing={2.5}>
                    {reviews.map((review, index) => (
                        <Grid key={index} item xs={12} sm={6} md={4} spacing={1.5} container={true}>
                            <Stack spacing={3.5}>
                                <Stack spacing={4} direction="row">
                                    {review.userImage != null ?
                                        <Avatar sx={{width: '96px', height: '96px'}} alt={review.userName}
                                                src={review.userImage}/>
                                        : <Avatar sx={{width: '96px', height: '96px', bgcolor: '#D9D9D9'}}> </Avatar>
                                    }
                                    <Stack spacing={1}>
                                        <Typography className="userName">{review.userName}</Typography>
                                        <Rating
                                            name="hover-feedback"
                                            value={review.rating}
                                            precision={0.5}
                                            readOnly
                                            icon={<StarIcon style={{color: '#808080', fontSize: '29px'}}/>}
                                            emptyIcon={<StarIcon style={{color: '#D9D9D9', fontSize: '29px'}}
                                                                 fontSize="inherit"/>}
                                        />
                                    </Stack>
                                </Stack>
                                <Typography className="review">
                                    {review.review}
                                </Typography>
                            </Stack>

                            <Grid container spacing={4}>
                                <Grid item lg={6}>
                                    <Stack sx={{backgroundSize:'contain'}}>

                                    <img className="productImage" src={review.productImage} alt={review.productName}/>
                                    </Stack>
                                </Grid>
                                <Grid item lg={6} paddingBottom='15%'>
                                    <Stack justifyContent='center' height='100%' spacing={1}>
                                        <Typography className="productName">{review.productName}</Typography>
                                        <Typography className="productCategory">{review.productCategory}</Typography>
                                    </Stack>
                                </Grid>
                            </Grid>
                        </Grid>
                    ))}
                </Grid>
            </Container>
        </Container>
    );
}

export default Reviews;
