import laneige from "./image/products/laneige.png";
import skinTra1 from "./image/products/skinTra1.png";
import skinTra2 from "./image/products/skinTra2.png";
import innisfree from "./image/products/innisfree.png";
import gisou from "./image/products/gisou.png";
import laneige2 from "./image/products/laneige2.png";
import ordinary from "./image/products/ordinary.png";
import rare from "./image/products/rare.png";
import Anna from "./image/reviews/Anna.png"
import Dariia from "./image/reviews/Dariia.png"
import Natalia from "./image/reviews/Natalia.png"
import estee from "./image/reviews/estee.png"
import moschino from "./image/reviews/moschino.png"
import uriage from "./image/reviews/uriage.png"
import banner1 from "./image/banner/image1.png"
import banner2 from "./image/banner/image2.png"
import banner3 from "./image/banner/image3.png"
import main1 from "./image/banner/main1.png"
import main2 from "./image/banner/main2.png"
import goodGirl1 from '../home/products/detailsProduct/images/goodGirl1.png'
import goodGirl2 from '../home/products/detailsProduct/images/goodGirl2.png'
import goodGirl3 from '../home/products/detailsProduct/images/goodGirl3.png'
import goodGirl4 from '../home/products/detailsProduct/images/goodGirl4.png'
import goodGirl5 from '../home/products/detailsProduct/images/goodGirl5.png'
import pradaParadoxe from './products/detailsProduct/images/Prada Paradoxe.png';
import yves from './products/detailsProduct/images/Yves Saint Laurent Libre.png';
import dior1 from './products/detailsProduct/images/DIOR — Sauvage Parfum.png';
import dior2 from './products/detailsProduct/images/DIOR — Miss Dior.png';
import apieu from './products/detailsProduct/images/A\'pieu  Milk.png';
import bielenda from './products/detailsProduct/images/Bielenda.png';
import byredo from './products/detailsProduct/images/Byredo.png';
import burberry2 from './products/detailsProduct/images/burberry.png';
import OrderStatus from "../../models/order/OrderStatus.ts";
import ProductPieceDto from "../../models/piece/ProductPieceDto.ts";
import ProductDto from "../../models/product/ProductDto.ts";
import PictureDto from "../../models/picture/PictureDto.ts";
import routes from "../../common/routes.ts";
import {IFilter} from "./filters/types.ts";

const placeholderPic: PictureDto = {
    name: 'placeholder',
    url: routes.picPlaceholder,
    urlLg: routes.picPlaceholder,
    urlMd: routes.picPlaceholder,
    urlSm: routes.picPlaceholder,
    urlXs: routes.picPlaceholder,
}

export const newProducts: ProductDto[] = ([
    {
        id: 1,
        name: "SkinTra — C The Light",
        descriptionEn: "",
        descriptionUa: "",
        active: false,
        brand: {id: 1, name: 'SkinTra'},
        category: {
            id: 1,
            nameUa: "Сироватка з вітаміном С Tetra 10%",
            nameEn: "Serum with vitamin C Tetra 10%",
            descriptionUa: "",
            descriptionEn: "",
            picture: placeholderPic
        },
        pieces: [],
        ratings: [],
        averageRating: 2,
        volumes: [{id: 1, milliliters: 30}],
        createdAt: new Date('23.02.2024'),
        isNew: true,
        characteristics: [],
        isFavorite: false,
    },
    {
        id: 2,
        name: "LANEIGE Cica Sleeping Mask",
        descriptionEn: "",
        descriptionUa: "",
        active: false,
        brand: {id: 2, name: 'LANEIGE'},
        category: {
            id: 2,
            nameUa: "Нічна маска для чутливої та подразненої шкіри обличчя",
            nameEn: "Night mask for sensitive and irritated facial skin",
            descriptionUa: "",
            descriptionEn: "",
            picture: placeholderPic
        },
        pieces: [],
        ratings: [],
        averageRating: 2,
        volumes: [{id: 2, milliliters: 60}],
        createdAt: new Date('23.02.2024'),
        isNew: true,
        characteristics: [],
        isFavorite: false,
    },
    {
        id: 3,
        name: "SkinTra — Wash It Off",
        descriptionEn: "",
        descriptionUa: "",
        active: false,
        brand: {id: 3, name: 'SkinTra'},
        category: {
            id: 3,
            nameUa: "Гель для вмивання обличчя з глюкозидами",
            nameEn: "Face wash gel with glucosides",
            descriptionUa: "",
            descriptionEn: "",
            picture: placeholderPic
        },
        pieces: [],
        ratings: [],
        averageRating: 5,
        volumes: [{id: 3, milliliters: 200}],
        createdAt: new Date('23.02.2024'),
        isNew: true,
        characteristics: [],
        isFavorite: false,
    },
    {
        id: 4,
        name: "Innisfree Super Volcanic Pore Clay Mask",
        descriptionEn: "",
        descriptionUa: "",
        active: false,
        brand: {id: 4, name: 'Innisfree'},
        category: {
            id: 4,
            nameUa: "Інтенсивна маска з вулканічною глиною",
            nameEn: "Intensive mask with volcanic clay",
            descriptionUa: "",
            descriptionEn: "",
            picture: placeholderPic
        },
        pieces: [],
        ratings: [],
        averageRating: 5,
        volumes: [{id: 4, milliliters: 100,}],
        createdAt: new Date('23.02.2024'),
        isNew: true,
        characteristics: [],
        isFavorite: false,
    }
]);

