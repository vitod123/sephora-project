import React from "react";
import ProductsPage from "../core/ProductsPage.tsx";
import routes from "../../../../common/routes.ts";
import {useTranslation} from "react-i18next";
import { FullSizedPageFilter, FullSizedPageFilters } from "../../data.ts";

const FullSizedPage : React.FC = () => {
    const {t} = useTranslation();
    return <ProductsPage
        defaultOrder={null}
        defaultDirection={null}
        title={t('header.fullSizePerfume')}
        filters={FullSizedPageFilters}
        mainFilter={FullSizedPageFilter}
        link={routes.api.full_sized}
        navigateLink={routes.full_sized}/>;
};

export default FullSizedPage;
