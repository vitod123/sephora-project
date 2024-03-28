import React from "react";
import {useTranslation} from "react-i18next";
import ProductsPage from "../core/ProductsPage.tsx";
import routes from "../../../../common/routes.ts";
import { BottlePageFilter, BottlePageFilters } from "../../data.ts";

const BottledPage: React.FC = () => {
    const {t} = useTranslation();
    return <ProductsPage
        defaultOrder={null}
        defaultDirection={null}
        title={t('header.bottled')}
        filters={BottlePageFilters}
        mainFilter={BottlePageFilter}
        link={routes.api.bottled}
        navigateLink={routes.bottled}/>;
};

export default BottledPage;