export const newPieces: ProductPieceDto[] = ([
    {
        id: 1,
        inStock: 0,
        price: 850,
        milliliters: 30,
        isBottledParfume: false,
        product: newProducts?.[0],
        pictures: [{
            name: 'C The Light',
            url: skinTra1,
            urlLg: skinTra1,
            urlMd: skinTra1,
            urlSm: skinTra1,
            urlXs: skinTra1
        }],
        createdAt: new Date('23.02.2024'),
        isNew: true,
    },
    {
        id: 2,
        inStock: 0,
        price: 1307,
        milliliters: 60,
        isBottledParfume: false,
        product: newProducts?.[1],
        pictures: [{
            name: 'Cica Sleeping Mask',
            url: laneige,
            urlLg: laneige,
            urlMd: laneige,
            urlSm: laneige,
            urlXs: laneige
        }],
        createdAt: new Date('23.02.2024'),
        isNew: false,
    },
    {
        id: 3,
        inStock: 0,
        price: 515,
        milliliters: 200,
        isBottledParfume: false,
        product: newProducts?.[2],
        pictures: [{
            name: 'Wash It Off',
            url: skinTra2,
            urlLg: skinTra2,
            urlMd: skinTra2,
            urlSm: skinTra2,
            urlXs: skinTra2
        }],
        createdAt: new Date('23.02.2024'),
        isNew: false,
    },
    {
        id: 4,
        inStock: 0,
        price: 720,
        milliliters: 100,
        isBottledParfume: false,
        product: newProducts?.[3],
        pictures: [{
            name: 'Super Volcanic Pore Clay Mask',
            url: innisfree,
            urlLg: innisfree,
            urlMd: innisfree,
            urlSm: innisfree,
            urlXs: innisfree
        }],
        createdAt: new Date('23.02.2024'),
        isNew: true,
    },
])

const orderProducts = ([
    {
        id: 10,
        productPiece: newPieces[0],
        quantity: 2,
        orderId: 1
    },
    {
        id: 11,
        productPiece: newPieces[1],
        quantity: 1,
        orderId: 1
    },
    {
        id: 12,
        productPiece: newPieces[2],
        quantity: 1,
        orderId: 1
    },
    {
        id: 13,
        productPiece: newPieces[3],
        quantity: 1,
        orderId: 1
    }
])
export const order = ({
    id: 1,
    date: new Date('02.26.2024'),
    status: OrderStatus.CONFIRMED,
    deliveryId: 1,
    products: [orderProducts[0]]
})
export const orders = ([
    {
        id: 12165847689,
        date: new Date('02.26.2024'),
        status: OrderStatus.CONFIRMED,
        deliveryId: 1,
        products: [orderProducts[0]]
    },
    {
        id: 2,
        date: new Date('2.03.2024'),
        status: OrderStatus.CANCELLED_BY_USER,
        deliveryId: 1,
        products: orderProducts
    },
    {
        id: 3,
        date: new Date('3.02.2024'),
        status: OrderStatus.DELIVERED,
        deliveryId: 1,
        products: [orderProducts[1], orderProducts[2]]
    },
])

export const addresses = ([
    {
        id: 1,
        name: 'Олена',
        surname: 'Юркевич',
        street: 'Вулиця',
        house: '12',
        sq: '',
        city: 'Київ, Київська обл.',
        phone: '+38 (012) 345 6789'
    },
    {
        id: 2,
        name: 'Євгенія',
        surname: 'Гурко',
        street: 'Вулиця',
        house: '13',
        sq: '',
        city: 'Київ, Київська обл.',
        phone: '+38 (012) 345 6789'
    },
])


