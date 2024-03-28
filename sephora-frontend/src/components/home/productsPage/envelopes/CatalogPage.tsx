import {useTranslation} from "react-i18next";
import ProductsPage from "../core/ProductsPage.tsx";
import {CarePageFilter, CarePageFilters} from "../../data.ts";
import routes from "../../../../common/routes.ts";
import React from "react";

const CatalogPage: React.FC = () => {
    const {t} = useTranslation();
    return <ProductsPage
        defaultOrder={null}
        defaultDirection={null}
        title={t('header.catalogue')}
        filters={CarePageFilters}
        mainFilter={CarePageFilter}
        link={routes.api.products}
        navigateLink={routes.products}/>;
};

export default CatalogPage;
