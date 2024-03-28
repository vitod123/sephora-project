import ProductsPage from "../core/ProductsPage.tsx";
import routes from "../../../../common/routes.ts";
import React from "react";
import {useTranslation} from "react-i18next";
import { CarePageFilter, CarePageFilters } from "../../data.ts";

const CarePage: React.FC = () => {
    const {t} = useTranslation();
    return <ProductsPage
        defaultOrder={null}
        defaultDirection={null}
        title={t('header.care')}
        filters={CarePageFilters}
        mainFilter={CarePageFilter}
        link={routes.api.care}
        navigateLink={routes.care}/>;
};

export default CarePage;