export const Populars = ([
    {
        id: 0,
        name: "Honey Infused Lip Oil",
        pictures: [gisou],
        categoryName: "Олія для губ",
        rating: 3,
        volume: [{volume: '', price: '1720'}],
        isNew: false,
        descriptionEn: "",
        descriptionUa: "",
        characteristics: [],
        codeProduct: 123,
        reviews: []
    },
    {
        id: 0,
        name: "LANEIGE Lip Sleeping Mask 3 г",
        pictures: [laneige2],
        categoryName: "Ягідна маска для губ",
        rating: 2,
        volume: [{volume: '', price: '315'}],
        isNew: false,
        descriptionEn: "",
        descriptionUa: "",
        characteristics: [],
        codeProduct: 123,
        reviews: []
    },
    {
        id: 0,
        name: "The Ordinary — Niacinamide 10% + Zinc 1%",
        pictures: [ordinary],
        categoryName: "Сироватка з ніацинамідом та цинком",
        volume: [{volume: '60мл', price: '350'}],
        rating: 5,
        isNew: false,
        descriptionEn: "",
        descriptionUa: "",
        characteristics: [],
        codeProduct: 123,
        reviews: []
    },
    {
        id: 0,
        name: "Find Comfort Body & Hair Fragrance Mist",
        pictures: [rare],
        categoryName: "Міст для тіла та волосся",
        rating: 5,
        volume: [{volume: '', price: '1050'}],
        isNew: false,
        descriptionEn: "",
        descriptionUa: "",
        characteristics: [],
        codeProduct: 123,
        reviews: []
    }
]);

// export const Perfume: ProductDto[] = ([
//     {
//         id: 0,
//         name: "Valentino Donna Born In Roma Intense",
//         pictures: [valentino],
//         categoryName: "Парфумована вода",
//         rating: 5,
//         volume: [{volume: '', price: '4500'}],
//         isNew: false,
//         descriptionEn: "",
//         descriptionUa: "",
//         characteristics: [],
//         codeProduct: 123,
//         reviews: [],
//         product: null,
//     },
//     {
//         id: 0,
//         name: "Marc Jacobs Daisy",
//         pictures: [marc],
//         categoryName: "Парфумована вода",
//         rating: 4,
//         volume: [{volume: '', price: '3270'}],
//         isNew: false,
//         descriptionEn: "",
//         descriptionUa: "",
//         characteristics: [],
//         codeProduct: 123,
//         product: null,
//         reviews: []
//     },
//     {
//         id: 0,
//         name: "Tom Ford Lost Cherry",
//         pictures: [burberry],
//         categoryName: "Парфумована вода унісекс",
//         rating: 5,
//         volume: [{volume: '30ml', price: '3750'}],
//         isNew: false,
//         descriptionEn: "",
//         descriptionUa: "",
//         characteristics: [],
//         codeProduct: 123,
//         product: null,
//         reviews: []
//     },
//     {
//         id: 0,
//         name: "Gucci Flora Gorgeous Gardenia",
//         pictures: [gucci],
//         categoryName: "Парфюмированная вода жіноча",
//         rating: 4,
//         volume: [{volume: '', price: '7325'}],
//         isNew: false,
//         descriptionEn: "",
//         descriptionUa: "",
//         characteristics: [],
//         codeProduct: 123,
//         product: null,
//         reviews: []
//     }
// ]);

export const Reviews1 = (
    {
        userName: "Анна",
        rating: 4,
        review: "Все прийшло швидко та добре упаковано. Аромат приємний, веселий та легкий. На літо те, що треба",
        userImage: Anna,
        productImage: moschino,
        productName: "Moschino Funny",
        productCategory: "Туалетна вода"
    }
);
export const Reviews2 = (
    {
        userName: "Наталія",
        rating: 5,
        review: "Супер тональний! Наноситься рівномірно, має матовий фініш, гарне перекриття недоліків. Я брала тон 1N2 Ecru",
        userImage: Natalia,
        productImage: estee,
        productName: "Estée Lauder Double Wear",
        productCategory: "Тональний крем"
    }
);
export const Reviews3 = (
    {
        userName: "Дарья",
        rating: 4,
        review: "Найкращий бальзам для губ з тих що я купувала. Відновлює пошкоджену і суху шкіру губ за 1 день",
        userImage: Dariia,
        productImage: uriage,
        productName: "Uriage",
        productCategory: "Відновлювальний бальзам для губ"
    }
)


export const Banner1 = ({
    titleUa: "-20%  на догляд  за обличчям та тілом",
    titleEn: "-20% on face and body care",
    descriptionUa: "Акція триває до 28.01.2024. Не пропустіть свій шанс на прекрасний початок дня!",
    descriptionEn: "The promotion lasts until January 28, 2024. Don't miss your chance for a great start to the day!",
    link: "",
    image: banner1
})

export const Banner2 = ({
    titleUa: "Новий Yves Saint Laurent",
    titleEn: "New Yves Saint Laurent ",
    descriptionUa: "",
    descriptionEn: "",
    link: "",
    image: banner2
})

export const Banner3 = ({image: banner3, link: routes.care})

export const mainBanner = ([
    {
        titleUa: "Знижка 20% на товар найменшої вартості за умови придбання двох акційних товарів Hugo Boss",
        titleEn: "A 20% discount on the product of the lowest value, provided that you purchase two promotional products from Hugo Boss",
        link: "", image: main1, width: "600px", descriptionUa: "", descriptionEn: ""
    },
    {
        titleUa: "Відкрийте унікальні продукти Cosmed!",
        titleEn: "Discover unique Cosmed products!",
        descriptionUa: "Це бренд космецевтики, яка подбає про найвибагливішу шкіру",
        descriptionEn: "This is a cosmeceuticals brand that takes care of the most demanding skin",
        link: "",
        image: main2,
        width: "400px"
    }
])


export const Reviews = ([
    {
        userName: "Дарья",
        rating: 2,
        review: "Аромат непоганий, мені нагадує солодкі цукерки, але на жаль зовсім не стійкі. Подарунок хлопця, другий раз не візьму.",
        userImage: null,
        date: '28.01.24'
    },
    {
        userName: "Ангеліна",
        rating: 5,
        review: "Кохання з першого пшику ,неймовірний ,компліментарний ,легендарний ! Мабуть єдиний аромат (а в мене велика колекція) ,який настільки запав у душу ! Але перед покупкою краще зробити затест ,тому що вони досить важкі і не всім підійдуть",
        userImage: null,
        date: '04.01.24'
    },
    {
        userName: "Ганна",
        rating: 5,
        review: "Дуже стійкий,витончений аромат",
        userImage: null,
        date: '23.01.24'
    },
    {
        userName: "Вікторія",
        rating: 5,
        review: "Сумнівалась що прийде оригінал, замовляла 30мл з Європи, також пульверизатор не такий як в 80мл",
        userImage: null,
        date: '18.01.24'
    },
    {
        userName: "Марта",
        rating: 5,
        review: "Довго не могла знайти справді \"свій\" аромат. Парфуми, справді варті уваги.",
        userImage: null,
        date: '18.01.24'
    },
    {
        userName: "Ольга",
        rating: 5,
        review: "Моя любов любовна! Надзвичайно приємний , густий, насичений аромат. Стійкий та шлейфовий. Користувалась взимку та холодною весною. Не дивлячись на те що зараз літо - рука тягнеться до них, але я себе стримую (думаю про оточуючих). Для більшості цей аромат для літа буде дуже тяжкий.",
        userImage: null,
        date: '04.01.24'
    },
]);

export const Characteristics = ([
    {name: "Прем'єра аромату", characteristics: ["2016"]},
    {name: "Країна ТМ", characteristics: ["США"]},
    {name: "Зроблено в", characteristics: ["Іспанія"]},
    {name: "Стать", characteristics: ["для жінок"]},
    {name: "Класифікація", characteristics: ["елітна"]},
    {name: "Тип аромату", characteristics: ["квіткові", "східні"]},
    {name: "Початкова нота", characteristics: ["Бергамот", "Кава", "Лимон", "Мигдаль"]},
    {
        name: "Нота серця",
        characteristics: ["Болгарська троянда", "Жасмин самбак", "Квітка апельсина", "Корінь іриса", "Тубероза"]
    },
    {
        name: "Кінцева нота",
        characteristics: ["Амбра", "Боби тонка", "Ваніль", "Какао", "Кващемірове дерево", "Кедр", "Кориця", "Мускус", "Пачулі", "Праліне", "Сандал"]
    },
]);


export const DetailsProduct = ({
    id: 1,
    name: "Carolina Herrera Good Girl",
    categoryName: "Парфумована вода",
    volume: [{volume: "50ml", price: "2660"}, {volume: "30ml", price: "1900"}],
    pictures: [goodGirl1, goodGirl2, goodGirl3, goodGirl4, goodGirl5],
    rating: 5,
    description: "Загадковий і вабливий східний аромат Carolina Herrera Good Girl стане прекрасним доповненням до образу справжньої спокусниці. Перші ноти представленого шедевра звучать ароматною чорною кавою й терпким мигдалем. За ними слідує серцевий акорд - це поєднання жасмину самбака і туберози. Завершує цей пряний шедевр легкий шлейф із бобів тонка та какао. Композиція Carolina Herrera Good Girl обов'язково сподобається витонченій представниці прекрасної статі, адже її ноти, які розбурхують уяву, нікого не залишають байдужим. Парфуми, немов прозорою вуаллю, огортають тіло і чудово доповнюють і без того неймовірно привабливий образ своєї власниці. Carolina Herrera Good Girl - це ароматне втілення жіночності та флірту в одному флаконі.",
    characteristics: Characteristics,
    codeProduct: 283295,
    reviews: Reviews,
    isNew: false,
    product: null,
});

export const similarProducts = ([
    {
        id: 0,
        name: "Prada Paradoxe",
        pictures: [pradaParadoxe],
        categoryName: "Парфумована вода",
        volume: [{volume: '90ml', price: '4171'}],
        rating: 4,
        isNew: false,
        descriptionEn: "",
        descriptionUa: "",
        characteristics: [],
        codeProduct: 123,
        reviews: []
    },
    {
        id: 0,
        name: "Yves Saint Laurent Libre",
        pictures: [yves],
        categoryName: "Парфумована вода",
        volume: [{volume: '', price: '2028'}],
        rating: 4,
        isNew: true,
        descriptionEn: "",
        descriptionUa: "",
        characteristics: [],
        codeProduct: 123,
        reviews: []
    },
    {
        id: 0,
        name: "DIOR — Sauvage Parfum",
        pictures: [dior1],
        categoryName: "Парфумована вода",
        volume: [{volume: '100ml', price: '6430'}],
        rating: 3,
        isNew: false,
        descriptionEn: "",
        descriptionUa: "",
        characteristics: [],
        codeProduct: 123,
        reviews: []
    },
    {
        id: 0,
        name: "DIOR — Miss Dior",
        pictures: [dior2],
        categoryName: "Парфумована вода",
        volume: [{volume: '30ml', price: '3614'}],
        rating: 3,
        isNew: false,
        descriptionEn: "",
        descriptionUa: "",
        characteristics: [],
        codeProduct: 123,
        reviews: []
    },
])

export const especiallyForYou = ([
    {
        id: 0,
        name: "A'pieu  Milk One Pack Mask — Banana",
        pictures: [apieu],
        categoryName: "Живильна тканинна маска",
        volume: [{volume: '21g', price: '100'}],
        rating: 4,
        isNew: false,
        descriptionEn: "",
        descriptionUa: "",
        characteristics: [],
        codeProduct: 123,
        reviews: []
    },
    {
        id: 0,
        name: "Bielenda Professional — Satin Face Tonic in Gel",
        pictures: [bielenda],
        categoryName: "Гелевий тонік для обличчя",
        volume: [{volume: '500ml', price: '515'}],
        rating: 4,
        isNew: false,
        descriptionEn: "",
        descriptionUa: "",
        characteristics: [],
        codeProduct: 123,
        reviews: []
    },
    {
        id: 0,
        name: "Byredo Bal d'Afrique",
        pictures: [byredo],
        categoryName: "Парфумована вода",
        volume: [{volume: '', price: '144'}],
        rating: 4,
        isNew: true,
        descriptionEn: "",
        descriptionUa: "",
        characteristics: [],
        codeProduct: 123,
        reviews: []
    },
    {
        id: 0,
        name: "BURBERRY — Hero",
        pictures: [burberry2],
        categoryName: "Парфумована вода",
        volume: [{volume: '50ml', price: '1853'}],
        rating: 3,
        isNew: false,
        descriptionEn: "",
        descriptionUa: "",
        characteristics: [],
        codeProduct: 123,
        reviews: []
    },
])

export const Filters: IFilter[] = ([
    {
        nameUa: 'Група товару',
        nameEn: 'Product group',
        filters: [{nameUa: 'Гель для вмивання', nameEn: 'Gel for washing'},
            {nameUa: 'Крем для обличчя', nameEn: 'Cream for face'},
            {nameUa: 'Маска для обличчя', nameEn: 'Mask for face'},
            {nameUa: 'Пінка для вмивання', nameEn: 'Foam for washing'},
            {nameUa: 'Сироватка для обличчя', nameEn: 'Serum for face'},
            {nameUa: 'Тонік для обличчя', nameEn: 'Face toner'},
            {nameUa: 'BB-крем', nameEn: 'BB cream'},
            {nameUa: 'CC-крем', nameEn: 'CC cream'},
            {nameUa: 'Travel Size', nameEn: 'Travel Size'}],
    },
    {
        nameUa: 'Бренд',
        nameEn: 'Brands',
        filters: [
            {nameUa: 'La Roche-Posay', nameEn: 'La Roche-Posay'},
            {nameUa: 'Sane', nameEn: 'Sane'},
            {nameUa: 'Vichy', nameEn: 'Vichy'},
            {nameUa: 'L’Oreal Paris', nameEn: 'L’Oreal Paris'},
            {nameUa: 'Bioderma', nameEn: 'Bioderma'},
            {nameUa: 'The Ordinary', nameEn: 'The Ordinary'},
            {nameUa: 'Medi–Peel', nameEn: 'Medi–Peel'},
            {nameUa: 'Cerave', nameEn: 'Cerave'},
            {nameUa: 'Dr.Jart +', nameEn: 'Dr.Jart +'},
            {nameUa: 'Laneige', nameEn: 'Laneige'}]
    },
    {
        nameUa: 'Вартість',
        nameEn: 'Cost',
        filters: [
            {nameUa: 'Менше 500 грн', nameEn: 'Less than 500 UAH'},
            {nameUa: '500 – 750 грн', nameEn: '500 – 750 UAH'},
            {nameUa: '750 – 1000 грн', nameEn: '750 - 1000 UAH'},
            {nameUa: '1000 – 5000 грн', nameEn: '1000 - 5000 UAH'},
            {nameUa: 'Більше 5000 грн', nameEn: 'More than 5000 UAH'}]
    }, {
        nameUa: 'Вік',
        nameEn: 'Age',
        filters: [
            {nameUa: '18+', nameEn: '18+'},
            {nameUa: '25+', nameEn: '25+'},
            {nameUa: '30+', nameEn: '30+'},
            {nameUa: '40+', nameEn: '40+'},
            {nameUa: '50+', nameEn: '50+'}]
    }, {
        nameUa: 'Класифікація',
        nameEn: 'Classification',
        filters: [
            {nameUa: 'Аптечна', nameEn: 'v'},
            {nameUa: 'Дерматокосметика', nameEn: 'Dermatocosmetics'},
            {nameUa: 'Елітна', nameEn: 'Elite'},
            {nameUa: 'Мас маркет', nameEn: 'Mass market'},
            {nameUa: 'Міддл ап', nameEn: 'Middle up'},
            {nameUa: 'Міддл маркет', nameEn: 'Middle market'},
            {nameUa: 'Натуральна', nameEn: 'Natural'},
            {nameUa: 'Органічна', nameEn: 'Organic'},
            {nameUa: 'Професійна', nameEn: 'Professional'}]
    }, {
        nameUa: 'Тип шкіри',
        nameEn: 'Skin type',
        filters: [
            {nameUa: 'Всі типи', nameEn: 'All types'},
            {nameUa: 'Жирна', nameEn: 'Oily'},
            {nameUa: 'Комбінована', nameEn: 'Combination'},
            {nameUa: 'Нормальна', nameEn: 'Normal'},
            {nameUa: 'Суха', nameEn: 'Dry'},
            {nameUa: 'Чутлива', nameEn: 'Sensitive'}]
    }, {
        nameUa: 'Форма',
        nameEn: 'Form',
        filters: [
            {nameUa: 'Гель', nameEn: 'Gel'},
            {nameUa: 'Желе', nameEn: 'Jelly'},
            {nameUa: 'З помпою', nameEn: 'With pump'},
            {nameUa: 'Крем', nameEn: 'Cream'},
            {nameUa: 'Пудра', nameEn: 'Powder'},
            {nameUa: 'Сироватка', nameEn: 'Serum'},
            {nameUa: 'Спрей', nameEn: 'Spray'},
            {nameUa: 'Стік', nameEn: 'Stick'},
            {nameUa: 'Флюїд', nameEn: 'Fluid'}]
    },
    {
        nameUa: 'Призначення',
        nameEn: 'Appointment',
        filters: [
            {nameUa: 'Антивіковий', nameEn: 'Anti-aging'},
            {nameUa: 'Антибактеріальне', nameEn: 'Antibacterial'},
            {nameUa: 'Від зморшок', nameEn: 'From wrinkles'},
            {nameUa: 'Відновлення', nameEn: 'Restoration'},
            {nameUa: 'Від перших ознак старіння', nameEn: 'From the first signs of aging'},
            {nameUa: 'Демакіяж', nameEn: 'Makeup removal'},
            {nameUa: 'Заспокоєння', nameEn: 'Comfort'},
            {nameUa: 'Живлення', nameEn: 'Feeding'},
            {nameUa: 'Зволоження', nameEn: 'Moisturization'},
            {nameUa: 'Очищення', nameEn: 'Cleaning'},
            {nameUa: 'Пом’якшення', nameEn: 'Mitigating'},
            {nameUa: 'Тонізування', nameEn: 'Toning'}],
    },
])

export const BottlePageFilters = [Filters[0], Filters[2], Filters[3], Filters[4], Filters[7],]
export const BottlePageFilter = ({
    nameUa: 'Бренди',
    nameEn: 'Brands',
    filters: [
        {nameUa: 'Tom Ford', nameEn: 'Tom Ford'},
        {nameUa: 'Elixir de Bombe', nameEn: 'Elixir de Bombe'},
        {nameUa: 'Aqua Universalis Cologne Forte', nameEn: 'Aqua Universalis Cologne Forte'},
        {nameUa: 'ArteOlfatto Black Hashish', nameEn: 'ArteOlfatto Black Hashish'},
        {nameUa: 'Arabesque Perfumes Majesty', nameEn: 'Arabesque Perfumes Majesty'},
        {nameUa: 'Atelier Cologne Pacific Lime', nameEn: 'Atelier Cologne Pacific Lime'},
        {nameUa: 'Lalique — Encre Noire', nameEn: 'Lalique — Encre Noire'},
        {nameUa: 'BDK Pas Ce Soir Extrait', nameEn: 'BDK Pas Ce Soir Extrait'},
        {nameUa: 'BeauFort London Lignum Vitae', nameEn: 'BeauFort London Lignum Vitae'},
        {nameUa: 'Trussardi Donna', nameEn: 'Trussardi Donna'},
        {nameUa: 'MONTALE', nameEn: 'MONTALE'},
        {nameUa: 'BDK Rouge Smoking', nameEn: 'BDK Rouge Smoking'},
        {nameUa: 'Bois 1920', nameEn: 'Bois 1920'},
        {nameUa: 'Fondentarancio', nameEn: 'Fondentarancio'},
        {nameUa: 'Bvlgari Tygar', nameEn: 'Bvlgari Tygar'},
        {nameUa: 'Byredo Bal d\'Afrique', nameEn: 'Byredo Bal d\'Afrique'},
        {nameUa: 'Carolina Herrera Very Good girl', nameEn: 'Carolina Herrera Very Good girl'},
        {nameUa: 'Carolina Herrera Good girl', nameEn: 'Carolina Herrera Good girl'},
        {nameUa: 'Celine Black Tie', nameEn: 'Celine Black Tie'},
        {nameUa: 'Celine Rimbaud', nameEn: 'Celine Rimbaud'},
        {nameUa: 'Chopard Wish', nameEn: 'Chopard Wish'},
        {nameUa: 'Chopard Vanille de Madagascar', nameEn: 'Chopard Vanille de Madagascar'},
        {nameUa: 'Coquillete Vesevius', nameEn: 'Coquillete Vesevius'},
        {nameUa: 'Mancera Saharian Wind', nameEn: 'Mancera Saharian Wind'},
        {nameUa: 'D&G L’imperatrice', nameEn: 'D&G L’imperatrice'},
        {nameUa: 'Creed Aventus', nameEn: 'Creed Aventus'},
        {nameUa: 'Etat Libre d\'Orange Frustration', nameEn: 'Etat Libre d\'Orange Frustration'},
        {nameUa: 'Ex Nihilo Atlas Fever', nameEn: 'Ex Nihilo Atlas Fever'},
        {nameUa: 'Fig Infusion', nameEn: 'Fig Infusion'},
        {nameUa: 'Oud Satin Mood', nameEn: 'Oud Satin Mood'},
        {nameUa: 'Santal 33', nameEn: 'Santal 33'}]
})
export const FullSizedPageFilters = [Filters[0], Filters[2], Filters[3], Filters[4], Filters[7],]

export const FullSizedPageFilter = ({
    nameUa: 'Бренди',
    nameEn: 'Brands',
    filters: [
        {nameUa: 'Tom Ford', nameEn: 'Tom Ford'},
        {nameUa: 'Yves Saint', nameEn: 'Yves Saint'},
        {nameUa: 'Blue Seduction', nameEn: 'Blue Seduction'},
        {nameUa: 'Maison Francis Kurkdjian Baccarat', nameEn: 'Maison Francis Kurkdjian Baccarat'},
        {nameUa: 'Premiere Note', nameEn: 'Premiere Note'},
        {nameUa: 'BURBERRY', nameEn: 'BURBERRY'},
        {nameUa: 'Encre Noire', nameEn: 'Encre Noire'},
        {nameUa: 'Carolina Herrera Good', nameEn: 'Carolina Herrera Good'},
        {nameUa: 'Terre dHermes', nameEn: 'Terre dHermes'},
        {nameUa: 'Trussardi', nameEn: 'Trussardi'},
        {nameUa: 'MONTALE', nameEn: 'MONTALE'},
        {nameUa: 'LM PARFUMS', nameEn: 'LM PARFUMS'},
        {nameUa: 'Untold Absolu', nameEn: 'Untold Absolu'},
        {nameUa: 'Zen', nameEn: 'Zen'},
        {nameUa: 'Derby', nameEn: 'Derby'},
        {nameUa: 'Prada', nameEn: 'Prada'},
        {nameUa: 'Bleu de Chanel', nameEn: 'Bleu de Chanel'},
        {nameUa: '1 Million', nameEn: '1 Million'},
        {nameUa: 'DIOR', nameEn: 'DIOR'},
        {nameUa: 'Le Bain', nameEn: 'Le Bain'},
        {nameUa: 'Mancera Saharian Wind', nameEn: 'Mancera Saharian Wind'},
        {nameUa: 'Calvin Klein', nameEn: 'Calvin Klein'},
        {nameUa: 'Creed', nameEn: 'Creed'},
        {nameUa: 'Moschino', nameEn: 'Moschino'},
        {nameUa: 'Genetic Bliss', nameEn: 'Genetic Bliss'},
        {nameUa: 'LA MARTINA', nameEn: 'LA MARTINA'}],
})

export const CarePageFilters = [Filters[0], Filters[1], Filters[2], Filters[3], Filters[4], Filters[5], Filters[6], Filters[7],]

export const CarePageFilter = ({
    nameUa: 'Догляд за шкірою',
    nameEn: 'Skin care',
    filters: [
        {nameUa: 'Зволожувачі', nameEn: 'Moisturizers'},
        {nameUa: 'Засоби для вмивання', nameEn: 'Detergents'},
        {nameUa: 'Маски', nameEn: 'Masks'},
        {nameUa: 'Догляд за очима', nameEn: 'Eye care'},
        {nameUa: 'Бальзами, догляд за губами', nameEn: 'Balms, lip care'},
        {nameUa: 'Сонцезахисний крем', nameEn: 'Sunscreen cream'},
        {nameUa: 'Високотехнологічні інстременти', nameEn: 'High-tech instruments'},
        {nameUa: 'Веганський', nameEn: 'Vegan'},
        {nameUa: 'Подарункові набори', nameEn: 'Gift sets'},
        {nameUa: 'Міні розміри', nameEn: 'Mini sizes'}],
})

export const NovelitiesPageFilters = [Filters[0], Filters[1], Filters[2], Filters[3], Filters[4], Filters[5], Filters[6], Filters[7],]

export const NovelitiesPageFilter = ({
    nameUa: 'Новинки',
    nameEn: 'Novelty',
    filters: [
        {nameUa: 'Макіяж', nameEn: 'Makeup'},
        {nameUa: 'Догляд за обличчям', nameEn: 'Facial'},
        {nameUa: 'Волосся', nameEn: 'Hair'},
        {nameUa: 'Тіло', nameEn: 'Body'},
        {nameUa: 'Догляд', nameEn: 'Care'},
        {nameUa: 'Акції', nameEn: 'Actions'},
    ]
})
